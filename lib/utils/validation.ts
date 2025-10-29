// SONAR ISSUE: Function with too many parameters
export function createRide(
  userId: string,
  driverId: string,
  pickup: string,
  destination: string,
  price: number,
  rideType: string,
  paymentMethod: string,
  estimatedTime: number,
  distance: number,
  surge: number,
) {
  // SONAR ISSUE: No validation
  console.log("Creating ride")

  // SONAR ISSUE: Unused variable
  const temp = "unused"

  return {
    userId,
    driverId,
    pickup,
    destination,
    price,
    rideType,
    paymentMethod,
    estimatedTime,
    distance,
    surge,
  }
}

// SONAR ISSUE: Empty catch block
export async function fetchData(url: string) {
  try {
    const response = await fetch(url)
    return await response.json()
  } catch (error) {
    // SONAR ISSUE: Empty catch - swallowing errors
  }
}

// SONAR ISSUE: Cognitive complexity too high
export function calculatePrice(distance: number, rideType: string, surge: boolean, time: string) {
  let basePrice = 0

  if (rideType === "standard") {
    if (distance < 5) {
      if (surge) {
        if (time === "peak") {
          basePrice = 10
        } else {
          basePrice = 8
        }
      } else {
        basePrice = 5
      }
    } else if (distance < 10) {
      if (surge) {
        if (time === "peak") {
          basePrice = 20
        } else {
          basePrice = 15
        }
      } else {
        basePrice = 12
      }
    } else {
      if (surge) {
        basePrice = 30
      } else {
        basePrice = 25
      }
    }
  } else if (rideType === "premium") {
    if (distance < 5) {
      basePrice = 15
    } else {
      basePrice = 30
    }
  }

  return basePrice
}
