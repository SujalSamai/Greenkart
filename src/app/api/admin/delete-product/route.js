import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);
    if (isAuthUser?.role === "admin") {
      //fetch the url and get the id of the post we want to delete
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id) {
        return NextResponse.json({
          success: false,
          message: "No such product exist!",
        });
      }

      const deletedProduct = await Product.findByIdAndDelete(id);

      if (deletedProduct) {
        return NextResponse.json({
          success: true,
          message: "Product deleted successfully!",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Couldn't delete the product, please try again later!",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized, so you can't delete the product.",
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
