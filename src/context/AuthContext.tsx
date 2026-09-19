import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { authService } from "../services/authService";
import { getToken } from "../utils/tokenStorage";

import type { AuthResult, LoginForm, RegisterForm, User } from "../types/auth";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  register: (data: RegisterForm) => Promise<void>;
  login: (data: LoginForm) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  const register = async (data: RegisterForm) => {
    const result: AuthResult = await authService.register(data);
    setUser(result.user);
    setIsAuthenticated(true);
  };

  const login = async (data: LoginForm) => {
    const result: AuthResult = await authService.login(data);
    setUser(result.user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}