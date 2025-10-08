import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDriverEarnings } from "@/lib/rides"
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

    if (user.userType !== "driver") {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Only drivers can view earnings",
        },
        { status: 403 },
      )
    }

    const earnings = getDriverEarnings(user.id)

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: { earnings },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Get driver earnings error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Failed to get driver earnings",
      },
      { status: 500 },
    )
  }
}
