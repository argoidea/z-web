import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

const ADMIN_USER = 'zeneth';
const ADMIN_PASS = '63088099';
const STORAGE_KEY = 'zeneth_admin_auth';

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      setIsAuthenticated(stored === '1');
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      try {
        sessionStorage.setItem(STORAGE_KEY, '1');
        setIsAuthenticated(true);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
