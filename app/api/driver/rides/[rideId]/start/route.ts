import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { startRide } from "@/lib/rides"
import type { ApiResponse } from "@/lib/types"

export async function POST(request: NextRequest, { params }: { params: Promise<{ rideId: string }> }) {
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
          error: "Only drivers can start rides",
        },
        { status: 403 },
      )
    }

    const { rideId } = await params
    const ride = startRide(rideId, user.id)

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: { ride },
        message: "Ride started successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Start ride error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to start ride",
      },
      { status: 400 },
    )
  }
}
