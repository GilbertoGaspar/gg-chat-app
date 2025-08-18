import { z } from "zod";

export const LoginUserSchema = z.object({
  email: z.email().trim().min(1),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long"),
});

export const RegisterUserSchema = z
  .object({
    email: z.email().trim().min(1),
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
