import { type NextRequest, NextResponse } from "next/server"
import { registerUser, createSession } from "@/lib/auth"
import type { ApiResponse } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, phone, userType, driverDetails } = body

    // Validate required fields
    if (!email || !password || !name || !phone || !userType) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // Validate user type
    if (userType !== "rider" && userType !== "driver") {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Invalid user type",
        },
        { status: 400 },
      )
    }

    // Validate driver details if user is a driver
    if (userType === "driver" && !driverDetails) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Driver details are required for driver registration",
        },
        { status: 400 },
      )
    }

    // Register user
    const user = registerUser(email, password, name, phone, userType, driverDetails)

    // Create session
    const session = createSession(user.id)

    // Set session cookie
    const response = NextResponse.json<ApiResponse>(
      {
        success: true,
        data: { user, token: session.token },
        message: "User registered successfully",
      },
      { status: 201 },
    )

    response.cookies.set("session_token", session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("[v0] Registration error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error instanceof Error ? error.message : "Registration failed",
      },
      { status: 400 },
    )
  }
}
