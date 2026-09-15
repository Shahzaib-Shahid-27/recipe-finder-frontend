import { authApi } from "../api/authApi";
import { mapAuthResponse } from "../mappers/authMapper";
import { setToken, clearToken } from "../utils/tokenStorage";
import type {
  AuthResult,
  LoginForm,
  PasswordResetRequest,
  RegisterForm,
} from "../types/auth";

export const authService = {
  async register({
    name,
    email,
    password,
  }: RegisterForm): Promise<AuthResult> {
    const { data } = await authApi.register({
      name,
      email,
      password,
    });

    const mapped = mapAuthResponse(data);

    if (mapped.tokens.accessToken) {
      setToken(mapped.tokens.accessToken);
    }

    return mapped;
  },

  async login({
    email,
    password,
  }: LoginForm): Promise<AuthResult> {
    const { data } = await authApi.login({
      email,
      password,
    });

    const mapped = mapAuthResponse(data);

    if (mapped.tokens.accessToken) {
      setToken(mapped.tokens.accessToken);
    }

    return mapped;
  },

  async forgotPassword(email: string): Promise<string> {
    const { data } = await authApi.forgotPassword(email);

    return (
      data.message ??
      "Email verified. You can now reset your password."
    );
  },

  async resetPassword({
    email,
    currentPassword,
    newPassword,
  }: PasswordResetRequest): Promise<string> {
    const { data } = await authApi.resetPassword({
      email,
      currentPassword,
      newPassword,
    });

    return (
      data.message ??
      "Your password has been reset. You can log in now."
    );
  },

  logout(): void {
    clearToken();
  },
};