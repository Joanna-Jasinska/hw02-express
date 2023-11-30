import { User } from "#models/user.js";
import * as userServices from "#services/user/index.js";

export const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = await userServices.validateUser({
      email,
      password,
    });
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
    const user = await User.findOne({ email });
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({
        status: 401,
        message: "Email or password is wrong",
      });
    }
    if (!user.verified) {
      return res.status(401).json({
        status: 401,
        message: "User not verified. Check your email for verification link",
      });
    }

    await userServices.login({ user });
    return res.status(200).json({
      status: 200,
      data: {
        token: user.token,
        user: {
          email,
          subscription: user.subscription,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${err}`,
    });
  }
};
