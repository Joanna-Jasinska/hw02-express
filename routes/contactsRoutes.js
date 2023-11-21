import express from "express";
import * as contactController from "#controllers/contacts/index.js";
import * as services from "#services/auth/index.js";
const router = express.Router();

router.get("/", services.auth, contactController.getAll);

router.get("/:id", services.auth, contactController.getById);

router.post("/", services.auth, contactController.add);

router.delete("/:id", services.auth, contactController.remove);

router.put("/:id", services.auth, contactController.update);

router.put("/:id/favorite", services.auth, contactController.updateFavorite);

export default router;
