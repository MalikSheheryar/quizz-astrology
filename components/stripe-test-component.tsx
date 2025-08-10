'use client'
import React, { useState } from 'react'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { stripePromise } from '@/lib/stripe'
import { CreditCard, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface TestPaymentFormProps {
  onTestComplete: (success: boolean, message: string) => void
}

const TestPaymentForm: React.FC<TestPaymentFormProps> = ({
  onTestComplete,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTestPayment = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      onTestComplete(false, 'Stripe not loaded')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Test with a small amount (1 cent)
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 1, // 1 cent
          quizSlug: 'stripe-test',
          userData: {
            fullName: 'Test User',
            email: 'test@example.com',
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const { clientSecret } = await response.json()

      const cardElement = elements.getElement(CardElement)
      if (!cardElement) {
        onTestComplete(false, 'Card element not found')
        return
      }

      // Use Stripe test card: 4242424242424242
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: 'Test User',
              email: 'test@example.com',
            },
          },
        })

      if (stripeError) {
        onTestComplete(false, `Stripe Error: ${stripeError.message}`)
      } else if (paymentIntent?.status === 'succeeded') {
        onTestComplete(true, 'Payment test successful!')
      } else {
        onTestComplete(false, `Payment status: ${paymentIntent?.status}`)
      }
    } catch (err: any) {
      onTestComplete(false, `Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleTestPayment} className="space-y-4">
      <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Test Card (Use: 4242 4242 4242 4242)
        </label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>

      <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded">
        <p>
          <strong>Test Card Numbers:</strong>
        </p>
        <p>Success: 4242424242424242</p>
        <p>Decline: 4000000000000002</p>
        <p>Use any future expiry date and any 3-digit CVC</p>
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded border border-red-200">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <CreditCard className="w-4 h-4" />
            <span>Test Payment ($0.01)</span>
          </>
        )}
      </button>
    </form>
  )
}

const StripeTestComponent: React.FC = () => {
  const [testResults, setTestResults] = useState<
    Array<{ success: boolean; message: string; timestamp: Date }>
  >([])
  const [isConnected, setIsConnected] = useState<boolean | null>(null)

  React.useEffect(() => {
    // Test Stripe connection
    const testStripeConnection = async () => {
      try {
        const stripe = await stripePromise
        setIsConnected(!!stripe)
      } catch (error) {
        setIsConnected(false)
      }
    }

    testStripeConnection()
  }, [])

  const handleTestComplete = (success: boolean, message: string) => {
    setTestResults((prev) => [
      ...prev,
      {
        success,
        message,
        timestamp: new Date(),
      },
    ])
  }

  const testApiEndpoint = async () => {
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 1,
          quizSlug: 'api-test',
          userData: { fullName: 'API Test', email: 'test@example.com' },
        }),
      })

      const data = await response.json()

      if (response.ok && data.clientSecret) {
        handleTestComplete(true, 'API endpoint working - clientSecret received')
      } else {
        handleTestComplete(false, `API Error: ${data.error || 'Unknown error'}`)
      }
    } catch (error: any) {
      handleTestComplete(false, `API Connection Error: ${error.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Stripe Integration Test
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Connection Status */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Connection Status</h2>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                {isConnected === null ? (
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                ) : isConnected ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span>
                  Stripe Client:{' '}
                  {isConnected === null
                    ? 'Testing...'
                    : isConnected
                    ? 'Connected'
                    : 'Failed'}
                </span>
              </div>

              <button
                onClick={testApiEndpoint}
                className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Test API Endpoint
              </button>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded text-xs">
              <p>
                <strong>Environment Variables Needed:</strong>
              </p>
              <p>• STRIPE_PUBLISHABLE_KEY</p>
              <p>• STRIPE_SECRET_KEY</p>
            </div>
          </div>

          {/* Payment Test Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Test</h2>

            {isConnected ? (
              <Elements stripe={stripePromise}>
                <TestPaymentForm onTestComplete={handleTestComplete} />
              </Elements>
            ) : (
              <div className="text-red-600 text-center py-8">
                Stripe not connected. Check your configuration.
              </div>
            )}
          </div>
        </div>

        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded flex items-start space-x-3 ${
                    result.success
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-red-50 border border-red-200'
                  }`}
                >
                  {result.success ? (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p
                      className={
                        result.success ? 'text-green-800' : 'text-red-800'
                      }
                    >
                      {result.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {result.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StripeTestComponent
