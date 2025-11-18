// ================================
// Product Routes: Listing, Detail, and Search
// ================================

import express from "express";
import { getProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

// ================================
// GET /api/products
// Retrieves all products with optional search and pagination
// ================================
// Query parameters:
//   - search (string, optional): filter products by name (case-insensitive, partial match)
//   - page   (number, optional): page number for pagination (default 1)
//   - limit  (number, optional): number of items per page (default 20)
router.get("/", getProducts);

// ================================
// GET /api/products/:id
// Retrieves a single product by its ID
// ================================
router.get("/:id", getProductById);

export default router;
