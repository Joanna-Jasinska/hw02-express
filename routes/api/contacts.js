const express = require("express");

const router = express.Router();
const fs = require("fs");
const path = require("node:path");
const Joi = require("joi");

const contactsPath = path.join(__dirname, "db/contacts.json");
const data = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  phone: Joi.string().min(1).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "pl"] },
  }),
});

const validateContact = (data) => {
  const { error } = contactSchema.validate(data);
  return !error;
};

function randomId() {
  var chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz-".split("");

  var str = "";
  for (var i = 0; i < 21; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

function listContacts() {
  return data;
}

function getById(contactId) {
  const found = data.filter((contact) => {
    return contact.id === contactId;
  });
  return found.length > 0 ? found : false;
}

function removeContact(contactId) {
  const wantedContact = data.filter((contact) => {
    return contact.id === contactId;
  });
  if (!Array.isArray(wantedContact) || wantedContact.length < 1) return false;

  fs.writeFileSync(
    contactsPath,
    JSON.stringify(
      data.filter((contact) => {
        return contact.id !== contactId;
      })
    )
  );
  return true;
}

function addContact(name = "unknown", email = "unknown", phone = "unknown") {
  const contactId = randomId();
  const contact = {
    id: contactId,
    name: name,
    email: email,
    phone: phone,
  };
  data.push(contact);
  fs.writeFileSync(contactsPath, JSON.stringify(data));
  return contactId;
}

function updateContact(id, { name, email, phone }) {
  const wantedContact = data.filter((contact) => {
    return contact.id === contactId;
  });
  if (!Array.isArray(wantedContact) || wantedContact.length < 1) return false;
  const updatedContact = {
    id: id,
    name: name,
    email: email,
    phone: phone,
  };
  const updatedData = data.map((contact) => {
    if (contact.id === contactId) return updatedContact;
    return contact;
  });
  fs.writeFileSync(contactsPath, JSON.stringify(updatedData));
  return true;
}

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: 200,
      data: [...contacts],
    });
  } catch (err) {
    next({ ...err, comment: `Contacts not found.` });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getById(id);

    if (contact) {
      res.json({
        status: 200,
        data: [...contact],
      });
    } else {
      res.status(404).json({
        status: 404,
        message: `[${id}] Not found`,
      });
    }
  } catch (err) {
    next({ ...err, comment: `[${id}] Not found` });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.query;

    if (validateContact(req.query)) {
      const id = addContact(name, email, phone);
      res.json({
        status: 200,
        data: {
          id,
        },
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "Missing required field",
      });
    }
  } catch (err) {
    next({ ...err, comment: `Missing required field` });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await removeContact(id);

    if (deleted) {
      res.json({
        status: 200,
        message: "Contact deleted",
      });
    } else {
      res.status(404).json({
        status: 404,
        message: `[${id}] Not found. Could not delete`,
      });
    }
  } catch (err) {
    next({ ...err, comment: `Nothing to delete` });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { name, email, phone } = req.query;
    const { id } = req.params;

    if (validateContact(req.query)) {
      const updated = updateContact(id, { name, email, phone });
      if (updated) {
        res.json({
          status: 200,
          data: {
            id,
            name,
            email,
            phone,
          },
        });
      } else {
        res.status(404).json({
          status: 404,
          message: `[${id}] Not found. Could not update`,
        });
      }
    } else {
      res.status(400).json({
        status: 400,
        message: "missing required fields",
      });
    }
  } catch (err) {
    next({ ...err, comment: `Nothing to update` });
  }
});

module.exports = router;
