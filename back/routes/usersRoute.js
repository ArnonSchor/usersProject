import express from "express";
import {
  loginHandler,
  signUpHandler,
  authenticateToken,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginHandler);
router.get("/login", authenticateToken, (req, res) => {
  const username = req.user.user.username;
  res.json({ message: "username" });
});
router.post("/signUp", signUpHandler);

export default router;
