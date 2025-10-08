// Type definitions for the RideGo application

export interface User {
  id: string
  email: string
  phone: string
  name: string
  userType: "rider" | "driver"
  profileImageUrl?: string
  rating: number
  totalTrips: number
  createdAt: string
}

export interface Driver extends User {
  vehicleType: string
  vehicleMake: string
  vehicleModel: string
  vehicleYear: number
  licensePlate: string
  isOnline: boolean
  currentLocation?: {
    lat: number
    lng: number
  }
  acceptanceRate: number
  totalEarnings: number
}

export interface Ride {
  id: string
  riderId: string
  driverId?: string
  status: "requested" | "accepted" | "in_progress" | "completed" | "cancelled"
  rideType: "standard" | "xl" | "premium"
  isShared: boolean
  pickupLocation: {
    lat: number
    lng: number
  }
  pickupAddress: string
  destinationLocation: {
    lat: number
    lng: number
  }
  destinationAddress: string
  distanceKm: number
  durationMinutes: number
  baseFare: number
  finalFare: number
  requestedAt: string
  acceptedAt?: string
  startedAt?: string
  completedAt?: string
  cancelledAt?: string
}

export interface Session {
  userId: string
  token: string
  expiresAt: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
