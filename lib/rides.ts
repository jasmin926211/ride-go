// Ride management utilities

import type { Ride, Driver } from "./types"
import { generateId } from "./auth"

// In-memory storage (replace with database in production)
const rides: Map<string, Ride> = new Map()
const drivers: Map<string, Driver> = new Map()

// Calculate fare based on ride parameters
export function calculateFare(distanceKm: number, rideType: "standard" | "xl" | "premium", isShared: boolean): number {
  const baseRate = 2.5 // per km
  const typeMultipliers = {
    standard: 1.0,
    xl: 1.5,
    premium: 1.92,
  }

  let fare = baseRate * distanceKm * typeMultipliers[rideType]

  if (isShared) {
    fare *= 0.7 // 30% discount
  }

  return Math.max(fare, 5.0) // Minimum fare
}

// Create a new ride request
export function createRide(
  riderId: string,
  rideType: "standard" | "xl" | "premium",
  isShared: boolean,
  pickupLocation: { lat: number; lng: number },
  pickupAddress: string,
  destinationLocation: { lat: number; lng: number },
  destinationAddress: string,
  distanceKm: number,
  durationMinutes: number,
): Ride {
  const rideId = generateId()
  const baseFare = calculateFare(distanceKm, rideType, isShared)

  const ride: Ride = {
    id: rideId,
    riderId,
    status: "requested",
    rideType,
    isShared,
    pickupLocation,
    pickupAddress,
    destinationLocation,
    destinationAddress,
    distanceKm,
    durationMinutes,
    baseFare,
    finalFare: baseFare,
    requestedAt: new Date().toISOString(),
  }

  rides.set(rideId, ride)
  return ride
}

// Get ride by ID
export function getRideById(rideId: string): Ride | null {
  return rides.get(rideId) || null
}

// Get rides by rider ID
export function getRidesByRiderId(riderId: string): Ride[] {
  return Array.from(rides.values()).filter((ride) => ride.riderId === riderId)
}

// Get rides by driver ID
export function getRidesByDriverId(driverId: string): Ride[] {
  return Array.from(rides.values()).filter((ride) => ride.driverId === driverId)
}

// Get pending ride requests (for drivers)
export function getPendingRides(): Ride[] {
  return Array.from(rides.values()).filter((ride) => ride.status === "requested")
}

// Cancel ride
export function cancelRide(rideId: string, userId: string): Ride {
  const ride = rides.get(rideId)
  if (!ride) {
    throw new Error("Ride not found")
  }

  // Check if user is authorized to cancel
  if (ride.riderId !== userId && ride.driverId !== userId) {
    throw new Error("Unauthorized to cancel this ride")
  }

  // Can only cancel if not completed
  if (ride.status === "completed") {
    throw new Error("Cannot cancel completed ride")
  }

  ride.status = "cancelled"
  ride.cancelledAt = new Date().toISOString()

  rides.set(rideId, ride)
  return ride
}

// Accept ride (driver)
export function acceptRide(rideId: string, driverId: string): Ride {
  const ride = rides.get(rideId)
  if (!ride) {
    throw new Error("Ride not found")
  }

  if (ride.status !== "requested") {
    throw new Error("Ride is not available")
  }

  ride.status = "accepted"
  ride.driverId = driverId
  ride.acceptedAt = new Date().toISOString()

  rides.set(rideId, ride)
  return ride
}

// Start ride (driver)
export function startRide(rideId: string, driverId: string): Ride {
  const ride = rides.get(rideId)
  if (!ride) {
    throw new Error("Ride not found")
  }

  if (ride.driverId !== driverId) {
    throw new Error("Unauthorized")
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride must be accepted first")
  }

  ride.status = "in_progress"
  ride.startedAt = new Date().toISOString()

  rides.set(rideId, ride)
  return ride
}

// Complete ride (driver)
export function completeRide(rideId: string, driverId: string): Ride {
  const ride = rides.get(rideId)
  if (!ride) {
    throw new Error("Ride not found")
  }

  if (ride.driverId !== driverId) {
    throw new Error("Unauthorized")
  }

  if (ride.status !== "in_progress") {
    throw new Error("Ride must be in progress")
  }

  ride.status = "completed"
  ride.completedAt = new Date().toISOString()

  rides.set(rideId, ride)
  return ride
}

// Update driver status
export function updateDriverStatus(driverId: string, isOnline: boolean): void {
  const driver = drivers.get(driverId)
  if (driver) {
    driver.isOnline = isOnline
    drivers.set(driverId, driver)
  }
}

// Get driver earnings
export function getDriverEarnings(driverId: string): {
  totalEarnings: number
  todayEarnings: number
  weeklyEarnings: number
  monthlyEarnings: number
  totalTrips: number
} {
  const driverRides = getRidesByDriverId(driverId).filter((ride) => ride.status === "completed")

  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  const totalEarnings = driverRides.reduce((sum, ride) => sum + ride.finalFare, 0)
  const todayEarnings = driverRides
    .filter((ride) => new Date(ride.completedAt!) >= todayStart)
    .reduce((sum, ride) => sum + ride.finalFare, 0)
  const weeklyEarnings = driverRides
    .filter((ride) => new Date(ride.completedAt!) >= weekStart)
    .reduce((sum, ride) => sum + ride.finalFare, 0)
  const monthlyEarnings = driverRides
    .filter((ride) => new Date(ride.completedAt!) >= monthStart)
    .reduce((sum, ride) => sum + ride.finalFare, 0)

  return {
    totalEarnings,
    todayEarnings,
    weeklyEarnings,
    monthlyEarnings,
    totalTrips: driverRides.length,
  }
}

// Export for testing
export { rides, drivers }
