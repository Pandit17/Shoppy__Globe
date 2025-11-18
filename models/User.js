// ================================
// User Schema: Stores user credentials for authentication
// ================================

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Auto add createdAt and updatedAt fields
  }
);

const User = mongoose.model("User", userSchema);
export default User;
