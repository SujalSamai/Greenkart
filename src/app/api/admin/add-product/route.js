//route to add new product
import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Joi from "joi";
import Product from "@/models/product";
import AuthUser from "@/middleware/AuthUser";
const AddNewProductSchema = Joi.object({
  brand: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  manufactured: Joi.string().required(),
  color: Joi.string(),
  dimensions: Joi.string(),
  availability: Joi.string().required(),
  sizes: Joi.array().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  priceDrop: Joi.number().required(),
  imageUrl: Joi.string().required(),
  sizes: Joi.array(),
  skinType: Joi.string(),
});
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);
    if (isAuthUser?.role === "admin") {
      const extractData = await req.json();
      const {
        brand,
        name,
        description,
        price,
        imageUrl,
        category,
        manufactured,
        color,
        dimensions,
        availability,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        skinType,
      } = extractData;
      const { error } = AddNewProductSchema.validate({
        brand,
        name,
        description,
        price,
        imageUrl,
        category,
        manufactured,
        color,
        dimensions,
        availability,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        skinType,
      });
      if (error) {
        console.log(error);
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }
      const newlyCreatedProduct = await Product.create(extractData);
      if (newlyCreatedProduct) {
        return NextResponse.json({
          success: true,
          message: "Product added successfully.",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to add new product!. Try again.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized, so you can't add the product.",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
