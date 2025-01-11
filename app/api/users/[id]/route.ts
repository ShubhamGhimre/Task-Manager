import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongobd';
import User from '@/models/UserSchema';

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        await connectDB();
        const { id } = await params; // Capture the user ID from the URL
        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching user', error }, { status: 500 });
    }
}

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        await connectDB();
        const { id } = await params; // Capture the user ID from the URL
        const { name, email, role, password } = await req.json();

        // Find the user and update
        const user = await User.findByIdAndUpdate(
            id,
            { name, email, role, password },
        );

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating user', error }, { status: 500 });
    }
};


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        await connectDB();
        const { id } = await params; // Capture the user ID from the URL
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting user', error }, { status: 500 });
    }
};

