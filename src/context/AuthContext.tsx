import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { authService } from "../services/authService";
import { getToken } from "../utils/tokenStorage";
import type { AuthResult, LoginForm, RegisterForm, User } from "../types/auth";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  register: (formValues: RegisterForm) => Promise<void>;
  login: (formValues: LoginForm) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getToken());

  const register = useCallback(async (formValues: RegisterForm): Promise<void> => {
    const result: AuthResult = await authService.register(formValues);
    setUser(result.user);
    setIsAuthenticated(true);
  }, []);

  const login = useCallback(async (formValues: LoginForm): Promise<void> => {
    const result: AuthResult = await authService.login(formValues);
    setUser(result.user);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback((): void => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// The context hook intentionally shares this module's context with the provider.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
