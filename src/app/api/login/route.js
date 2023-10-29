import connectToDB from "@/database";
import User from "@/models/user";
import { compare } from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

//we will validate our schema using Joi
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  //check if connection to db is done
  await connectToDB();
  //get the values from returned json object
  const { email, password } = await req.json();

  //if validation found any error
  const { error } = schema.validate({ email, password });
  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  //checking if the user exists through their email
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return NextResponse.json({
        success: false,
        message: "Account Not Found!",
      });
    }

    //authenticating the password
    const checkPassword = await compare(password, checkUser.password);
    if (!checkPassword) {
      return NextResponse.json({
        success: false,
        message: "Password is incorrect..",
      });
    }

    //if email and password is correct generate the token
    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser?.email,
        role: checkUser?.role,
      },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );

    const finalData = {
      token,
      user: {
        email: checkUser.email,
        name: checkUser.name,
        _id: checkUser._id,
        role: checkUser.role,
      },
    };

    return NextResponse.json({
      success: true,
      message: "Login Successful!",
      finalData,
    });
  } catch (err) {
    console.log("Error while logging in: " + err.message);
    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try again! " + err.message,
    });
  }
}
