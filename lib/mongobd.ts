import mongoose from 'mongoose';

const MONGODBURI = process.env.MONGODB_URL || 'mongodb://localhost:27017/TaskManager';

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(MONGODBURI, {

        })
        if (connection) {
            console.log('Database connected successfully');
        } else {
            console.log('Database connection failed');
        }

    } catch (error) {
        console.log(error);
    }
}

export default connectDB;