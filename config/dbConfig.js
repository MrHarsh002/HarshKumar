import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Error in Connecting Database", error)
        process.exit(1);
    }
}

export default dbConnect;