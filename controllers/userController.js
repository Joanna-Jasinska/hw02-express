import { User } from "../models/user.js";
import contactServices from "../services/contactServices.js";
import userServices from "../services/userServices.js";
import fileServices from "../services/fileServices.js";
// import authServices from "../services/authServices.js";

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
    const user = await User.findOne({ email });
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({
        status: 401,
        message: "Email or password is wrong",
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

const current = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await userServices.getById(id);
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Not authorized",
        data: "Unauthorized",
      });
    }
    const contactsCount = await contactServices.countContacts({ userId: id });
    return res.status(200).json({
      status: 200,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
          avatarURL: user.avatarURL,
          contacts: contactsCount,
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

const avatarUpdate = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await userServices.getById(id);
    if (!user || !req.file) {
      return res.status(401).json({
        status: 401,
        message: "Not authorized",
        data: "Unauthorized",
      });
    }

    const { error, url } = await fileServices.saveFile({ req });
    if (error || !url) {
      return res.status(401).json({
        status: 401,
        message: "Not authorized",
        data: "Unauthorized",
      });
    }
    await fileServices.deleteFile({ avatarURL: user.avatarURL });//deleting old avatar from server
    await userServices.setAvatar({ user, avatarURL: url });

    return res.status(200).json({
      status: 200,
      data: {
        avatarURL: url,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${err}`,
    });
  }
};

const logOut = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await userServices.getById(id);
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Not authorized",
        data: "Unauthorized",
      });
    }
    await userServices.logout({ user });
    return res.status(204).json({
      status: 204,
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
  logOut,
  current,
  avatarUpdate,
};
