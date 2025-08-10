import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const { amount, quizSlug, userData } = await request.json()

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: {
        quizSlug,
        userEmail: userData.email,
        userName: userData.fullName,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 })
  }
}
