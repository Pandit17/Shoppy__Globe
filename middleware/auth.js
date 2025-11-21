// ================================
// JWT Authentication Middleware
// Protects routes by verifying the token
// ================================

import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return res.status(401).json({ status: "error", message: "Authorization token required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch {
    return res.status(401).json({ status: "error", message: "Invalid or expired token" });
  }
};

export default auth;
