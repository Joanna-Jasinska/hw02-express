import mongoose from "mongoose";
import { Contact } from "#models/contact.js";

export const updateContact = ({ contactId, userId, newData }) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const contactObjectId = new mongoose.Types.ObjectId(contactId);
  const filter = { _id: contactObjectId, owner: userObjectId };
  return Contact.findOneAndUpdate(filter, newData, { new: true });
};
