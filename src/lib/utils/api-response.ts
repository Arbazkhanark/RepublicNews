import { NextResponse } from "next/server"

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export function successResponse<T>(data: T, message?: string) {
  return NextResponse.json({
    success: true,
    data,
    message,
  } as ApiResponse<T>)
}

export function errorResponse(error: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      error,
    } as ApiResponse,
    { status },
  )
}

export function handleApiError(error: any) {
  console.error("API Error:", error)

  if (error.name === "ValidationError") {
    return errorResponse("Validation failed: " + error.message, 400)
  }

  if (error.name === "MongoError" || error.name === "MongoServerError") {
    return errorResponse("Database error occurred", 500)
  }

  if (error.message?.includes("JWT")) {
    return errorResponse("Authentication failed", 401)
  }

  return errorResponse("Internal server error", 500)
}
