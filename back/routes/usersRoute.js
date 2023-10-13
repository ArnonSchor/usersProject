import express from "express";
import { loginHandler, signUpHandler } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginHandler);
router.post("/signUp", signUpHandler);

export default router;
