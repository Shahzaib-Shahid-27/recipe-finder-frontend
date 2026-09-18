export interface User {
  id: string | number | null;
  name: string;
  email: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthResult {
  user: User;
  tokens: AuthTokens;
}

export interface AuthApiResponse {
  status?: string;
  message?: string;

  data?: {
    tokens?: {
      accessToken?: string | null;
      refreshToken?: string | null;
    };

    data?: {
      id?: string | number | null;
      _id?: string | number | null;
      name?: string;
      email?: string;
    };
  };
}

export interface PasswordResetRequest {
  email: string;
  token: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  email: string;
  currentPassword: string;
  newPassword: string;
}