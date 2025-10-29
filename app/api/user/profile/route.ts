import { type NextRequest, NextResponse } from "next/server"

// SONAR ISSUE: Hardcoded password
const DEFAULT_PASSWORD = "changeme123"

export async function GET(request: NextRequest) {
  // SONAR ISSUE: No authentication check
  const userId = request.nextUrl.searchParams.get("userId")

  // SONAR ISSUE: SQL Injection
  const query = "SELECT * FROM users WHERE id = '" + userId + "'"

  console.log("Fetching user: " + userId)

  // SONAR ISSUE: No null check
  const user = {
    id: userId,
    name: "John Doe",
    email: "john@example.com",
    password: DEFAULT_PASSWORD, // Exposing password
    ssn: "123-45-6789", // Exposing sensitive PII
    creditCard: "4532-1234-5678-9010",
  }

  // SONAR ISSUE: Returning sensitive data
  return NextResponse.json(user)
}

export async function PUT(request: NextRequest) {
  // SONAR ISSUE: No error handling
  const body = await request.json()

  // SONAR ISSUE: Unused variables
  const temp = "unused"
  const another = "also unused"

  // SONAR ISSUE: SQL Injection
  const updateQuery =
    "UPDATE users SET name = '" + body.name + "', email = '" + body.email + "' WHERE id = '" + body.userId + "'"

  console.log("Update query: " + updateQuery)

  // SONAR ISSUE: No validation
  return NextResponse.json({ success: true })
}
