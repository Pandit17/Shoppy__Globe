// ================================
// Cart Operations Controller
// ================================

import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

// ================================
// GET /api/cart
// Retrieve all cart items for the logged-in user
// ================================
export const getCartItems = async (req, res) => {
  const userId = req.user.id;
  const cartItems = await CartItem.find({ user: userId }).populate("product");
  res.json(cartItems);
};

// ================================
// POST /api/cart
// Add a product to the cart
// ================================
export const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity = 1 } = req.body;

  const qty = parseInt(quantity);
  if (!productId || isNaN(qty) || qty < 1)
    return res.status(400).json({ message: "Invalid input" });

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });
  if (product.stock < qty)
    return res.status(400).json({ message: "Insufficient stock" });

  let cartItem = await CartItem.findOne({ user: userId, product: productId });

  if (cartItem) {
    cartItem.quantity += qty;
    await cartItem.save();
  } else {
    cartItem = await CartItem.create({ user: userId, product: productId, quantity: qty });
  }

  await cartItem.populate("product");
  res.status(201).json(cartItem);
};

// ================================
// PUT /api/cart/:cartItemId
// Update the quantity of a cart item
// ================================
export const updateCartItem = async (req, res) => {
  const qty = parseInt(req.body.quantity);
  if (isNaN(qty) || qty < 1)
    return res.status(400).json({ message: "Invalid quantity" });

  const item = await CartItem.findById(req.params.cartItemId);
  if (!item) return res.status(404).json({ message: "Cart item not found" });
  if (item.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Access denied" });

  const product = await Product.findById(item.product);
  if (product.stock < qty)
    return res.status(400).json({ message: "Insufficient stock" });

  item.quantity = qty;
  await item.save();

  await item.populate("product");
  res.json(item);
};

// ================================
// DELETE /api/cart/:cartItemId
// Remove a cart item
// ================================
export const deleteCartItem = async (req, res) => {
  const item = await CartItem.findById(req.params.cartItemId);
  if (!item) return res.status(404).json({ message: "Cart item not found" });
  if (item.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Access denied" });

  await item.deleteOne();
  res.json({ message: "Cart item removed" });
};
