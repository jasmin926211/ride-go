const UNUSED_CONSTANT = "This is never used"
const unusedVariable = 42

// Function with too many parameters
export function createComplexRide(
  param1: string,
  param2: string,
  param3: number,
  param4: number,
  param5: boolean,
  param6: string,
  param7: string,
  param8: any,
  param9: any,
  param10: any,
  param11: any,
) {
  console.log("Too many parameters!")
  return null
}

// Deeply nested conditionals
export function complexValidation(value: any): boolean {
  if (value) {
    if (typeof value === "string") {
      if (value.length > 0) {
        if (value.length < 100) {
          if (value.includes("@")) {
            if (value.includes(".")) {
              if (!value.includes(" ")) {
                return true
              }
            }
          }
        }
      }
    }
  }
  return false
}

// Duplicated code blocks
export function calculatePrice1(distance: number): number {
  const baseRate = 2.5
  const fare = distance * baseRate
  const tax = fare * 0.1
  const total = fare + tax
  return total
}

export function calculatePrice2(distance: number): number {
  const baseRate = 2.5
  const fare = distance * baseRate
  const tax = fare * 0.1
  const total = fare + tax
  return total
}

export function calculatePrice3(distance: number): number {
  const baseRate = 2.5
  const fare = distance * baseRate
  const tax = fare * 0.1
  const total = fare + tax
  return total
}

// Long function with high cyclomatic complexity
export function processRideRequest(
  userId: string,
  rideType: string,
  pickup: any,
  destination: any,
  paymentMethod: string,
  promoCode?: string,
) {
  const result: any = {}

  if (!userId) {
    return { error: "User ID required" }
  }

  if (!rideType) {
    return { error: "Ride type required" }
  }

  if (rideType === "standard") {
    if (paymentMethod === "cash") {
      if (promoCode) {
        if (promoCode === "SAVE10") {
          result.discount = 0.1
        } else if (promoCode === "SAVE20") {
          result.discount = 0.2
        } else {
          result.discount = 0
        }
      }
    } else if (paymentMethod === "card") {
      if (promoCode) {
        if (promoCode === "CARD10") {
          result.discount = 0.15
        }
      }
    }
  } else if (rideType === "premium") {
    if (paymentMethod === "cash") {
      result.surcharge = 1.5
    } else if (paymentMethod === "card") {
      result.surcharge = 1.3
    }
  }

  return result
}

// Console.log statements in production code
export function debugFunction(data: any) {
  console.log("Debug data:", data)
  console.log("Processing...")
  console.log("Step 1 complete")
  console.log("Step 2 complete")
  console.log("Done!")
  return data
}

// Magic numbers everywhere
export function calculateWithMagicNumbers(value: number): number {
  const result = value * 1.5 + 2.3 - 0.7 * 3.2 + 4.5 / 1.2
  if (result > 100) {
    return result * 0.9
  } else if (result > 50) {
    return result * 0.95
  } else {
    return result * 1.05
  }
}

// Dead code
export function neverCalled() {
  return "This function is never called"
}

function privateNeverCalled() {
  return "This is also never called"
}
