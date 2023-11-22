import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const generateToken = () => {
  const token = jwt.sign({ user: "user" }, config.auth.jwtSecret, {
    expiresIn: "90d",
  });
  return token;
};

export default generateToken;
