import mongoose from "mongoose";
import { contactSchema, favoriteSchema } from "../validators/contact.js";
import { Contact } from "../models/contact.js";

const validateContact = (data) => {
  const { error } = contactSchema.validate(data);
  //if (error) { console.log(error.message); }
  return !error;
};
const validateFavorite = (data) => {
  const { error } = favoriteSchema.validate(data);
  return !error;
};

const listContacts = () => {
  return Contact.find();
};

const getById = (contactId) => {
  return Contact.findById(contactId);
};

const removeContact = (contactId) => {
  const ObjectId = new mongoose.Types.ObjectId(contactId);
  const filter = { _id: ObjectId };
  return Contact.deleteOne(filter);
};

const addContact = (name, email, phone, favorite) => {
  const contact = {
    name,
    email,
    phone,
    favorite,
  };
  const newContact = new Contact(contact);
  return newContact.save();
};

const updateContact = (id, newData) => {
  const ObjectId = new mongoose.Types.ObjectId(id);
  const filter = { _id: ObjectId };
  return Contact.findOneAndUpdate(filter, newData, { new: true });
};

// update Favorite
const updateStatusContact = (contactId, body) => {
  const ObjectId = new mongoose.Types.ObjectId(contactId);
  const filter = { _id: ObjectId };
  return Contact.findOneAndUpdate(filter, body, { new: true });
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
};
