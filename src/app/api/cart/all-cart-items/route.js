import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Please login to view the cart items.",
        });
      }
      const extractAllCartItems = await Cart.find({ userID: id })
        .populate("userID")
        .populate("productID");
      if(extractAllCartItems) {
        return NextResponse.json({
            success: true,
            data: extractAllCartItems,
            message: "Cart items fetched successfully!"
        })
      } else {
        return NextResponse.json({
            success:false,
            message: "Cart items not found!",
            status: 204
        })
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized to view the cart items.",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Try again later.",
    });
  }
}
