const express = require("express");
const router = express.Router();
const controller = require("./controller");

// const fs = require("fs");
// const Joi = require("joi");

// const path = require("node:path");
// const contactsPath = path.join(__dirname, "db/contacts.json");
// const data = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
// const data = [];

// function randomId() {
//   let chars =
//     "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz-".split("");
//   let str = "";
//   for (let i = 0; i < 21; i++) {
//     str += chars[Math.floor(Math.random() * chars.length)];
//   }
//   return str;
// }

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.add);

router.delete("/:id", controller.remove);

router.put("/:id", controller.update);

router.put("/:id/favorite", controller.updateFavorite);

module.exports = router;
