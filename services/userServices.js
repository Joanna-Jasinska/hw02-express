import { userSchema } from "../validators/user.js";
import { User } from "../models/user.js";
import authServices from "./authServices.js";

const validateUser = async ({ email, password }) => {
  const { error } = userSchema.validate({ email, password });
  console.log("userSchema.validate .error:", error);
  return { error };
  //  ? { error: error } : { error: null };
};

const register = async ({ email, password }) => {
  const token = await authServices.createToken({ email, password });
  const user = {
    email,
    password,
    token,
  };
  console.log("registering user: ", user);
  const newUser = new User(user);
  return newUser.save();
};

export default {
  validateUser,
  register,
};
