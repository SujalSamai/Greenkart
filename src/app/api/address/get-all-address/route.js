import connectToDB from "@/database";
import { NextResponse } from "next/server";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";

export const dynamic = "force dynamic";

export async function GET(req) {
  try {
    await connectToDB();

    const { serachParams } = new URL(req.url);
    const id = serachParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "You are not logged In",
      });
    }

    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const getAllAddresses = await Address.find({ userId: id });

      if (getAllAddresses) {
        return NextResponse.json({
          success: true,
          data: getAllAddresses,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to get addresses ! Please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not autenticated",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
