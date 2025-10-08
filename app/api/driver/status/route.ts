import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { updateDriverStatus } from "@/lib/rides"
import type { ApiResponse } from "@/lib/types"

export async function PUT(request: NextRequest) {
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
          error: "Only drivers can update status",
        },
        { status: 403 },
      )
    }

    const body = await request.json()
    const { isOnline } = body

    if (isOnline === undefined) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "isOnline field is required",
        },
        { status: 400 },
      )
    }

    updateDriverStatus(user.id, isOnline)

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: { isOnline },
        message: `Driver status updated to ${isOnline ? "online" : "offline"}`,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Update driver status error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Failed to update driver status",
      },
      { status: 500 },
    )
  }
}
