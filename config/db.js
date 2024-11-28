import mongoose from "mongoose";

// Connect to my Mongo DB
export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connect to MongoDB Atlas.");
    } catch (error) {
        console.error("Problem connecting to the database.")
        process.exit(1);
    }
}