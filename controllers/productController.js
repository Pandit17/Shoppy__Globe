// ================================
// Product Controllers: List, Search, and Detail
// ================================

import mongoose from "mongoose";
import Product from "../models/Product.js";

// ================================
// GET /api/products
// List products with optional search and pagination
// ================================
export const getProducts = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 20);
  const skip = (page - 1) * limit;

  const searchQuery = req.query.search
    ? { name: { $regex: req.query.search, $options: "i" } }
    : {};

  const total = await Product.countDocuments(searchQuery);
  const products = await Product.find(searchQuery)
    .skip(skip)
    .limit(limit)
    .lean();

  res.json({
    status: "success",
    message: "Products retrieved successfully",
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data: products,
  });
};

// ================================
// GET /api/products/:id
// Retrieve a single product by its ID
// ================================
export const getProductById = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ status: "error", message: "Invalid product ID" });
  }

  const product = await Product.findById(id).lean();
  if (!product) {
    return res.status(404).json({ status: "error", message: "Product not found" });
  }

  res.json({
    status: "success",
    message: "Product retrieved successfully",
    data: product,
  });
};
