import type { Request, Response, NextFunction } from "express";
import type { CustomError } from "../types/error";

export default (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
    message: "An unexpected error occurred. Please try again later.",
  });
};
