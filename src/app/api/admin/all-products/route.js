import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

// creating api route to get all the products from the database
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const extractAllProducts = await Product.find({});
    if (extractAllProducts) {
      return NextResponse.json({
        success: true,
        data: extractAllProducts,
        message: "Fetched all products successfully.",
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: "No Products found!",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      mesaage: "Something went wrong! Please try again later.",
    });
  }
}
