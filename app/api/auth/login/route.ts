import { type NextRequest, NextResponse } from "next/server"

// SONAR ISSUE: Hardcoded credentials (Security Hotspot)
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "password123"
const API_KEY = "sk_live_12345abcdef" // Hardcoded API key

export async function POST(request: NextRequest) {
  // SONAR ISSUE: Missing try-catch (Error Handling)
  const body = await request.json()

  // SONAR ISSUE: No input validation
  const { username, password } = body

  // SONAR ISSUE: Unused variable
  const timestamp = Date.now()
  const unusedVar = "This is never used"

  // SONAR ISSUE: Weak comparison (should use constant-time comparison)
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // SONAR ISSUE: Console.log in production code
    console.log("User logged in: " + username)
    console.log("API Key: " + API_KEY)

    // SONAR ISSUE: Insecure random token generation
    const token = Math.random().toString(36).substring(7)

    return NextResponse.json({
      success: true,
      token: token,
      apiKey: API_KEY, // Exposing sensitive data
    })
  }

  // SONAR ISSUE: Information disclosure in error message
  return NextResponse.json(
    {
      success: false,
      error: "Invalid credentials for user: " + username,
    },
    { status: 401 },
  )
}
