import { authApi } from "../api/authApi";
import { mapAuthResponse } from "../mappers/authMapper";
import { setToken, clearToken } from "../utils/tokenStorage";
import { AuthResult, RegisterFormValues, LoginFormValues } from "../types";

export const authService = {
  async register({
    name,
    email,
    password,
    confirmPassword,
  }: RegisterFormValues): Promise<AuthResult> {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    const { data } = await authApi.register({ name, email, password });
    const mapped = mapAuthResponse(data);
    setToken(mapped.token);
    return mapped;
  },

  async login({ email, password }: LoginFormValues): Promise<AuthResult> {
    const { data } = await authApi.login({ email, password });
    const mapped = mapAuthResponse(data);
    setToken(mapped.token);
    return mapped;
  },

  // Same success shape as login/register - the backend decides whether
  // this Google account is a new user or an existing one.
  async loginWithGoogle(credential: string): Promise<AuthResult> {
    const { data } = await authApi.googleLogin(credential);
    const mapped = mapAuthResponse(data);
    setToken(mapped.token);
    return mapped;
  },

  async forgotPassword(email: string): Promise<string> {
    const { data } = await authApi.forgotPassword(email);
    return data.message ?? "If that email exists, a reset link was sent.";
  },

  async resetPassword({
    token,
    newPassword,
  }: {
    token: string;
    newPassword: string;
  }): Promise<string> {
    const { data } = await authApi.resetPassword({ token, newPassword });
    return data.message ?? "Password updated. You can log in now.";
  },

  logout(): void {
    clearToken();
  },
};