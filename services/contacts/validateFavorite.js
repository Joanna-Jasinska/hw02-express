import { favoriteSchema } from "#validators/contact.js";

export const validateFavorite = (data) => {
  const { error } = favoriteSchema.validate(data);
  return !error;
};
