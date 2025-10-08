# RideGo API Documentation

## Overview
This document describes the REST API endpoints for the RideGo ride-booking application.

**Base URL:** `http://localhost:3000/api`

**Authentication:** Session-based authentication using HTTP-only cookies.

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Register a new user (rider or driver).

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe",
  "phone": "+1234567890",
  "userType": "rider", // or "driver"
  "driverDetails": { // Required only for drivers
    "vehicleType": "standard",
    "vehicleMake": "Toyota",
    "vehicleModel": "Camry",
    "vehicleYear": 2022,
    "licensePlate": "ABC123",
    "isOnline": false,
    "acceptanceRate": 100,
    "totalEarnings": 0
  }
}
\`\`\`

**Response (201):**
\`\`\`json
{
  "success": true,
  "data": {
    "user": {
      "id": "1234567890-abc123",
      "email": "user@example.com",
      "name": "John Doe",
      "phone": "+1234567890",
      "userType": "rider",
      "rating": 5.0,
      "totalTrips": 0,
      "createdAt": "2025-01-09T10:00:00.000Z"
    },
    "token": "session-token-here"
  },
  "message": "User registered successfully"
}
\`\`\`

---

### Login
**POST** `/auth/login`

Authenticate a user and create a session.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "securepassword"
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "user": {
      "id": "1234567890-abc123",
      "email": "user@example.com",
      "name": "John Doe",
      "userType": "rider",
      "rating": 5.0,
      "totalTrips": 0
    },
    "token": "session-token-here"
  },
  "message": "Login successful"
}
\`\`\`

---

### Logout
**POST** `/auth/logout`

End the current user session.

**Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Logout successful"
}
\`\`\`

---

### Get Current User
**GET** `/auth/me`

Get the currently authenticated user's information.

**Response (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "user": {
      "id": "1234567890-abc123",
      "email": "user@example.com",
      "name": "John Doe",
      "userType": "rider",
      "rating": 5.0,
      "totalTrips": 0
    }
  }
}
\`\`\`

---

## Rider Endpoints

### Request Ride
**POST** `/rides/request`

Request a new ride (riders only).

**Request Body:**
\`\`\`json
{
  "rideType": "standard", // "standard", "xl", or "premium"
  "isShared": false,
  "pickupLocation": {
    "lat": 40.7128,
    "lng": -74.0060
  },
  "pickupAddress": "123 Main St, New York, NY",
  "destinationLocation": {
    "lat": 40.7580,
    "lng": -73.9855
  },
  "destinationAddress": "Times Square, New York, NY",
  "distanceKm": 5.2,
  "durationMinutes": 15
}
\`\`\`

**Response (201):**
\`\`\`json
{
  "success": true,
  "data": {
    "ride": {
      "id": "ride-123",
      "riderId": "user-123",
      "status": "requested",
      "rideType": "standard",
      "isShared": false,
      "pickupLocation": { "lat": 40.7128, "lng": -74.0060 },
      "pickupAddress": "123 Main St, New York, NY",
      "destinationLocation": { "lat": 40.7580, "lng": -73.9855 },
      "destinationAddress": "Times Square, New York, NY",
      "distanceKm": 5.2,
      "durationMinutes": 15,
      "baseFare": 13.0,
      "finalFare": 13.0,
      "requestedAt": "2025-01-09T10:00:00.000Z"
    }
  },
  "message": "Ride requested successfully"
}
\`\`\`

---

### Get Ride Details
**GET** `/rides/:rideId`

Get details of a specific ride.

**Response (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "ride": {
      "id": "ride-123",
      "riderId": "user-123",
      "driverId": "driver-456",
      "status": "accepted",
      "rideType": "standard",
      "finalFare": 13.0,
      "requestedAt": "2025-01-09T10:00:00.000Z",
      "acceptedAt": "2025-01-09T10:02:00.000Z"
    }
  }
}
\`\`\`

---

### Cancel Ride
**PUT** `/rides/:rideId/cancel`

Cancel a ride (available to both rider and driver).

**Response (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "ride": {
      "id": "ride-123",
      "status": "cancelled",
      "cancelledAt": "2025-01-09T10:05:00.000Z"
    }
  },
  "message": "Ride cancelled successfully"
}
\`\`\`

---

### Get Ride History
**GET** `/rides/history`

Get all rides for the current rider.

**Response (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "rides": [
      {
        "id": "ride-123",
        "status": "completed",
        "rideType": "standard",
        "finalFare": 13.0,
        "completedAt": "2025-01-09T10:30:00.000Z"
      }
    ]
  }
}
\`\`\`

---

## Driver Endpoints

### Update Driver Status
**PUT** `/driver/status`

Toggle driver online/offline status.

**Request Body:**
\`\`\`json
{
  "isOnline": true
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "isOnline": true
  },
  "message": "Driver status updated to online"
}
\`\`\`

---

### Get Ride Requests
**GET** `/driver/requests`

Get all pending ride requests (drivers only).

**Response (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "rides": [
      {
        "id": "ride-123",
        "riderId": "user-123",
        "status": "requested",
        "rideType": "standard",
        "pickupAddress": "123 Main St, New York, NY",
        "destinationAddress": "Times Square, New York, NY",
        "distanceKm": 5.2,
        "finalFare": 13.0,
        "requestedAt": "2025-01-09T10:00:00.000Z"
      }
    ]
  }
}
\`\`\`

---

### Accept Ride
**POST** `/driver/rides/:rideId/accept`

Accept a ride request.

**Response (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "ride": {
      "id": "ride-123",
      "driverId": "driver-456",
      "status": "accepted",
      "acceptedAt": "2025-01-09T10:02:00.000Z"
    }
  },
  "message": "Ride accepted successfully"
}
\`\`\`

---

### Start Ride
**POST** `/driver/rides/:rideId/start`

Start an accepted ride.

**Response (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "ride": {
      "id": "ride-123",
      "status": "in_progress",
      "startedAt": "2025-01-09T10:10:00.000Z"
    }
  },
  "message": "Ride started successfully"
}
\`\`\`

---

### Complete Ride
**POST** `/driver/rides/:rideId/complete`

Complete an in-progress ride.

**Response (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "ride": {
      "id": "ride-123",
      "status": "completed",
      "completedAt": "2025-01-09T10:30:00.000Z"
    }
  },
  "message": "Ride completed successfully"
}
\`\`\`

---

### Get Driver Earnings
**GET** `/driver/earnings`

Get earnings statistics for the current driver.

**Response (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "earnings": {
      "totalEarnings": 1250.50,
      "todayEarnings": 85.00,
      "weeklyEarnings": 450.00,
      "monthlyEarnings": 1250.50,
      "totalTrips": 42
    }
  }
}
\`\`\`

---

## Error Responses

All endpoints may return error responses in the following format:

**400 Bad Request:**
\`\`\`json
{
  "success": false,
  "error": "Missing required fields"
}
\`\`\`

**401 Unauthorized:**
\`\`\`json
{
  "success": false,
  "error": "Not authenticated"
}
\`\`\`

**403 Forbidden:**
\`\`\`json
{
  "success": false,
  "error": "Only drivers can accept rides"
}
\`\`\`

**404 Not Found:**
\`\`\`json
{
  "success": false,
  "error": "Ride not found"
}
\`\`\`

**500 Internal Server Error:**
\`\`\`json
{
  "success": false,
  "error": "Failed to process request"
}
\`\`\`

---

## Testing the API

You can test the API using tools like:
- **Postman** or **Insomnia** for GUI-based testing
- **curl** for command-line testing
- **Thunder Client** VS Code extension

### Example curl commands:

**Register a rider:**
\`\`\`bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "rider@example.com",
    "password": "password123",
    "name": "John Rider",
    "phone": "+1234567890",
    "userType": "rider"
  }'
\`\`\`

**Login:**
\`\`\`bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "rider@example.com",
    "password": "password123"
  }'
\`\`\`

**Request a ride (with session cookie):**
\`\`\`bash
curl -X POST http://localhost:3000/api/rides/request \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "rideType": "standard",
    "isShared": false,
    "pickupLocation": {"lat": 40.7128, "lng": -74.0060},
    "pickupAddress": "123 Main St, New York, NY",
    "destinationLocation": {"lat": 40.7580, "lng": -73.9855},
    "destinationAddress": "Times Square, New York, NY",
    "distanceKm": 5.2,
    "durationMinutes": 15
  }'
\`\`\`

---

## Notes

- All endpoints use session-based authentication via HTTP-only cookies
- The current implementation uses in-memory storage (data is lost on server restart)
- In production, replace in-memory storage with a proper database (Supabase, Neon, etc.)
- Password hashing uses a simple Base64 encoding - replace with bcrypt in production
- CORS and rate limiting should be configured for production use
