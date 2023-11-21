import mongoose from "mongoose";
import { Contact } from "#models/contact.js";

export const countContacts = async ({ userId }) => {
  const ObjectId = new mongoose.Types.ObjectId(userId);
  const contacts = await Contact.find({ owner: ObjectId }).lean();
  return contacts.length;
};
