import * as userServices from "#services/user/index.js";
import * as mailingServices from "#services/mailing/index.js";
import { User } from "#models/user.js";

export const resendEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { error } = await userServices.validateUser({
      email,
      password: "temp password",
    });
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "User not found.",
      });
    }
    if (user.verified) {
      return res.status(400).json({
        status: 400,
        message: "Verification has already been passed",
      });
    }
    await user.generateVerificationToken();
    await user.save();
    await mailingServices.sendVerificationLink({
      email,
      verificationToken: user.verificationToken,
    });
    return res.json({
      status: 200,
      message: "Verification email sent",
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${err}`,
    });
  }
};
