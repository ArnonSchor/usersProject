import express from 'express'
import { loginHandler, signUpHandler } from "../Controllers/userController.js";




const router = express.Router();

router.get("/login", loginHandler);
router.post("/signUp", signUpHandler);



export default router