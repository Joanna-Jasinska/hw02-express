import express from "express";
import * as userController from "#controllers/user/index.js";
import * as services from "#services/auth/index.js";
import * as fileServices from "#services/file/index.js";
const router = express.Router();

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
