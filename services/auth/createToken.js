import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const createToken = (payload) => {
  const secret = process.env.SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  return token;
};
