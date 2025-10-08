import { type NextRequest, NextResponse } from "next/server"
import { loginUser } from "@/lib/auth"
import type { ApiResponse } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Email and password are required",
        },
        { status: 400 },
      )
    }

    // Login user
    const { user, session } = loginUser(email, password)

    // Set session cookie
    const response = NextResponse.json<ApiResponse>(
      {
        success: true,
        data: { user, token: session.token },
        message: "Login successful",
      },
      { status: 200 },
    )

    response.cookies.set("session_token", session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      },
      { status: 401 },
    )
  }
}
