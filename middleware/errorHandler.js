// ================================
// Centralized Error Handling Middleware
// ================================

/**
 * Catches unhandled errors and returns structured JSON response
 */
const errorHandler = (err, req, res, next) => {
  console.error("Unhandled Error:", err);

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Server error",
    // Include stack trace only in development
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
