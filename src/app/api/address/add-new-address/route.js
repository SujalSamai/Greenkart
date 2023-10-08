import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewAddress = Joi.object({
  fullName: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  postalCode: Joi.string().required(),
  userId: Joi.string().required(),
});

export const dynamic = "force dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();

      const { fullName, address, city, country, postalCode, userId } = data;
      const { error } = AddNewAddress.validate({
        fullName,
        address,
        city,
        country,
        postalCode,
        userId,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlyAddedAddress = await address.create(data);

      if (newlyAddedAddress) {
        return NextResponse.json({
          success: true,
          message: "Address added successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to add an address ! Please try again later",
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
