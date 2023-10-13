import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";

const stripe = require("stripe")(
  "sk_test_51O0cwlSEn9YaE0PUUH9QUshUP2JZPCN482kRpDuk8rUw2DUfbmUNOpDJ9wRhu3CTtTlyB3x2XQv5lJcAqOrpcZSn00q5qEgySo"
);

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const isAuthUser = await AuthUser(req);
    //creating a stripe session as soon as checkout button is clicked

    if (isAuthUser) {
      const res = await req.json();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: res,
        mode: "payment",
        success_url: "http://localhost:3000/checkout" + "?status=success",
        cancel_url: "http://localhost:3000/checkout" + "?status=cancel",
      });

      return NextResponse.json({
        success: true,
        id: session.id,
      });
    } else {
      return NextResponse.json({
        success: false,
        id: "You are not Authenticated! Try Loggin in first.",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
