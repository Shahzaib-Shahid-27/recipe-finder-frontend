import type {
  AuthApiResponse,
  AuthResult,
  User,
} from "../types/auth";

export function mapAuthResponse(
  response: AuthApiResponse
): AuthResult {
  const backendUser = response.data?.data;
  const backendTokens = response.data?.tokens;

  const user: User = {
    id: backendUser?.id ?? backendUser?._id ?? null,
    name: backendUser?.name ?? "",
    email: backendUser?.email ?? "",
  };

  return {
    user,

    tokens: {
      accessToken: backendTokens?.accessToken ?? null,
      refreshToken: backendTokens?.refreshToken ?? null,
    },
  };
}