import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnects";
import Message from "@/models/Message";

export async function GET() {
  try {
    await dbConnect();
    const messages = await Message.find().sort({ createdAt: -1 }); // Sort by newest first
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching messages." },
      { status: 500 }
    );
  }
}
