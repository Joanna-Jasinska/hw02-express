import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import services from "../services/authServices.js";
import fileServices from "../services/fileServices.js";

router.post("/signup", userController.signUp);
router.post("/login", userController.logIn);
router.get("/logout", services.auth, userController.logOut);
router.get("/current", services.auth, userController.current);
router.patch(
  "/avatars",
  services.auth,
  fileServices.uploadMiddleware,
  userController.avatarUpdate
);

export default router;
