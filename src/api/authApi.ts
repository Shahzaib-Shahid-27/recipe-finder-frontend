import httpClient from "./httpClient";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export const authApi = {
  register(payload: RegisterPayload) {
    return httpClient.post("/auth/register", payload);
  },
  login(payload: LoginPayload) {
    return httpClient.post("/auth/login", payload);
  },
  // 👉 credential is the ID token Google's button gives the frontend.
  // Your backend verifies it and returns { token, user } like any other login.
  googleLogin(credential: string) {
    return httpClient.post("/auth/google", { credential });
  },
  forgotPassword(email: string) {
    return httpClient.post("/auth/forgot-password", { email });
  },
  resetPassword({ token, newPassword }: ResetPasswordPayload) {
    return httpClient.post("/auth/reset-password", { token, newPassword });
  },
};