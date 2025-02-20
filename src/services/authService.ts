"use server";

import {
  getUserByEmailFromTable,
  getUserByIdFromTable,
} from "@/repositories/userRepository";
import { User } from "@/types/User";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateUser = (token: string): (JwtPayload & User) | null => {
  try {
    return jwt.verify(token, JWT_SECRET!!) as JwtPayload & User;
  } catch {
    return null;
  }
};

export const getUserProfile = async (
  token: string
): Promise<Omit<User, "password">> => {
  const decoded = authenticateUser(token);

  if (!decoded) {
    throw new Error("Invalid token");
  }

  const user = await getUserByIdFromTable(decoded.id);

  if (!user) {
    throw new Error("User not found");
  }

  const { password, ...userData } = user;

  return userData;
};

export const loginUser = async ({
  email,
  password,
}: Pick<User, "email" | "password">) => {
  try {
    const user = await getUserByEmailFromTable(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET!,
      { expiresIn: "12h" }
    );

    const { password: _, ...userData } = user;

    return { token, user: userData };
  } catch (error: any) {
    throw error;
  }
};
