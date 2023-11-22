import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const from = process.env.GMAIL;
const password = process.env.GMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${from}`,
    pass: `${password}`,
  },
});

export const sendMail = async ({ email, subject, content }) => {
  const mailOptions = {
    from: from,
    to: email,
    subject: subject,
    text: content,
  };

  return await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log("Email sent: " + info.response);
      return info.response;
    }
  });
};
