import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);
    if (isAuthUser?.role === "admin") {
      const extractData = await req.json();
      //extract the post data
      const {
        _id,
        brand,
        name,
        price,
        description,
        category,
        manufactured,
        color,
        dimensions,
        skinType,
        availability,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      } = extractData;

      //update the product data
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: _id },
        {
          brand,
          name,
          price,
          description,
          category,
          manufactured,
          color,
          dimensions,
          skinType,
          availability,
          sizes,
          deliveryInfo,
          onSale,
          priceDrop,
          imageUrl,
        },
        { new: true }
      );

      if (updatedProduct) {
        return NextResponse.json({
          success: true,
          message: "Product update successfully!",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Couldn't update the product, please try again later!",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized, so you can't update the product.",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try again later!",
    });
  }
}
