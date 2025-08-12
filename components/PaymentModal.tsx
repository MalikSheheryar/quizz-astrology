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
import { X, CreditCard, Lock, Download, AlertCircle } from 'lucide-react'
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
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#87CEEB',
        },
        ':-webkit-autofill': {
          color: '#ffffff',
        },
      },
      invalid: {
        color: '#ff6b6b',
        iconColor: '#ff6b6b',
      },
      complete: {
        color: '#4ade80',
        iconColor: '#4ade80',
      },
    },
    hidePostalCode: false,
  }

  const isProduction = process.env.NODE_ENV === 'production'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white/10 rounded-xl p-4 border border-white/20">
        <label className="block text-white text-sm font-medium mb-2">
          Card Information
        </label>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <CardElement options={cardElementOptions} />
        </div>

        {/* Show test card info only in development */}
        {!isProduction && (
          <div className="mt-2 text-xs text-white/60 bg-blue-500/10 p-2 rounded border border-blue-500/20">
            <p>
              <strong>Test Mode:</strong> Use 4242 4242 4242 4242 with any
              future date
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20 flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="flex-1 py-3 px-6 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors border border-white/20 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Pay ${price.toFixed(2)}</span>
            </>
          )}
        </button>
      </div>

      {/* Environment indicator - only show in development */}
      {!isProduction && (
        <div className="text-xs text-white/40 text-center">
          <p>🧪 Test Mode - No real charges will be made</p>
        </div>
      )}
    </form>
  )
}

const PaymentModal: React.FC<PaymentModalProps> = (props) => {
  const { isOpen, onClose, price, quizTitle } = props
  const isProduction = process.env.NODE_ENV === 'production'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#1F2A38] rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Unlock Full Results
                </h3>
                {!isProduction && (
                  <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded mt-1 inline-block">
                    TEST MODE
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-[#4ade80]" />
                  <span className="text-white">256-bit SSL Encrypted</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-[#4ade80]" />
                  <span className="text-white">Instant PDF Download</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-[#4ade80]" />
                  <span className="text-white">Secure Payment via Stripe</span>
                </div>
              </div>
              <p className="text-white/70 text-sm">
                Get your complete {quizTitle.toLowerCase()} analysis with
                detailed insights and download a beautiful PDF report.
              </p>
            </div>

            <Elements stripe={stripePromise}>
              <PaymentForm {...props} />
            </Elements>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PaymentModal
