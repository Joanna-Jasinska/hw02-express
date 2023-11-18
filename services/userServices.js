import { userSchema } from "../validators/user.js";
import { User } from "../models/user.js";

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

const getById = async (id) => {
  return User.findById(id);
};

export default {
  validateUser,
  register,
  getById,
  login,
  logout,
};
