import jwt from "jsonwebtoken";
export const dynamic = "force-dynamic";

const AuthUser = async (req) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) return false;
  try {
    const extractAuthUserInfo = jwt.verify(token, process.env.JWT_KEY);
    if (extractAuthUserInfo) return extractAuthUserInfo;
  } catch (error) {
    return false;
  }
};

export default AuthUser;
