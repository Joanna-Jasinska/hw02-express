import express from "express";
const router = express.Router();
import contactController from "../controllers/contactController.js";
import services from "../services/authServices.js";

router.get("/", services.auth, contactController.getAll);

router.get("/:id", services.auth, contactController.getById);

router.post("/", services.auth, contactController.add);

router.delete("/:id", services.auth, contactController.remove);

router.put("/:id", services.auth, contactController.update);

router.put("/:id/favorite", services.auth, contactController.updateFavorite);

export default router;
