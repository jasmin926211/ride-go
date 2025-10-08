import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getRidesByRiderId } from "@/lib/rides"
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

    if (user.userType !== "rider") {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Only riders can view ride history",
        },
        { status: 403 },
      )
    }

    const rides = getRidesByRiderId(user.id)

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: { rides },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Get ride history error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Failed to get ride history",
      },
      { status: 500 },
    )
  }
}
