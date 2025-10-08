import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { cancelRide } from "@/lib/rides"
import type { ApiResponse } from "@/lib/types"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ rideId: string }> }) {
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

    const { rideId } = await params
    const ride = cancelRide(rideId, user.id)

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: { ride },
        message: "Ride cancelled successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Cancel ride error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to cancel ride",
      },
      { status: 400 },
    )
  }
}
