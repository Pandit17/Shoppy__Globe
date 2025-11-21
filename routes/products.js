// ================================
// Product Routes: Listing, Detail, and Search
// ================================

import express from "express";
import { getProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

// ================================
// GET /api/products
// Query Parameters:
//   - search: optional, filter by product name
//   - page: optional, default 1
//   - limit: optional, default 20
// ================================
router.get("/", getProducts);

// ================================
// GET /api/products/:id
// Returns single product by ID
// ================================
router.get("/:id", getProductById);

export default router;
