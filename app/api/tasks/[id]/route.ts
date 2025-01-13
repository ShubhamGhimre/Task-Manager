import { middleware } from "@/app/middleware";
import connectDB from "@/lib/mongobd";
import Task from "@/models/TaskSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await middleware(request);
        await connectDB();

        // Fetch the task by ID
        const taskId = params.id;
        const task = await Task.findById(taskId).populate('assignedTo').populate('postedBy');

        if (!task) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json({ task });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to retrieve task' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await middleware(request);
        await connectDB();
        const data = await request.json();

        // Fetch the task by ID
        const taskId = params.id;
        const task = await Task.findByIdAndUpdate(taskId, data, { new: true });

        if (!task) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Task updated successfully', task });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await middleware(request);
        await connectDB();

        // Fetch the task by ID
        const taskId = params.id;
        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
    }
}