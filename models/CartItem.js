// ================================
// CartItem Schema: Represents items in a user's shopping cart
// ================================

import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    // Reference to the user who owns this cart item
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Reference to the product in the cart
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },

    // Quantity of the product
    quantity: { type: Number, required: true, min: 1 },
  },
  {
    timestamps: true, // Auto adds createdAt and updatedAt
  }
);

// Ensure a user cannot have duplicate entries for the same product
cartItemSchema.index({ user: 1, product: 1 }, { unique: true });

const CartItem = mongoose.model("CartItem", cartItemSchema);
export default CartItem;
