// ================================
// Handles User Registration and Login with JWT
// ================================

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Generates a JWT for a user using secret and expiry from .env
 * @param {Object} user - User object
 * @returns {string} JWT token
 */
const generateToken = (user) => {
  const payload = { id: user._id.toString(), email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// ================================
// POST /api/register
// ================================
export const register = async (req, res) => {
  const { name = "", email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already used" });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });

  res.status(201).json({
    user: { id: user._id, name: user.name, email: user.email },
    token: generateToken(user),
  });
};

// ================================
// POST /api/login
// ================================
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  res.json({
    user: { id: user._id, name: user.name, email: user.email },
    token: generateToken(user),
  });
};
