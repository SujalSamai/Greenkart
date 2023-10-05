import mongoose from "mongoose";

//defining the structure/schema of our user for storing in db
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
