// ================================
// Checkout Route: Handles placing orders for logged-in users
// ================================

import express from "express";
import { checkout } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// ================================
// POST /api/checkout
// Protected endpoint: creates order, updates stock, clears cart
// ================================
router.post("/checkout", authMiddleware, checkout);

export default router;
