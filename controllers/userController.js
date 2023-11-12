import { User } from "../models/user.js";
import userServices from "../services/userServices.js";

const signUp = async (req, res, next) => {
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
    console.log("userExists: -defining");
    const userExists = await User.findOne({ email: email });
    console.log("userExists:", userExists);
    if (userExists) {
      return res.status(409).json({
        status: 409,
        message: "Email in use",
      });
    }
    console.log("register validation no errors");
    const newUser = await userServices.register({ email, password });
    return res.json({
      status: 201,
      data: {
        user: {
          subscription: newUser.subscription,
          email: newUser.email,
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

const logIn = async (req, res, next) => {
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
    console.log("user: -defining");
    const user = await User.findOne({ email: email });
    console.log("user:", user);
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Email or password is wrong",
      });
    }
    console.log("logIn validation no errors");
    // const newUser = await userServices.register({ email, password });
    return res.json({
      status: 200,
      data: {
        token: "exampletoken",
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

export default {
  signUp,
  logIn,
};
