import User from "../models/User";
import type { UserData } from "../types/user";

const findById = async (id: string) => await User.findById(id);
const findByEmail = async (email: string) => await User.findOne({ email });
const createUser = async (userData: UserData) => {
  const user = new User(userData);
  return await user.save();
};

export default {
  findById,
  findByEmail,
  createUser,
};
