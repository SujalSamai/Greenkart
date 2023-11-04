// creating schema for add new product
import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    deliveryInfo: String,
    onSale: String,
    priceDrop: Number,
    imageUrl: String,
  },
  { timestamps: true }
);
const Product =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Product;
