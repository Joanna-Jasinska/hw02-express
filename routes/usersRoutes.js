import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import services from "../services/authServices.js";

router.post("/signup", userController.signUp);
router.post("/login", userController.logIn);
router.get("/logout", services.auth, userController.logOut);
router.get("/current", services.auth, userController.current);

export default router;
