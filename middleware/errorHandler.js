// ================================
// Centralized Error Handling Middleware
// ================================

/**
 * Catches unhandled errors and returns structured response.
 */
const errorHandler = (err, req, res, next) => {
  console.error("Unhandled Error:", err);

  res.status(err.status || 500).json({
    message: err.message || "Server error",
  });
};

export default errorHandler;
