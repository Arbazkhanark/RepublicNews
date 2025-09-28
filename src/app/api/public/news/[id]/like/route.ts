import { type NextRequest, NextResponse } from "next/server"
// import { getNewsCollection } from "@/lib/database/collections"
import { ObjectId } from "mongodb"
import { connectToDatabase } from "@/lib/mongodb";
import { getArticleModel } from "@/lib/models";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
        await connectToDatabase();
    // const newsCollection = await getNewsCollection()
    const newsCollection = await getArticleModel();

    await newsCollection.updateOne({ _id: new ObjectId(params.id) }, { $inc: { likes: 1 } })

    return NextResponse.json({ message: "Like count updated" })
  } catch (error) {
    console.error("Update like count error:", error)
    return NextResponse.json({ error: "Failed to update like count" }, { status: 500 })
  }
}
