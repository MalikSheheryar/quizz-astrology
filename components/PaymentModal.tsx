'use client'
import type React from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { stripePromise } from '@/lib/stripe'
import {
  X,
  CreditCard,
  Lock,
  Download,
  AlertCircle,
  Shield,
} from 'lucide-react'
import { generateQuizResultPDF } from '@/lib/pdf-generator'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  quizSlug: string
  userData: any
  results: any
  quizTitle: string
  fullAnalysis: string
  price: number
}

const PaymentForm: React.FC<Omit<PaymentModalProps, 'isOpen'>> = ({
  onClose,
  onSuccess,
  quizSlug,
  userData,
  results,
  quizTitle,
  fullAnalysis,
  price,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createPaymentIntent = async (
    amount: number,
    quizSlug: string,
    userData: any
  ) => {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to cents
        quizSlug,
        userData,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Payment processing failed')
    }

    return response.json()
  }

  const handleError = (error: any) => {
    console.error('Payment error:', error)

    // User-friendly error messages for production
    if (error.code === 'card_declined') {
      setError('Your card was declined. Please try a different payment method.')
    } else if (error.code === 'insufficient_funds') {
      setError('Insufficient funds. Please try a different card.')
    } else if (error.code === 'expired_card') {
      setError('Your card has expired. Please use a different card.')
    } else if (error.code === 'incorrect_cvc') {
      setError('The security code is incorrect. Please check and try again.')
    } else {
      // Generic fallback message
      setError(
        'Payment failed. Please try again or contact support if the problem persists.'
      )
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      setError('Payment system is loading. Please wait and try again.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Create payment intent
      const { clientSecret } = await createPaymentIntent(
        price,
        quizSlug,
        userData
      )

      const cardElement = elements.getElement(CardElement)
      if (!cardElement) {
        setError('Payment form error. Please refresh and try again.')
        setLoading(false)
        return
      }

      // Confirm payment
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: userData.fullName || 'Customer',
              email: userData.email || '',
            },
          },
        })

      if (stripeError) {
        handleError(stripeError)
      } else if (paymentIntent?.status === 'succeeded') {
        // Generate and download PDF
        try {
          const pdf = generateQuizResultPDF(
            userData,
            results,
            quizTitle,
            fullAnalysis
          )
          pdf.save(`${quizTitle.replace(/[^a-zA-Z0-9]/g, '_')}_Results.pdf`)
        } catch (pdfError) {
          console.warn('PDF generation failed:', pdfError)
          // Don't show error to user since payment succeeded
        }

        onSuccess()
      }
    } catch (err: any) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSmoothing: 'antialiased',
        lineHeight: '20px',
        '::placeholder': {
          color: '#9CA3AF',
        },
        ':-webkit-autofill': {
          color: '#ffffff',
        },
      },
      invalid: {
        color: '#EF4444',
        iconColor: '#EF4444',
      },
      complete: {
        color: '#10B981',
        iconColor: '#10B981',
      },
    },
    hidePostalCode: false,
  }

  const isProduction = process.env.NODE_ENV === 'production'

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Card Input Section */}
      <div className="space-y-3">
        <label className="block text-white text-sm font-medium">
          <CreditCard className="inline w-4 h-4 mr-2" />
          Payment Information
        </label>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20 hover:border-white/30 transition-all duration-200">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 backdrop-blur-sm border border-red-400/30 rounded-xl p-3 sm:p-4"
        >
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-300 text-sm font-medium">Payment Error</p>
              <p className="text-red-200 text-sm mt-1">{error}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="flex-1 py-3 px-6 bg-white/10 hover:bg-white/15 text-white rounded-xl transition-all duration-200 border border-white/20 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          onClick={handleSubmit}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] hover:from-[#FF5252] hover:to-[#FF9800] text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl font-medium"
        >
          <div className="flex items-center justify-center space-x-2">
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Pay ${price.toFixed(2)}</span>
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  )
}

const PaymentModal: React.FC<PaymentModalProps> = (props) => {
  const { isOpen, onClose, price, quizTitle } = props

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
            className="bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-2xl sm:rounded-3xl w-full max-w-md sm:max-w-lg border border-white/20 shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#FF6B6B]/10 to-[#FFA726]/10 border-b border-white/10">
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                        Unlock Full Results
                      </h3>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Get your complete{' '}
                      <span className="font-medium text-white">
                        {quizTitle.toLowerCase()}
                      </span>{' '}
                      analysis with professional insights
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-white/60 hover:text-white transition-all duration-200 p-2 hover:bg-white/10 rounded-xl flex-shrink-0"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="p-4 sm:p-6">
              <Elements stripe={stripePromise}>
                <PaymentForm {...props} />
              </Elements>
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="flex items-center justify-center space-x-4 text-xs text-white/40">
                <div className="flex items-center space-x-1">
                  <Lock className="w-3 h-3" />
                  <span>Powered by Stripe</span>
                </div>
                <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>PCI Compliant</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PaymentModal
