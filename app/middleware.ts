import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  console.log('Middleware triggered');
  console.log('Token from cookies:', token);

  if (!token) {
    console.log('No token found. Unauthorized.');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    console.log('Token verified:', verified);
    request.headers.set('user', JSON.stringify(verified));
    return NextResponse.next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
