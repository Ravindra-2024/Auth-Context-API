import React, { useReducer } from "react";
import { AuthContext } from "./AuthContextValue";
import type { AuthState, AuthAction, User } from "../types/auth";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user: User) => dispatch({ type: "LOGIN", payload: user });
  const logout = () => dispatch({ type: "LOGOUT" });
  const setLoading = (loading: boolean) =>
    dispatch({ type: "SET_LOADING", payload: loading });

  return (
    <AuthContext.Provider value={{ ...state, login, logout, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
