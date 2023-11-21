import { User } from "#models/user.js";

export const getById = async (id) => {
  return User.findById(id);
};
