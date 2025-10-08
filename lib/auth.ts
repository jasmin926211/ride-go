// Authentication utilities and session management

import { cookies } from "next/headers"
import type { User, Session } from "./types"

// In-memory storage (replace with database in production)
const users: Map<string, User & { password: string }> = new Map()
const sessions: Map<string, Session> = new Map()

// Helper to generate unique IDs
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Helper to generate session token
export function generateToken(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 16)}`
}

// Hash password (simple implementation - use bcrypt in production)
export function hashPassword(password: string): string {
  // In production, use bcrypt or similar
  return Buffer.from(password).toString("base64")
}

// Verify password
export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

// Create session
export function createSession(userId: string): Session {
  const token = generateToken()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days

  const session: Session = {
    userId,
    token,
    expiresAt,
  }

  sessions.set(token, session)
  return session
}

// Get session from token
export function getSession(token: string): Session | null {
  const session = sessions.get(token)
  if (!session) return null

  // Check if expired
  if (new Date(session.expiresAt) < new Date()) {
    sessions.delete(token)
    return null
  }

  return session
}

// Delete session
export function deleteSession(token: string): void {
  sessions.delete(token)
}

// Get current user from request
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("session_token")?.value

  if (!token) return null

  const session = getSession(token)
  if (!session) return null

  const user = users.get(session.userId)
  if (!user) return null

  // Return user without password
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}

// Register new user
export function registerUser(
  email: string,
  password: string,
  name: string,
  phone: string,
  userType: "rider" | "driver",
  driverDetails?: any,
): User {
  // Check if user exists
  for (const user of users.values()) {
    if (user.email === email) {
      throw new Error("User with this email already exists")
    }
    if (user.phone === phone) {
      throw new Error("User with this phone number already exists")
    }
  }

  const userId = generateId()
  const hashedPassword = hashPassword(password)

  const user: User & { password: string } = {
    id: userId,
    email,
    phone,
    name,
    userType,
    password: hashedPassword,
    rating: 5.0,
    totalTrips: 0,
    createdAt: new Date().toISOString(),
    ...driverDetails,
  }

  users.set(userId, user)

  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

// Login user
export function loginUser(email: string, password: string): { user: User; session: Session } {
  // Find user by email
  let foundUser: (User & { password: string }) | null = null
  for (const user of users.values()) {
    if (user.email === email) {
      foundUser = user
      break
    }
  }

  if (!foundUser) {
    throw new Error("Invalid email or password")
  }

  // Verify password
  if (!verifyPassword(password, foundUser.password)) {
    throw new Error("Invalid email or password")
  }

  // Create session
  const session = createSession(foundUser.id)

  const { password: _, ...userWithoutPassword } = foundUser
  return { user: userWithoutPassword, session }
}

// Get user by ID
export function getUserById(userId: string): User | null {
  const user = users.get(userId)
  if (!user) return null

  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}

// Export for testing/seeding
export { users, sessions }
