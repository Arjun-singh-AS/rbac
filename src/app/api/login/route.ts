import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnects';
import User from '../../../models/User';

type Data = {
  message: string;
  token?: string;
};

export async function POST(req:Request) {

  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ message: 'All fields are required.' },{status:400});

  try {
    await dbConnect();
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) return NextResponse.json({ message: 'User not found.' },{status:404});

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return NextResponse.json({ message: 'Invalid credentials.' },{ status: 401 });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return NextResponse.json({ message: 'Login successful', token }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
