const ACCESS_TOKEN_KEY = "meal_app_access_token";
const REFRESH_TOKEN_KEY = "meal_app_refresh_token";

const KEY = "token";

export const getToken = () => localStorage.getItem(KEY);

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export const setToken = (token: string) => localStorage.setItem(KEY, token);

export const removeToken = () => localStorage.removeItem(KEY);

export function setRefreshToken(token: string | null): void {
  if (token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }
}

export function clearToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}