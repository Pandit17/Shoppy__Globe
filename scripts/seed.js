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
    console.log(`✅ Inserted ${products.length} sample products`);

    // Create demo user with hashed password
    const hash = await bcrypt.hash(testUser.password, 10);
    const user = await User.create({ ...testUser, password: hash });
    console.log(`✅ Demo user created: ${user.email}`);

    // Pre-fill cart for demo purposes
    const cartItems = [
      {
        user: user._id,
        product: products[0]._id,
        quantity: 2,
      },
      {
        user: user._id,
        product: products[1]._id,
        quantity: 1,
      },
    ];
    await CartItem.insertMany(cartItems);
    console.log(`✅ Demo cart pre-filled with ${cartItems.length} items`);

    console.log("🎉 Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

run();
