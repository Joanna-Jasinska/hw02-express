import { contactSchema } from "#validators/contact.js";

export const validateContact = (data) => {
  const { error } = contactSchema.validate(data);
  return !error;
};
