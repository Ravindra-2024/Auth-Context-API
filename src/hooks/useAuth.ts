import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextValue';
import type { AuthContextProps } from '../context/AuthContextValue';

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};