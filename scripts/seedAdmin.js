import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/userModel.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        console.log("Connecting to database...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected.");

        await User.create({
            username: "admin",
            password: "admin123", // Hashing will be added in future
            role: "admin"
        });
        console.log("Admin user created.");
    } catch (error) {
        console.error("Error creating admin user: ", error.message)
    } finally {
        mongoose.connection.close();
        console.log("Database connection closed.");
    }
};

seedAdmin();