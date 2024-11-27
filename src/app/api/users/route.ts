import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnects';
import User from '@/models/User';

export async function GET(req: Request) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all users from the database
    const users = await User.find({});

    // If no users are found
    if (!users || users.length === 0) {
      return NextResponse.json({ message: 'No users found' }, { status: 404 });
    }

    // Return the list of users
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    // Handle errors
    return NextResponse.json(
      { message: 'Failed to fetch users', error },
      { status: 500 }
    );
  }
}
