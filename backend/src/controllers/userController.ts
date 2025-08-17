import userService from "../services/userService";
import jwt from "jsonwebtoken";

import type { Request, Response, NextFunction } from "express";
import type { StringValue } from "ms";
const EXPIRE = (process.env.JWT_EXPIRE as StringValue) || "30d";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.registerUser(req.body);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: EXPIRE,
    });

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser({ email, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: EXPIRE,
    });

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createUser,
  loginUser,
  getUserProfile,
};
