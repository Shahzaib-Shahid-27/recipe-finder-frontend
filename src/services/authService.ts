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
  async register(data: RegisterForm): Promise<AuthResult> {
    const response = await authApi.register(data);
    const result = mapAuthResponse(response.data);

    if (result.tokens.accessToken) {
      setToken(result.tokens.accessToken);
    }

    return result;
  },

  async login(data: LoginForm): Promise<AuthResult> {
    const response = await authApi.login(data);
    const result = mapAuthResponse(response.data);

    if (result.tokens.accessToken) {
      setToken(result.tokens.accessToken);
    }

    return result;
  },

  async forgotPassword(email: string): Promise<string> {
    const { data } = await authApi.forgotPassword(email);

    return data.message || "Email verified. You can now reset your password.";
  },

  async resetPassword(data: PasswordResetRequest): Promise<string> {
    const response = await authApi.resetPassword(data);

    return (
      response.data.message ||
      "Your password has been reset. You can log in now."
    );
  },

  logout() {
    clearToken();
  },
};