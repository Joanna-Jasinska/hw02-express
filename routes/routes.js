import express from "express";
const router = express.Router();
import contactController from "../controllers/contactController.js";
import userController from "../controllers/userController.js";

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

router.get("/", contactController.getAll);

router.get("/:id", contactController.getById);

router.post("/", contactController.add);

router.delete("/:id", contactController.remove);

router.put("/:id", contactController.update);

router.put("/:id/favorite", contactController.updateFavorite);

router.post("/users/signup", userController.signUp);

export default router;
