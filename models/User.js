// ================================
// User Schema: Stores credentials and user information
// ================================

import mongoose from "mongoose";

// Schema definition
const userSchema = new mongoose.Schema(
  {
    // Optional display name
    name: { type: String, default: "" },

    // Unique email used for login
    email: { type: String, unique: true, required: true, trim: true },

    // Password (hashed) for authentication
    password: {
      type: String,
      required: true,
      match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
    },
  },
  {
    timestamps: true, // Auto adds createdAt and updatedAt
  }
);

// Index on email to prevent duplicates
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);
export default User;
