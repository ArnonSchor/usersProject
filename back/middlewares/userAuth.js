import catchAsync from "../utils/catchAsync.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
import { UNAUTHORIZED } from "../constants/statusCodes.js";

export const authenticateToken = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;
  if (token == null) {
    return res.status(UNAUTHORIZED).json({ error: "Invalid token" });
  }
  const user = jwt.verify(token, config.auth.jwtSecret);
  req.user = user;

  next();
});
