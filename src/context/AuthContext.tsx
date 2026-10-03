import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { authService } from "../services/authService";
import { getToken, setToken, removeToken } from "../utils/tokenStorage";

import type {
  AuthResult,
  LoginForm,
  RegisterForm,
  User,
} from "../types/auth";

const API = import.meta.env.VITE_API_BASE_URL;

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  register: (data: RegisterForm) => Promise<void>;
  login: (data: LoginForm) => Promise<void>;
  loginWithToken: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function fetchMe(token: string): Promise<User | null> {
  try {
    const res = await fetch(`${API}/auth/get-profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return null;
    }

    const result = await res.json();

    return result.data;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  // Restore the user after a page refresh
  useEffect(() => {
    const token = getToken();
    if (!token) return;

    fetchMe(token).then((me) => {
      if (me) {
        setUser(me);
      } else {
        // token invalid or expired
        removeToken();
        setIsAuthenticated(false);
      }
    });
  }, []);

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

  // Used after Google redirects back with a token
  const loginWithToken = async (token: string) => {
    setToken(token);
    const me = await fetchMe(token);

    if (!me) {
      removeToken();
      throw new Error("Invalid token");
    }

    setUser(me);
    setIsAuthenticated(true);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, register, login, loginWithToken, logout }}
    >
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