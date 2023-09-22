import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();
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
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try again later!",
    });
  }
}
