// const Joi = require("joi");
import Joi from "joi";
// const { default: mongoose } = require("mongoose");
import mongoose from "mongoose";

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(1),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "pl"] },
  }),
  favorite: Joi.bool(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = mongoose.model("contact", {
  name: { type: String, required: [true, "Set name for contact"] },
  phone: { type: String },
  email: { type: String }, //, unique: true
  favorite: { type: Boolean, default: false },
});

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
  // const found = data.filter((contact) => {
  //   return contact.id === contactId;
  // });
  // return found.length > 0 ? found : false;
};

const removeContact = (contactId) => {
  const ObjectId = new mongoose.Types.ObjectId(contactId);
  const filter = { _id: ObjectId };
  return Contact.deleteOne(filter);
  // const wantedContact = data.filter((contact) => {
  //   return contact.id === contactId;
  // });
  // if (!Array.isArray(wantedContact) || wantedContact.length < 1) return false;

  // fs.writeFileSync(
  //   contactsPath,
  //   JSON.stringify(
  //     data.filter((contact) => {
  //       return contact.id !== contactId;
  //     })
  //   )
  // );
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
  // fs.writeFileSync(contactsPath, JSON.stringify(data));
};

const updateContact = (id, newData) => {
  const ObjectId = new mongoose.Types.ObjectId(id);
  const filter = { _id: ObjectId };
  return Contact.findOneAndUpdate(filter, newData, { new: true });

  //   const wantedContact = data.filter((contact) => {
  //     return contact.id === contactId;
  //   });
  //   if (!Array.isArray(wantedContact) || wantedContact.length < 1) return false;
  //   const updatedContact = {
  //     id: id,
  //     name: name,
  //     email: email,
  //     phone: phone,
  //   };
  //   const updatedData = data.map((contact) => {
  //     if (contact.id === contactId) return updatedContact;
  //     return contact;
  //   });
  //   fs.writeFileSync(contactsPath, JSON.stringify(updatedData));
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
