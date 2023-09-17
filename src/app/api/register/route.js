import connectToDB from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

//we will validate our schema using Joi
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

//whenever user registers, that'll be a POST request to the db
export async function POST(req) {
  //check if connection to db is done
  await connectToDB();
  //get the values from returned json object
  const { name, email, password, role } = await req.json();

  //if validation found any error
  const { error } = schema.validate({ name, email, password, role });
  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    //check if the user exists already or not through email
    const isUserAlreadyExists = await User.findOne({ email });

    if (isUserAlreadyExists) {
      return NextResponse.json({
        success: false,
        message: "User already exists. Please try with different email.",
      });
    } else {
      //if this is a new user, then we will hash their password using bcrypt
      const hashPassword = await hash(password, 12);
      //create the new user
      const newlyCreatedUser = await User.create({
        name,
        email,
        password: hashPassword,
        role,
      });

      if (newlyCreatedUser) {
        return NextResponse.json({
          success: true,
          message: "Account created Successfully, Hurray!!",
        });
      }
    }
  } catch (err) {
    console.log("Error in registering the user..");
    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try again!" + err.message,
    });
  }
}
