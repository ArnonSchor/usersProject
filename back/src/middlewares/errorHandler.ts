import { NextFunction, Request, Response } from "express";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;

  err.status = err.status || "error";
  console.error(err.stack);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });

  if (err.code === "11000") {
    res.json({
      message:
        "there is an existing account with that email! please try logging in or use a different email address",
    });
  }
};
