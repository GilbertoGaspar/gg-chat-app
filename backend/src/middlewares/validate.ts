import type { Request, Response, NextFunction } from "express";

const validate =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: "Validation Error",
        message: error.details[0].message,
      });
    }
    next();
  };

export default validate;
