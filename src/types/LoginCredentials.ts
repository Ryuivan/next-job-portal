import { User } from "./User";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: Omit<User, "password">;
  message?: string;
};
