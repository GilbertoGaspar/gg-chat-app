import { Router } from "express";
import userController from "../controllers/userController.js";
import validate from "../middlewares/validate.js";
import auth from "../middlewares/auth.js";
import { registerSchema, loginSchema } from "../validation/userValidation.js";

const router = Router();

// Public routes
router.post("/register", validate(registerSchema), userController.createUser);
router.post("/login", validate(loginSchema), userController.loginUser);

// Protected routes
router.get("/me", auth, userController.getUserProfile);

export default router;
