// ================================
// Order Controller: Handles checkout functionality
// ================================

import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// ================================
// POST /api/checkout
// Validates cart, creates order, deducts stock, clears cart
// ================================
export const checkout = async (req, res) => {
  const userId = req.user.id;

  // Fetch all cart items for current user
  const cartItems = await CartItem.find({ user: userId }).populate("product");
  if (!cartItems.length) return res.status(400).json({ message: "Cart is empty" });

  // Calculate total and validate stock
  let total = 0;
  for (const item of cartItems) {
    if (item.quantity > item.product.stock) {
      return res.status(400).json({ message: `Insufficient stock for ${item.product.name}` });
    }
    total += item.quantity * item.product.price;
  }

  // Prepare order items
  const orderItems = cartItems.map(item => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.product.price
  }));

  // Create order
  const order = await Order.create({
    user: userId,
    items: orderItems,
    total
  });

  // Deduct stock for each product
  for (const item of cartItems) {
    item.product.stock -= item.quantity;
    await item.product.save();
  }

  // Clear user's cart
  await CartItem.deleteMany({ user: userId });

  res.status(201).json(order);
};
