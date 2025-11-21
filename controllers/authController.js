// ================================
// Authentication Controller: Register & Login
// ================================

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Generate JWT for authenticated user
 * @param {Object} user - User object
 * @returns {string} JWT token
 */
const generateToken = (user) => {
  const payload = { id: user._id.toString(), email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

/**
 * POST /api/register
 * Registers a new user (does NOT generate JWT)
 * @body { name, email, password }
 */
export const register = async (req, res) => {
  const { name = "", email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Email and password are required",
    });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid email format",
    });
  }

  // Password strength validation
  // Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special char
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=])[A-Za-z\d!@#$%^&*()_\-+=]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      status: "error",
      message:
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
    });
  }

  // Check if email already exists
  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(409).json({
      status: "error",
      message: "Email already in use",
    });
  }

  // Hash password
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });

  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    data: { id: user._id, name: user.name, email: user.email },
  });
};

/**
 * POST /api/login
 * Authenticates a user and generates JWT
 * @body { email, password }
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "Invalid credentials",
    });
  }

  // Verify password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({
      status: "error",
      message: "Invalid credentials",
    });
  }

  // Generate JWT
  const token = generateToken(user);

  res.json({
    status: "success",
    message: "Login successful",
    data: {
      user: { id: user._id, name: user.name, email: user.email },
      token,
    },
  });
};
