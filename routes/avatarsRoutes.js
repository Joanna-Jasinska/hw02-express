import express from "express";
import * as imageController from "#controllers/file/index.js";

const router = express.Router();

router.get("/:imagePath", imageController.showPublicAvatar);

export default router;
