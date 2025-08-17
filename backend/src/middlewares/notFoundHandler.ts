import type { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    error: "Not Found",
    message: "The requested resource could not be found.",
  });
};
