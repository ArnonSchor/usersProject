import express from "express";
import {
  loginHandler,
  signUpHandler,
  listHandler,
  verificationHandler,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/login", loginHandler);
router.get("/list", authenticateToken, listHandler);
router.post("/signUp", signUpHandler);
router.post("/verify", verificationHandler);

export default router;
