import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId } = await request.json()

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status === "succeeded") {
      return NextResponse.json({ success: true, paymentIntent })
    } else {
      return NextResponse.json({ success: false, status: paymentIntent.status })
    }
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}
