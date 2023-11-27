import catchAsync from "../utils/catchAsync";
import { config } from "../config/config";
import jwt from "jsonwebtoken";
import { UNAUTHORIZED } from "../constants/statusCodes";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";

interface AuthenticatedRequest extends Request {
  user?: any;
}
export const authenticateToken = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (token == null) {
      return res.status(UNAUTHORIZED).json({ error: "Invalid token" });
    }
    const { jwtSecret } = config.auth;
    if (!jwtSecret) {
      return new AppError("no jwt secret", 404);
    }
    const user = jwt.verify(token, jwtSecret);
    req.user = user;

    next();
  }
);
