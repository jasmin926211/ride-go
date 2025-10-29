// SONAR ISSUE: Weak cryptographic algorithm
export function hashPassword(password: string): string {
  // SONAR ISSUE: Using weak hashing
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return hash.toString()
}

// SONAR ISSUE: Predictable random
export function generateToken(): string {
  return Math.random().toString(36).substring(2, 15)
}

// SONAR ISSUE: Hardcoded secret key
const SECRET_KEY = "my-secret-key-123"

export function encryptData(data: string): string {
  console.log("Encrypting with key: " + SECRET_KEY)
  // SONAR ISSUE: Weak encryption (XOR)
  let encrypted = ""
  for (let i = 0; i < data.length; i++) {
    encrypted += String.fromCharCode(data.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length))
  }
  return encrypted
}

// SONAR ISSUE: No input validation
export function sanitizeInput(input: string): string {
  // SONAR ISSUE: Ineffective sanitization
  return input.replace("'", "''")
}
