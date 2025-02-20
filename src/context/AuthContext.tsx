"use client";

import axiosInstance from "@/lib/axios/axiosInstance";
import { LoginCredentials, LoginResponse } from "@/types/LoginCredentials";
import { User } from "@/types/User";
import { AxiosError, AxiosResponse } from "axios";
import { Dispatch, ReactNode, useContext, useEffect, useReducer } from "react";
import { createContext } from "react";

type AuthState = {
  isAuthenticated: boolean;
  user: Omit<User, "password"> | null;
};

type AuthAction =
  | { type: "LOGIN"; payload: Omit<User, "password"> }
  | { type: "LOGOUT" };

const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

type AuthContextType = {
  state: AuthState;
  login: (loginCredentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  dispatch: Dispatch<AuthAction>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const login = async (loginCredentials: LoginCredentials) => {
    try {
      const response: AxiosResponse<LoginResponse> = await axiosInstance.post(
        "/login",
        loginCredentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, user } = response.data;

      sessionStorage.setItem("token", token);
      dispatch({
        type: "LOGIN",
        payload: user,
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(err.response?.data?.message ?? "Login failed.");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      axiosInstance
        .get<{ user: Omit<User, "password"> }>("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          dispatch({
            type: "LOGIN",
            payload: response.data.user,
          });
        })
        .catch(() => logout());
    }
  }, []);

  useEffect(() => {
    if (state.isAuthenticated) {
      localStorage.setItem("auth", JSON.stringify(state));
    } else {
      localStorage.removeItem("auth");
    }
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
