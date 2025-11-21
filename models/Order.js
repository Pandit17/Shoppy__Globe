// ================================
// Order Schema: Stores placed orders
// ================================

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // User placing the order
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Ordered items
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true }, // capture price at order time
      },
    ],

    // Total order price
    total: { type: Number, required: true },

    // Order status
    status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
