import { NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth';
import User from '@/models/UserSchema';
import connectDB from '@/lib/mongobd';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { name, email, role, password } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ name, email, role, password: hashedPassword });

    return NextResponse.json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong ' }, { status: 500 });
  }
}
