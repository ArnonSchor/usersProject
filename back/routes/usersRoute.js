import express from "express";
import {
  loginHandler,
  signUpHandler,
  authenticateToken,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginHandler);
router.get("/list", authenticateToken, (req, res) => {
  const username = req.user.user.username;
  res.json({ username: username });
});
router.post("/signUp", signUpHandler);

export default router;
