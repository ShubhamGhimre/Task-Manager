import { middleware } from '@/app/middleware';
import connectDB from '@/lib/mongobd';
import Task from '@/models/TaskSchema';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';  // Import mongoose

export async function POST(request: NextRequest) {
  try {
    await middleware(request);
    await connectDB();
    const data = await request.json();

    // Extract user from the middleware
    const userHeader = request.headers.get('user');
    console.log('User:', userHeader);
    if (!userHeader) {
      return NextResponse.json({ error: 'Unauthorized no user header' }, { status: 401 }); 
    }
    const user = JSON.parse(userHeader);
    console.log('User:', user);

    // Ensure userId is converted to an ObjectId
    const postedBy = new mongoose.Types.ObjectId(user.userId);

    // Add `postedBy` field
    const taskData = { ...data, postedBy };
    const newTask = await Task.create(taskData);

    return NextResponse.json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}


export async function GET(request: NextRequest) {
  try {
    await middleware(request);
    await connectDB();

    const tasks = await Task.find().populate('assignedTo', 'name email');
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}