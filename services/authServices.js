import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const createToken = (payload) => {
  const secret = process.env.SECRET;
  const token = jwt.sign(payload, secret);

  console.log(token);
  return token;
};

export default {
  createToken,
};
