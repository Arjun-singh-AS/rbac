import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnects";
import Message from "@/models/Message";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const body = await req.json();
    const { token, content } = body;

    if (!token) {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 401 }
      );
    }

    // Verify the token
    const secretKey = process.env.JWT_SECRET || "your-secret-key";
    const decoded = jwt.verify(token, secretKey) as { role: string };

    // Check if the user is a developer
    if (decoded.role !== "Developer") {
      return NextResponse.json(
        { message: "You are not authorized to add messages" },
        { status: 403 }
      );
    }

    // Create a new message
    const newMessage = await Message.create({
      content,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Message added successfully", data: newMessage },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add message", error},
      { status: 500 }
    );
  }
}
