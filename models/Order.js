// ================================
// Order Model: Stores placed orders
// ================================

import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }, // Capture product price at order time
  },
  { _id: false } // Prevent separate _id for each item
);

const orderSchema = new mongoose.Schema(
  {
    // User placing the order
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Ordered items
    items: { type: [orderItemSchema], required: true, validate: v => v.length > 0 },

    // Total order price
    total: { type: Number, required: true, min: 0 },

    // Order status
    status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  },
  { timestamps: true } // Auto adds createdAt and updatedAt
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
