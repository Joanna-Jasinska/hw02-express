import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";

router.post("/signup", userController.signUp);
router.post("/login", userController.logIn);

export default router;
