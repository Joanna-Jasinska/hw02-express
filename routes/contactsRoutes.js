import express from "express";
const router = express.Router();
import contactController from "../controllers/contactController.js";

router.get("/", contactController.getAll);

router.get("/:id", contactController.getById);

router.post("/", contactController.add);

router.delete("/:id", contactController.remove);

router.put("/:id", contactController.update);

router.put("/:id/favorite", contactController.updateFavorite);

export default router;
