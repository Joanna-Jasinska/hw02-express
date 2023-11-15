import mongoose from "mongoose";
import { contactSchema, favoriteSchema } from "../validators/contact.js";
import { Contact } from "../models/contact.js";
import userServices from "./userServices.js";

const validateContact = (data) => {
  const { error } = contactSchema.validate(data);
  return !error;
};
const validateFavorite = (data) => {
  const { error } = favoriteSchema.validate(data);
  return !error;
};

const listContacts = async ({ userId }) => {
  const ObjectId = new mongoose.Types.ObjectId(userId);
  return Contact.find({ owner: ObjectId });
};
const countContacts = async ({ userId }) => {
  const ObjectId = new mongoose.Types.ObjectId(userId);
  const contacts = await Contact.find({ owner: ObjectId }).lean();
  return contacts.length;
};

const getById = async ({ contactId, userId }) => {
  const ObjectId = new mongoose.Types.ObjectId(userId);
  return Contact.find({ _id: contactId, owner: ObjectId });
};

const removeContact = async ({ contactId, userId }) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const contactObjectId = new mongoose.Types.ObjectId(contactId);
  const filter = { _id: contactObjectId, owner: userObjectId };
  const deleted = await Contact.deleteOne(filter);
  return deleted ? deleted.deletedCount > 0 : null;
};

const addContact = async ({ name, email, phone, favorite, userId }) => {
  const contact = {
    name,
    email,
    phone,
    favorite,
    owner: await userServices.getById(userId),
  };
  const newContact = await Contact.create(contact);
  return newContact;
  // const newContact = new Contact(contact);
  // return newContact.save();
};

const updateContact = ({ contactId, userId, newData }) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const contactObjectId = new mongoose.Types.ObjectId(contactId);
  const filter = { _id: contactObjectId, owner: userObjectId };
  return Contact.findOneAndUpdate(filter, newData, { new: true });
};

// update Favorite
const updateStatusContact = ({ contactId, userId, favorite }) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const contactObjectId = new mongoose.Types.ObjectId(contactId);
  const filter = { _id: contactObjectId, owner: userObjectId };
  return Contact.findOneAndUpdate(filter, { favorite }, { new: true });
};

export default {
  validateContact,
  validateFavorite,
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact, //update Favorite,
  countContacts,
};
