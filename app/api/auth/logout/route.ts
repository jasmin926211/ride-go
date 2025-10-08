import { type NextRequest, NextResponse } from "next/server"
import { deleteSession } from "@/lib/auth"
import type { ApiResponse } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("session_token")?.value

    if (token) {
      deleteSession(token)
    }

    const response = NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Logout successful",
      },
      { status: 200 },
    )

    // Clear session cookie
    response.cookies.delete("session_token")

    return response
  } catch (error) {
    console.error("[v0] Logout error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Logout failed",
      },
      { status: 500 },
    )
  }
}
