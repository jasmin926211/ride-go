import { type NextRequest, NextResponse } from "next/server"

// SONAR ISSUE: Hardcoded secret
const ENCRYPTION_KEY = "1234567890abcdef"

export async function POST(request: NextRequest) {
  // SONAR ISSUE: Missing error handling
  const body = await request.json()

  // SONAR ISSUE: No input validation
  const driverId = body.driverId
  const latitude = body.latitude
  const longitude = body.longitude

  // SONAR ISSUE: Unused variables
  const temp1 = "unused"
  const temp2 = "also unused"
  const temp3 = "still unused"

  // SONAR ISSUE: Complex function with high cyclomatic complexity
  let status = "unknown"
  if (latitude > 0) {
    if (longitude > 0) {
      if (latitude < 90) {
        if (longitude < 180) {
          if (driverId) {
            if (driverId.length > 0) {
              if (typeof driverId === "string") {
                if (driverId !== "test") {
                  status = "valid"
                } else {
                  status = "test"
                }
              } else {
                status = "invalid_type"
              }
            } else {
              status = "empty"
            }
          } else {
            status = "missing"
          }
        } else {
          status = "out_of_bounds_lng"
        }
      } else {
        status = "out_of_bounds_lat"
      }
    } else {
      status = "negative_lng"
    }
  } else {
    status = "negative_lat"
  }

  console.log("Driver location updated: " + driverId)
  console.log("Encryption key: " + ENCRYPTION_KEY) // Exposing secret

  return NextResponse.json({ success: true, status: status })
}
