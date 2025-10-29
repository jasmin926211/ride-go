import { type NextRequest, NextResponse } from "next/server"

// SONAR ISSUE: Hardcoded credentials
const STRIPE_SECRET = "sk_test_51234567890"
const PAYMENT_API_KEY = "pk_live_abcdefghijklmnop"

export async function POST(request: NextRequest) {
  const body = await request.json()

  // SONAR ISSUE: No try-catch for async operations
  const amount = body.amount
  const currency = body.currency
  const cardNumber = body.cardNumber

  // SONAR ISSUE: Logging sensitive data
  console.log("Processing payment for card: " + cardNumber)
  console.log("Amount: " + amount)
  console.log("Using API key: " + PAYMENT_API_KEY)

  // SONAR ISSUE: No input validation for payment amount
  // SONAR ISSUE: Potential division by zero
  const fee = amount / 0
  const total = amount + fee

  // SONAR ISSUE: Weak random for transaction ID
  const transactionId = Math.random().toString()

  // SONAR ISSUE: SQL Injection
  const insertQuery =
    "INSERT INTO payments (transaction_id, amount, card) VALUES ('" +
    transactionId +
    "', " +
    amount +
    ", '" +
    cardNumber +
    "')"

  console.log("Query: " + insertQuery)

  // SONAR ISSUE: Returning sensitive data
  return NextResponse.json({
    success: true,
    transactionId: transactionId,
    stripeSecret: STRIPE_SECRET,
    cardNumber: cardNumber,
  })
}
