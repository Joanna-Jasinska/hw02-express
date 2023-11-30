import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

dotenv.config();

export const createVerificationToken = () => {
  const verificationToken = `verification${randomUUID()}`;
  const secret = process.env.SECRET;
  const token = jwt.sign({ verificationToken }, secret, { expiresIn: "10min" });

  return token;
};
