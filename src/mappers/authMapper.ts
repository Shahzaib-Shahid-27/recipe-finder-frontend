import type { AuthApiResponse, AuthResult, User } from "../types/auth";

export function mapAuthResponse(response: AuthApiResponse): AuthResult {
  const data = response.data?.data;
  const tokens = response.data?.tokens;

  const user: User = {
    id: data?.id ?? data?._id ?? null,
    name: data?.name ?? "",
    email: data?.email ?? "",
  };

  return {
    user,
    tokens: {
      accessToken: tokens?.accessToken ?? null,
      refreshToken: tokens?.refreshToken ?? null,
    },
  };
}