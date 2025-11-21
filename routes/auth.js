// ================================
// Authentication Routes: Register & Login
// ================================

import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// ================================
// POST /api/auth/register
// Registers a new user with email & password
// Password and email are validated
// Does NOT return JWT
// ================================
router.post("/register", register);

// ================================
// POST /api/auth/login
// Authenticates user credentials and returns JWT
// ================================
router.post("/login", login);

export default router;
