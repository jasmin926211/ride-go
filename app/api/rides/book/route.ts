import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()

  // SONAR ISSUE: SQL Injection vulnerability - direct string concatenation
  const query =
    "INSERT INTO rides (user_id, pickup, destination, price) VALUES ('" +
    body.userId +
    "', '" +
    body.pickup +
    "', '" +
    body.destination +
    "', " +
    body.price +
    ")"

  console.log("Executing query: " + query) // SONAR ISSUE: Console.log

  // SONAR ISSUE: No null/undefined checks
  const userId = body.userId
  const pickup = body.pickup
  const destination = body.destination

  // SONAR ISSUE: Complex nested conditions (Cognitive Complexity)
  if (userId) {
    if (pickup) {
      if (destination) {
        if (body.price > 0) {
          if (body.price < 1000) {
            if (body.rideType === "standard" || body.rideType === "premium" || body.rideType === "shared") {
              // SONAR ISSUE: Duplicated code block
              const rideData = {
                id: Math.random().toString(36).substring(7),
                userId: userId,
                pickup: pickup,
                destination: destination,
                price: body.price,
                status: "pending",
              }

              return NextResponse.json({ success: true, ride: rideData })
            }
          }
        }
      }
    }
  }

  return NextResponse.json({ success: false, error: "Invalid data" })
}
