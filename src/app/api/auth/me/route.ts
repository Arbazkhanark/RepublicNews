import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/auth/middleware"
import { findUser } from "@/lib/mock-data"
import { connectToDatabase } from "@/lib/mongodb";
import { getUserModel } from "@/lib/models";
// import { connectToDatabase, User } from "@/lib/models/index"

export const GET = withAuth(async (req: NextRequest, user: any) => {
  try {
    await connectToDatabase();
    const User= getUserModel();
    const userData = await User.findById(user.userId).lean()

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Remove password from response
    if (Array.isArray(userData)) {
      return NextResponse.json({ error: "Unexpected array returned for user" }, { status: 500 })
    }
    const { password, ...userWithoutPassword } = userData as { password?: string; [key: string]: any }

    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
})
