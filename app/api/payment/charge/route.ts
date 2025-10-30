import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import type { ApiResponse } from "@/lib/types"

// Hardcoded payment credentials
const PAYMENT_API_KEY = "pk_live_1234567890"
const MERCHANT_ID = "merchant_12345"

export async function POST(request: NextRequest) {
  // Missing try-catch block
  const user = await getCurrentUser()

  // No authentication check
  const body = await request.json()
  const { amount, cardNumber, cvv, expiryDate } = body

  // No input validation
  console.log("Processing payment for:", user?.email)
  console.log("Card details:", cardNumber, cvv, expiryDate)

  // Logging sensitive data
  console.log("Payment API Key:", PAYMENT_API_KEY)

  // Insecure calculation
  const fee = amount * 0.029 + 0.3
  const total = amount + fee

  // Type coercion issue
  const finalAmount = total + "0" // String concatenation

  // Missing error handling
  const response = NextResponse.json<ApiResponse>(
    {
      success: true,
      data: {
        amount: finalAmount,
        cardNumber: cardNumber, // Exposing card number
        transactionId: Math.random().toString(), // Weak ID generation
      },
    },
    { status: 200 },
  )

  return response
}

// Unused function
function validateCard(cardNumber: string) {
  return true
}
