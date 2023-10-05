import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Joi from "joi";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const AddToCart = Joi.object({
  userID: Joi.string().required(),
  productID: Joi.string().required(),
});
export async function POST(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const data = await req.json();
      const { productID, userID } = data;
      const { error } = AddToCart.validate({ userID, productID });
      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }
      const isCurrentCartItemAlreadyExists = await Cart.find({
        productID: productID,
        userID: userID,
      });
      if (isCurrentCartItemAlreadyExists) {
        return NextResponse.json({
          success: false,
          message: "Product is already added to the cart.",
        });
      }
      const saveProductToCart = await Cart.create(data);
      if (saveProductToCart) {
        return NextResponse.json({
          success: true,
          message: "The product is added to cart!",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to add the product to cart. Please Try again!",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Please login first to add product to cart.",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Try again later.",
    });
  }
}
