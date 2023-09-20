//route to add new product
import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Joi from "joi";
import Product from "@/models/product";
const AddNewProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  sizes: Joi.array().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  priceDrop: Joi.number().required(),
  imageUrl: Joi.string().required(),
});
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const user = "admin";
    if (user === "admin") {
      const extractData = await req.json();
      const {
        name,
        description,
        price,
        imageUrl,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
      } = extractData;
      const { error } = AddNewProductSchema.validate({
        name,
        description,
        price,
        imageUrl,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
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
        message: "You are not authorized.",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
