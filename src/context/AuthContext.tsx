"use client";

import { Dispatch, ReactNode, useContext, useEffect, useReducer } from "react";
import { createContext } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "jobseeker" | "employer";
  createdAt: Date;
  updatedAt: Date;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
};

type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

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
  dispatch: Dispatch<AuthAction>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");

    if (savedAuth) {
      const parsedAuth = JSON.parse(savedAuth);

      dispatch({
        type: "LOGIN",
        payload: {
          ...parsedAuth.user,
          createdAt: new Date(parsedAuth.user.createdAt),
          updatedAt: new Date(parsedAuth.user.updatedAt),
        },
      });
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
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
