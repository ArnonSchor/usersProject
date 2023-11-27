import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { AppError } from "../utils/appError";

const generateToken = () => {
  const { jwtSecret } = config.auth;
  if (!jwtSecret) {
    return new AppError("no jwt secret", 404);
  }
  const token = jwt.sign({ user: "user" }, jwtSecret, {
    expiresIn: "90d",
  });
  return token;
};

export default generateToken;
