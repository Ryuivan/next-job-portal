"use server";

import { insertUserToTable } from "@/repositories/userRepository";
import { User } from "@/types/User";
import bcrypt from "bcryptjs";

const validateUser = (user: Partial<User>) => {
  const { firstName, lastName, email, password, role } = user;

  if (!firstName || typeof firstName !== "string") {
    throw new Error("First name is required and must be a string.");
  }

  if (!lastName || typeof lastName !== "string") {
    throw new Error("Last name is required and must be a string.");
  }

  if (!email || typeof email !== "string") {
    throw new Error("Email is required and must be a string.");
  }

  if (!password || typeof password !== "string") {
    throw new Error("Password is required and must be a string.");
  }

  if (!role || typeof role !== "string") {
    throw new Error("Role is required and must be a string.");
  }

  return true;
};

export const createUser = async (user: Partial<User>): Promise<User> => {
  if (!validateUser(user)) {
    throw new Error("Invalid user data.");
  }

  const { password } = user;
  if (!password) {
    throw new Error("Password is required.");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  user.password = hashedPassword;

  const newUser = await insertUserToTable(user);

  return newUser;
};
