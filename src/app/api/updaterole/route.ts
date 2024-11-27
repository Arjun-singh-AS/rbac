import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnects"; // Ensure this path points to your MongoDB connection utility
import User from "@/models/User"; // Ensure this path points to your User model

export async function PUT(req: Request) {
  try {
    // Parse the request body
    const { userId, role } = await req.json();

    // Validate inputs
    if (!userId || !role) {
      return NextResponse.json({ message: "UserId and role are required" }, { status: 400 });
    }

    // Connect to the database
    await dbConnect();

    // Update the user's role
    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true } // Return the updated document
    );

    // Handle case where the user is not found
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Respond with the updated user data
    return NextResponse.json({ message: "Role updated successfully", user }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating role:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
