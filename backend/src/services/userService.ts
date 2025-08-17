import userRepository from "../repositories/userRepository";
import bcrypt from "bcrypt";
import type { UserData } from "../types/user";

const registerUser = async ({ email, password }: UserData) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    const error = new Error("User already exists");
    (error as any).status = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await userRepository.createUser({
    email,
    password: hashedPassword,
  });
};

const loginUser = async ({ email, password }: UserData) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    const error = new Error("Invalid email or password");
    (error as any).status = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error = new Error("Invalid email or password");
    (error as any).status = 401;
    throw error;
  }

  return user;
};

const getUserById = async (id: string) => {
  const user = await userRepository.findById(id);
  if (!user) {
    const error = new Error("User not found");
    (error as any).status = 404;
    throw error;
  }
  return user;
};

export default {
  registerUser,
  loginUser,
  getUserById,
};
