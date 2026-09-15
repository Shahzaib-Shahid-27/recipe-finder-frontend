import httpClient from "./httpClient";
import type { LoginForm, PasswordResetRequest, RegisterForm } from "../types/auth";
import type { AxiosResponse } from "axios";
import type { AuthApiResponse } from "../types/auth";
import type { MessageResponse } from "../types/api";

export const authApi = {
  
  register({ name, email, password }: Pick<RegisterForm, "name" | "email" | "password">): Promise<AxiosResponse<AuthApiResponse>> {
    return httpClient.post("/auth/register", { name, email, password });
  },

  login({ email, password }: LoginForm): Promise<AxiosResponse<AuthApiResponse>> {
    return httpClient.post("/auth/login", { email, password });
  },

  forgotPassword(email: string): Promise<AxiosResponse<MessageResponse>> {
    return httpClient.post("/auth/forgot-password", { email });
  },

  resetPassword({ token, newPassword }: PasswordResetRequest): Promise<AxiosResponse<MessageResponse>> {
    return httpClient.post("/auth/reset-password", { token, newPassword });
  },
};
