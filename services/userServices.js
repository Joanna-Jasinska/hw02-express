import { userSchema } from "../validators/user.js";
import { User } from "../models/user.js";

const validateUser = ({ email, password }) => {
  const { error } = userSchema.validate({ email, password });
  const userExists = User.find({ email: email });
  return error
    ? { error: error, status: 400 }
    : userExists
    ? { error: "Email in use", status: 409 }
    : true;
};
const register = (name, email, password) => {
  const user = {
    name,
    email,
    password,
  };
  const newUser = new User(user);
  return newUser.save();
};

export default {
  validateUser,
  register,
};
