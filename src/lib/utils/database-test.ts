import { connectToDatabase } from "@/lib/mongodb"
import { validateEnvironment } from "@/lib/config/env-validation"

export async function testDatabaseConnection() {
  try {
    console.log("[v0] Testing database connection...")

    // Validate environment variables
    const config = validateEnvironment()
    console.log("[v0] Environment validation passed")

    // Test MongoDB connection
    const { db } = await connectToDatabase()
    console.log("[v0] MongoDB connection successful")

    // Test collections
    const collections = await db.listCollections().toArray()
    console.log(
      "[v0] Available collections:",
      collections.map((c) => c.name),
    )

    return {
      success: true,
      message: "Database connection test passed",
      collections: collections.map((c) => c.name),
    }
  } catch (error) {
    console.error("[v0] Database connection test failed:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
