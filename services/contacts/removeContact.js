import mongoose from "mongoose";
import { Contact } from "#models/contact.js";

export const removeContact = async ({ contactId, userId }) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const contactObjectId = new mongoose.Types.ObjectId(contactId);
  const filter = { _id: contactObjectId, owner: userObjectId };
  const deleted = await Contact.deleteOne(filter);
  return deleted ? deleted.deletedCount > 0 : null;
};
