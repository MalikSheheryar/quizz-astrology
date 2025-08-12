import { loadStripe, Stripe } from '@stripe/stripe-js'

// Make sure to add these to your .env.local file
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

if (!stripePublishableKey) {
  throw new Error(
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined in environment variables'
  )
}

// Create a single instance of Stripe
export const stripePromise: Promise<Stripe | null> =
  loadStripe(stripePublishableKey)

// Helper function to create payment intent (used in the modal)
export const createPaymentIntent = async (
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
    throw new Error(errorData.error || 'Failed to create payment intent')
  }

  return response.json()
}

// Helper function to verify payment
export const verifyPayment = async (paymentIntentId: string) => {
  const response = await fetch('/api/verify-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentIntentId }),
  })

  if (!response.ok) {
    throw new Error('Failed to verify payment')
  }

  return response.json()
}
