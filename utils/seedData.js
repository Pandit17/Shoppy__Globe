// ================================
// Sample Data: Demo Products & Test User
// ================================

// Demo products for seeding and testing
export const sampleProducts = [
  {
    name: "Cotton T-Shirt",
    price: 399,
    description: "Soft 100% cotton casual wear",
    stock: 50,
    brand: "ShoppyGlobe",
    category: "Apparel",
  },
  {
    name: "Running Shoes",
    price: 2499,
    description: "Lightweight and breathable running shoes",
    stock: 20,
    brand: "FitFlex",
    category: "Footwear",
  },
  {
    name: "Wireless Headphones",
    price: 3499,
    description: "Noise-cancelling over-ear headphones",
    stock: 15,
    brand: "SoundMax",
    category: "Electronics",
  },
  {
    name: "Travel Backpack",
    price: 999,
    description: "Durable and water-resistant backpack",
    stock: 30,
    brand: "GearPro",
    category: "Accessories",
  },
];

// Test user for development environments
export const testUser = {
  name: "Demo User",
  email: "demo.user@shoppyglobe.com",
  // Strong password (still plain here; will be hashed when seeding)
  password: "Demo@1234",
};
