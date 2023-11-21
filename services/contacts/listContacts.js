import mongoose from "mongoose";
import { Contact } from "#models/contact.js";

export const listContacts = async ({ userId }) => {
  const ObjectId = new mongoose.Types.ObjectId(userId);
  return Contact.find({ owner: ObjectId });
};
