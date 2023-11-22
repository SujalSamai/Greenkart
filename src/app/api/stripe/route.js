import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";

const stripe = require("stripe")(`${process.env.STRIPE_PRIVATE_KEY}`);

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const isAuthUser = await AuthUser(req);
    //creating a stripe session as soon as checkout button is clicked

    if (isAuthUser) {
      const res = await req.json();
      // console.log(res.length);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 40 * 100 * res.length,
                currency: "inr",
              },
              display_name: "Shipping Charges",
            },
          },
        ],
        line_items: res,
        mode: "payment",
        success_url:
          process.env.NEXT_PUBLIC_SERVER_URL + "/checkout" + "?status=success",
        cancel_url:
          process.env.NEXT_PUBLIC_SERVER_URL + "/checkout" + "?status=cancel",
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
