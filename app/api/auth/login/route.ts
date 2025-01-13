import { NextResponse } from 'next/server';
import { verifyPassword, generateToken } from '@/lib/auth';
import connectDB from '@/lib/mongobd';
import User from '@/models/UserSchema';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = generateToken(user);

    const response = NextResponse.json({ message: 'Login successful', token });
    response.cookies.set('auth-token', token, { httpOnly: true, secure: true, maxAge: 3600 });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
