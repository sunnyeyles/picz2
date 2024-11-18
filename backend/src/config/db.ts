import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
dotenv.config();

export const connectDB = async () => {
  try {
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@prosperly.l0bdy.mongodb.net/?retryWrites=true&w=majority&appName=prosperly`
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
