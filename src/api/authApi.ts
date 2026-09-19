import httpClient from "./httpClient";
import type { LoginForm,PasswordResetRequest,RegisterForm,AuthApiResponse,} from "../types/auth";
import type { MessageResponse } from "../types/api";

export const authApi = {
  register: (data: RegisterForm) =>
    httpClient.post<AuthApiResponse>("/auth/register", data),

  login: (data: LoginForm) =>
    httpClient.post<AuthApiResponse>("/auth/login", data),

  forgotPassword: (email: string) =>
    httpClient.post<MessageResponse>("/auth/forgot-password", { email }),

  resetPassword: (data: PasswordResetRequest) =>
    httpClient.post<MessageResponse>("/auth/reset-password", data),
};