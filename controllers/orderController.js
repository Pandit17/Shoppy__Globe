// ================================
// Order Controller: Handles checkout functionality
// ================================

import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// ================================
// POST /api/orders/checkout
// Validates cart, creates order, deducts stock, clears cart
// ================================
export const checkout = async (req, res) => {
  const userId = req.user.id;
  const cartItems = await CartItem.find({ user: userId }).populate("product");

  if (!cartItems.length) return res.status(400).json({ status: "error", message: "Cart is empty" });

  let total = 0;
  for (const item of cartItems) {
    if (item.quantity > item.product.stock)
      return res.status(400).json({ status: "error", message: `Insufficient stock for ${item.product.name}` });
    total += item.quantity * item.product.price;
  }

  const orderItems = cartItems.map(item => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const order = await Order.create({ user: userId, items: orderItems, total });

  for (const item of cartItems) {
    item.product.stock -= item.quantity;
    await item.product.save();
  }

  await CartItem.deleteMany({ user: userId });

  res.status(201).json({ status: "success", order });
};
