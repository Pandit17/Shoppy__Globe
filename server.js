// ================================
// Entry Point: Configures server middleware, routes, and database connection
// ================================

import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import "express-async-errors";

// ================================
// Import local modules
// ================================
import connectDB from "./config/db.js";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import authRouter from "./routes/auth.js";
import orderRouter from "./routes/order.js";
import errorHandler from "./middleware/errorHandler.js";

// ================================
// Express app instance
// ================================
const app = express();

// ================================
// Core Middleware
// ================================
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS || "*", // Restrict in production
  })
);
app.use(express.json());

// ================================
// Database Connection
// ================================
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/shoppyglobe";
connectDB(MONGO_URI);

// ================================
// Routes
// ================================
app.use("/api/products", productsRouter); // Product catalog routes
app.use("/api/cart", cartRouter); // Cart management routes
app.use("/api/auth", authRouter); // Authentication: register & login
app.use("/api/orders", orderRouter); // Order processing routes

// ================================
// Global Error Handler
// ================================
app.use(errorHandler);

// ================================
// Server Startup
// ================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Shoppy__Globe backend running on port ${PORT}`);
});
