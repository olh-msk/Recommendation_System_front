import { createContext, useContext, useState } from 'react';
import type { StudentDto } from '../types/Student';

interface AuthContextType {
  user: StudentDto | null;
  login: (user: StudentDto) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<StudentDto | null>(null);

  const login = (userData: StudentDto) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthContext missing');
  return context;
};
