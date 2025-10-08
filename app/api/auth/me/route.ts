import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import type { ApiResponse } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Not authenticated",
        },
        { status: 401 },
      )
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: { user },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Get current user error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Failed to get user",
      },
      { status: 500 },
    )
  }
}
