import { userSchema } from "../validators/user.js";
import { User } from "../models/user.js";
import imageServices from "./imageServices.js";

const validateUser = async ({ email, password }) => {
  const { error } = userSchema.validate({ email, password });
  return { error };
};

const register = async ({ email, password }) => {
  const user = {
    email,
  };
  const newUser = new User(user);
  newUser.setPassword(password);
  newUser.generateToken();
  newUser.setAvatar({ avatarURL: imageServices.generateAvatar(email) });
  return newUser.save();
};

const login = async ({ user }) => {
  await user.generateToken();
  await user.save();
  return;
};
const logout = async ({ user }) => {
  await user.deleteToken();
  await user.save();
  return;
};

const setAvatar = async ({ user, avatarURL }) => {
  await user.setAvatar({ avatarURL });
  await user.save();
  return;
};

const getById = async (id) => {
  return User.findById(id);
};

export default {
  validateUser,
  register,
  getById,
  login,
  logout,
  setAvatar,
};
