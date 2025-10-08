import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { createRide } from "@/lib/rides"
import type { ApiResponse } from "@/lib/types"

export async function POST(request: NextRequest) {
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
          error: "Only riders can request rides",
        },
        { status: 403 },
      )
    }

    const body = await request.json()
    const {
      rideType,
      isShared,
      pickupLocation,
      pickupAddress,
      destinationLocation,
      destinationAddress,
      distanceKm,
      durationMinutes,
    } = body

    // Validate required fields
    if (
      !rideType ||
      isShared === undefined ||
      !pickupLocation ||
      !pickupAddress ||
      !destinationLocation ||
      !destinationAddress ||
      !distanceKm ||
      !durationMinutes
    ) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // Create ride
    const ride = createRide(
      user.id,
      rideType,
      isShared,
      pickupLocation,
      pickupAddress,
      destinationLocation,
      destinationAddress,
      distanceKm,
      durationMinutes,
    )

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: { ride },
        message: "Ride requested successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Request ride error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to request ride",
      },
      { status: 500 },
    )
  }
}
