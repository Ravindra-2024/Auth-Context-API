import { renderHook } from '@testing-library/react';
import { useAuth } from './useAuth';
import { AuthProvider } from '../context/AuthContext';

// Silence expected error output
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/useAuth must be used within an AuthProvider/.test(args[0])) return;
    originalError(...args);
  };
});
afterAll(() => {
  console.error = originalError;
});

describe('useAuth', () => {
  it('throws if used outside AuthProvider', () => {
    expect(() => renderHook(() => useAuth())).toThrow(
      /useAuth must be used within an AuthProvider/
    );
  });

  it('returns context value inside AuthProvider', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    expect(result.current).toHaveProperty('isAuthenticated');
    expect(result.current).toHaveProperty('login');
    expect(result.current).toHaveProperty('logout');
  });
});