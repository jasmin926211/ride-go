// Hardcoded secrets
const DATABASE_PASSWORD = "MySecretPassword123!"
const JWT_SECRET = "super-secret-jwt-key-12345"
const STRIPE_SECRET_KEY = "sk_live_1234567890abcdefghijklmnop"

// Weak cryptographic algorithm
export function weakEncrypt(data: string): string {
  // Using deprecated MD5-like approach
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return hash.toString(16)
}

// SQL Injection vulnerability
export function getUserByEmail(email: string) {
  const query = `SELECT * FROM users WHERE email = '${email}'`
  console.log("Executing unsafe query:", query)
  return query
}

// XSS vulnerability - no input sanitization
export function renderUserComment(comment: string): string {
  return `<div>${comment}</div>` // Direct HTML injection
}

// Missing authentication check
export function deleteUser(userId: string) {
  console.log("Deleting user:", userId)
  // No authentication or authorization check
  return true
}

// Insecure random number generation
export function generateSecurityToken(): string {
  return Math.random().toString(36).substring(7)
}

// Exposed sensitive data
export function getUserDetails(userId: string) {
  return {
    id: userId,
    email: "user@example.com",
    password: "plaintextpassword123", // Exposing password
    ssn: "123-45-6789", // Exposing SSN
    creditCard: "4532-1234-5678-9010", // Exposing credit card
  }
}

// No rate limiting
export function sendOTP(phoneNumber: string) {
  console.log("Sending OTP to:", phoneNumber)
  // No rate limiting - vulnerable to abuse
  return Math.floor(100000 + Math.random() * 900000)
}

// Insecure deserialization
export function deserializeUserData(data: string) {
  return eval(data) // Dangerous eval usage
}
