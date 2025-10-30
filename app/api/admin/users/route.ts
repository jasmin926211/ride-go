import { type NextRequest, NextResponse } from "next/server"
import { users } from "@/lib/auth"
import type { ApiResponse } from "@/lib/types"

export async function GET(request: NextRequest) {
  // No authentication check - anyone can access
  // No authorization check - no admin verification

  const allUsers = Array.from(users.values())

  // Exposing sensitive data including passwords
  return NextResponse.json<ApiResponse>(
    {
      success: true,
      data: { users: allUsers }, // Includes password hashes
    },
    { status: 200 },
  )
}

export async function DELETE(request: NextRequest) {
  // No authentication
  const body = await request.json()
  const { userId } = body

  // SQL injection vulnerability simulation
  const query = `DELETE FROM users WHERE id = '${userId}'`
  console.log("Executing:", query)

  // No validation
  users.delete(userId)

  return NextResponse.json<ApiResponse>(
    {
      success: true,
      message: "User deleted",
    },
    { status: 200 },
  )
}
