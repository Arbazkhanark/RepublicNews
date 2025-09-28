// import { Opinion } from "@/lib/models/index";
import { getOpinionModel } from "@/lib/models";
import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";


// Add admin auth wrapper
export async function GET(req: NextRequest) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const query: any = {};
  if (status) query.status = status;

  const Opinion= getOpinionModel();
  const opinions = await Opinion.find(query).sort({ createdAt: -1 }).limit(100);
  return NextResponse.json({ opinions });
}
