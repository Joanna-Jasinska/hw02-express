import { User } from "#models/user.js";
import * as imageServices from "#services/file/index.js";

export const register = async ({ email, password }) => {
  const user = {
    email,
  };
  const newUser = new User(user);
  newUser.setPassword(password);
  newUser.generateToken();
  newUser.setAvatar({ avatarURL: imageServices.generateAvatarUrl(email) });
  return newUser.save();
};
