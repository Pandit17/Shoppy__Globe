// ================================
// MongoDB connection handler using Mongoose
// ================================

import mongoose from "mongoose";

/**
 * Connects to MongoDB using the provided URI.
 * @param {string} uri - MongoDB connection string
 */
const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

export default connectDB;
