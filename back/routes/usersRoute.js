import express from "express";
import {
  loginHandler,
  signUpHandler,
  TheSiteHandler,
  verificationHandler,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/login", loginHandler);
router.get("/the-site", authenticateToken, TheSiteHandler);
router.post("/signUp", signUpHandler);
router.post("/verify", verificationHandler);

export default router;
