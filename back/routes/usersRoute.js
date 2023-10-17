import express from "express";
import {
  loginHandler,
  signUpHandler,
  authenticateToken,
  listHandler,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginHandler);
router.get("/list", authenticateToken, listHandler);

router.post("/signUp", signUpHandler);

export default router;
