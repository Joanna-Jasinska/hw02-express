import { User } from "#models/user.js";
import * as userServices from "#services/user/index.js";

export const signUp = async (req, res, next) => {
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
    const userExists = await User.findOne({ email }).lean();
    if (userExists) {
      return res.status(409).json({
        status: 409,
        message: "Email in use",
      });
    }
    const newUser = await userServices.register({ email, password });
    return res.json({
      status: 201,
      data: {
        user: {
          subscription: newUser.subscription,
          email: newUser.email,
        },
      },
      token: newUser.token,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${err}`,
    });
  }
};