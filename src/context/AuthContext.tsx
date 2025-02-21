"use client";

import { getUserProfile, loginUser } from "@/services/authService";
import { User } from "@/types/User";
import { Dispatch, ReactNode, useEffect, useReducer } from "react";
import { createContext } from "react";

type AuthState = {
  isAuthenticated: boolean;
  user: Omit<User, "password"> | null;
  loading: boolean;
  error: string | null;
};

type AuthAction =
  | { type: "LOGIN"; payload: Omit<User, "password"> }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      };

    case "LOGOUT":
      return {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export type AuthContextType = {
  state: AuthState;
  login: (loginCredentials: Pick<User, "email" | "password">) => Promise<void>;
  logout: () => void;
  dispatch: Dispatch<AuthAction>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const login = async (loginCredentials: Pick<User, "email" | "password">) => {
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      const response = await loginUser(loginCredentials);

      if (!response) {
        throw new Error("Login failed: No response from server");
      }

      const { token, user } = response;

      sessionStorage.setItem("token", token);
      localStorage.setItem("auth", JSON.stringify(user));

      dispatch({ type: "LOGIN", payload: user });
    } catch (err: any) {
      throw err;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("auth");
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedUser = localStorage.getItem("auth");

    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: "LOGIN", payload: user });
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
