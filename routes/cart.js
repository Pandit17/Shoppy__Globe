// ================================
// Cart Routes
// ================================

import express from "express";
import {
  getCartItems,
  addToCart,
  updateCartItem,
  deleteCartItem
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// ================================
// GET /api/cart
// Retrieve all cart items for the user
// ================================
router.get("/", authMiddleware, getCartItems);

// ================================
// POST /api/cart
// Add a product to cart
// ================================
router.post("/", authMiddleware, addToCart);

// ================================
// PUT /api/cart/:cartItemId
// Update cart item quantity
// ================================
router.put("/:cartItemId", authMiddleware, updateCartItem);

// ================================
// DELETE /api/cart/:cartItemId
// Remove cart item
// ================================
router.delete("/:cartItemId", authMiddleware, deleteCartItem);

export default router;
