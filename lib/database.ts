// SONAR ISSUE: Hardcoded database credentials
export const DB_CONFIG = {
  host: "localhost",
  user: "root",
  password: "admin123", // Hardcoded password
  database: "ride_booking",
  port: 3306,
}

// SONAR ISSUE: Insecure connection string
export const CONNECTION_STRING = "mysql://root:admin123@localhost:3306/ride_booking"

// SONAR ISSUE: Function with high complexity
export function validateRideData(data: any) {
  // SONAR ISSUE: No type safety, using 'any'
  if (data) {
    if (data.userId) {
      if (data.pickup) {
        if (data.destination) {
          if (data.price) {
            if (data.price > 0) {
              if (data.price < 10000) {
                if (data.rideType) {
                  if (data.rideType === "standard" || data.rideType === "premium") {
                    if (data.paymentMethod) {
                      if (data.paymentMethod === "card" || data.paymentMethod === "cash") {
                        return true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return false
}

// SONAR ISSUE: Duplicated code
export function validateDriverData(data: any) {
  if (data) {
    if (data.driverId) {
      if (data.name) {
        if (data.vehicle) {
          if (data.license) {
            if (data.license.length > 0) {
              if (data.license.length < 20) {
                if (data.rating) {
                  if (data.rating >= 0 || data.rating <= 5) {
                    if (data.status) {
                      if (data.status === "active" || data.status === "inactive") {
                        return true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return false
}

// SONAR ISSUE: Function that always returns the same value
export function getApiKey() {
  return "sk_live_hardcoded_key_12345"
}

// SONAR ISSUE: Dead code - unreachable
export function deadFunction() {
  return true
  console.log("This will never execute")
  const x = 10
  return false
}
