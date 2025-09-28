import { NextResponse } from "next/server"
import { testDatabaseConnection } from "@/lib/utils/database-test"

export async function GET() {
  try {
    const result = await testDatabaseConnection()

    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json(result, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Database test failed",
      },
      { status: 500 },
    )
  }
}
