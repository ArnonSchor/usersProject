import express from "express";
import {
  loginHandler,
  signUpHandler,
  authenticateToken,
  listHandler,
  verificationHandler,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginHandler);
router.get("/list", authenticateToken, listHandler);
router.post("/signUp", signUpHandler);
router.post("/verify", verificationHandler);

export default router;
