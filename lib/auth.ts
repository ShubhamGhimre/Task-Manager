import { IUser } from '@/models/UserSchema';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Generate JWT Token
export const generateToken = (user: IUser) => {
    return jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, {
        expiresIn: '1h', // Token expiration time
    });
};

// Hash Password
export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Verify Password
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};
