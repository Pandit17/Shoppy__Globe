// ================================
// Seed Script: Populates DB with products, demo user, and demo cart
// ================================

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import CartItem from "../models/CartItem.js";
import { sampleProducts, testUser } from "../utils/seedData.js";

// ================================
// Seed Function
// ================================
const run = async () => {
  try {
    // Connect to MongoDB
    await connectDB(process.env.MONGO_URI);

    // Clear existing collections
    await Product.deleteMany({});
    await CartItem.deleteMany({});
    await User.deleteMany({});

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);

    // Create demo user
    const hash = await bcrypt.hash(testUser.password, 10);
    const user = await User.create({ ...testUser, password: hash });

    // Pre-fill cart with first product (quantity 2) for testing checkout
    await CartItem.create({
      user: user._id,
      product: products[0]._id,
      quantity: 2
    });

    console.log("Database seeded successfully ✅");
    process.exit(0);

  } catch (err) {
    console.error("Seeding failed ❌:", err);
    process.exit(1);
  }
};

run();
