import { NextResponse } from 'next/server';

import connectDB from '@/lib/mongobd';
import User from '@/models/UserSchema';

// Create a new user
export const POST = async (req: Request) => {
  try {
    await connectDB();
    const { name, email, role, password } = await req.json();
    
    const user = new User({ name, email, role, password });
    await user.save();
    
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating user' , error }, { status: 500 });
  }
};

// Get all users
export const GET = async () => {
  try {
    await connectDB();
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching users', error  }, { status: 500 });
  }
};


