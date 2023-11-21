import { userSchema } from "#validators/user.js";

export const validateUser = async ({ email, password }) => {
  const { error } = userSchema.validate({ email, password });
  return { error };
};
