import mongoose from "mongoose";
import { Contact } from "#models/contact.js";

// update Favorite
export const updateStatusContact = ({ contactId, userId, favorite }) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const contactObjectId = new mongoose.Types.ObjectId(contactId);
  const filter = { _id: contactObjectId, owner: userObjectId };
  return Contact.findOneAndUpdate(filter, { favorite }, { new: true });
};
