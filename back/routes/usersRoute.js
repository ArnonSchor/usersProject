import express from "express";
import {
  loginHandler,
  signUpHandler,
  authenticateToken,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginHandler);
router.get("/list", authenticateToken, (req, res) =>
  res.json({
    message: "asdf",
  })
);

router.post("/signUp", signUpHandler);

export default router;
