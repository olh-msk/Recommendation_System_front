import { createContext, useContext, useEffect, useState } from 'react';
import type { StudentDto } from '../types/Student';

interface AuthContextType {
  user: StudentDto | null;
  token: string | null;
  login: (user: StudentDto, token?: string | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<StudentDto | null>(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? (JSON.parse(raw) as StudentDto) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem('authToken');
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem('user', JSON.stringify(user));
      else localStorage.removeItem('user');
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      if (token) localStorage.setItem('authToken', token);
      else localStorage.removeItem('authToken');
    } catch {}
  }, [token]);

  const login = (userData: StudentDto, t: string | null = null) => {
    setUser(userData);
    setToken(t);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthContext missing');
  return context;
};
