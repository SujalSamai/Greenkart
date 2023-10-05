import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Cart item ID is required",
        });
      }
      const deleteCartItem = await Cart.findOneAndDelete(id);

      if (deleteCartItem) {
        return NextResponse.json({
          success: true,
          message: "Item deleted from cart successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to delete item from cart! Please try again.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authoried to delete items from cart.",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Try again later.",
    });
  }
}
