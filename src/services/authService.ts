import { getUserById } from "@/repositories/userRepository";
import { User } from "@/types/User";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateUser = (token: string): (JwtPayload & User) | null => {
  try {
    return jwt.verify(token, JWT_SECRET!!) as JwtPayload & User;
  } catch {
    return null;
  }
};

export const getUserProfile = async (token: string): Promise<User> => {
  const decoded = authenticateUser(token);

  if (!decoded) {
    throw new Error("Invalid token");
  }

  const user = await getUserById(decoded.id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
