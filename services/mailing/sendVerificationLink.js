import * as mailingServices from "#services/mailing/index.js";
import dotenv from "dotenv";
dotenv.config();
export const sendVerificationLink = async ({ email, verificationToken }) => {
  const PORT = process.env.PORT || 3000;
  const subject = "Email verification from JJasinska hw02-express";
  const link = `http://localhost:${PORT}/api/users/verify/${verificationToken}`;
  const content = `Thank you for using JJasinska hw02-express!
  
  Here is your verification link:
  
  ${link}`;
  return await mailingServices.sendMail({
    email,
    subject,
    content,
  });
};
