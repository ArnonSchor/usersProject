import express from "express";
import {
  loginHandler,
  signUpHandler,
  TheSiteHandler,
  verificationHandler,
} from "../controllers/userController";
import { authenticateToken } from "../middlewares/userAuth";

const router = express.Router();

router.post("/login", loginHandler);
router.get("/the-site", authenticateToken, TheSiteHandler);
router.post("/signUp", signUpHandler);
router.post("/verify", verificationHandler);

export default router;
