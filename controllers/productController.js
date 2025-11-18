// ================================
// Product Controllers: List, Search, and Detail
// ================================

import Product from "../models/Product.js";

// ================================
// GET /api/products
// List products with optional search and pagination
// ================================
export const getProducts = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);   // Current page number
  const limit = Math.max(1, parseInt(req.query.limit) || 20); // Items per page
  const skip = (page - 1) * limit;                           // Skip count for pagination

  // Optional search parameter (case-insensitive, partial match)
  const searchQuery = req.query.search
    ? { name: { $regex: req.query.search, $options: "i" } }
    : {};

  const total = await Product.countDocuments(searchQuery);   // Total products matching search
  const products = await Product.find(searchQuery).skip(skip).limit(limit).lean();

  res.json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    products
  });
};

// ================================
// GET /api/products/:id
// Retrieve a single product by its ID
// ================================
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};
