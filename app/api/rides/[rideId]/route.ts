import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getRideById } from "@/lib/rides"
import type { ApiResponse } from "@/lib/types"

export async function GET(request: NextRequest, { params }: { params: Promise<{ rideId: string }> }) {
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
    const ride = getRideById(rideId)

    if (!ride) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Ride not found",
        },
        { status: 404 },
      )
    }

    // Check if user is authorized to view this ride
    if (ride.riderId !== user.id && ride.driverId !== user.id) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 403 },
      )
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: { ride },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Get ride error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Failed to get ride",
      },
      { status: 500 },
    )
  }
}
