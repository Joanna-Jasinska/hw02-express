import express from "express";

const router = express.Router();
import imageController from "../controllers/imageController.js";

router.get("/:imagePath", imageController.showPublicAvatar);

export default router;
