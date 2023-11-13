// creating schema for add new product
import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    brand: String,
    name: String,
    price: Number,
    description: String,
    category: String,
    manufactured: String,
    color: String,
    dimensions: String,
    availability: String,
    deliveryInfo: String,
    onSale: String,
    priceDrop: Number,
    imageUrl: String,
    sizes: Array,
    skinType: String,
  },
  { timestamps: true }
);
const Product =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Product;
