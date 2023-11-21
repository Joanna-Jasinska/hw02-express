import { Contact } from "#models/contact.js";
import * as userServices from "#services/user/index.js";

export const addContact = async ({ name, email, phone, favorite, userId }) => {
  const contact = {
    name,
    email,
    phone,
    favorite,
    owner: await userServices.getById(userId),
  };
  const newContact = await Contact.create(contact);
  return newContact;
};
