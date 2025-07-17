import { createContext } from 'react';
import type { AuthState, User } from '../types/auth';

export interface AuthContextProps extends AuthState {
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined); 