// ================================
// Product Schema: Stores product catalog information
// ================================

import mongoose from "mongoose";

// Schema definition
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    brand: { type: String, default: "" },
    category: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
