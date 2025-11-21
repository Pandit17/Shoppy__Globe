// ================================
// Cart Routes
// ================================

import express from "express";
import {
  getCartItems,
  addToCart,
  updateCartItem,
  deleteCartItem,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// ================================
// GET /api/cart
// Returns all cart items for authenticated user
// ================================
router.get("/", authMiddleware, getCartItems);

// ================================
// POST /api/cart
// Adds a product to cart (with quantity)
// ================================
router.post("/", authMiddleware, addToCart);

// ================================
// PUT /api/cart/:cartItemId
// Updates quantity of an existing cart item
// ================================
router.put("/:cartItemId", authMiddleware, updateCartItem);

// ================================
// DELETE /api/cart/:cartItemId
// Removes a cart item
// ================================
router.delete("/:cartItemId", authMiddleware, deleteCartItem);

export default router;
