import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()

  // SONAR ISSUE: Duplicated code block (same as in book route)
  const rideData = {
    id: Math.random().toString(36).substring(7),
    userId: body.userId,
    pickup: body.pickup,
    destination: body.destination,
    price: body.price,
    status: "cancelled",
  }

  // SONAR ISSUE: SQL Injection
  const deleteQuery = "DELETE FROM rides WHERE id = '" + body.rideId + "'"

  console.log("Cancelling ride: " + body.rideId)

  // SONAR ISSUE: No error handling
  return NextResponse.json({ success: true, ride: rideData })
}
