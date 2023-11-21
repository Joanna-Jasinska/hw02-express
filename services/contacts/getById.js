import mongoose from "mongoose";
import { Contact } from "#models/contact.js";

export const getById = async ({ contactId, userId }) => {
  const ObjectId = new mongoose.Types.ObjectId(userId);
  return Contact.find({ _id: contactId, owner: ObjectId });
};
