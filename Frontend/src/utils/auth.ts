// src/utils/auth.ts
import Cookies from "js-cookie";

/**
 * Save JWT token to a cookie.
 */
export const saveAuthToken = (token: string) => {
  Cookies.set("token", token, {
    expires: 1,
    secure: false, // true if using https
    sameSite: "strict",
  });
};

/**
 * Get JWT token from cookie.
 */
export const getAuthToken = (): string | undefined => {
  return Cookies.get("token");
};

/**
 * Remove JWT token (for logout).
 */
export const removeAuthToken = () => {
  Cookies.remove("token");
};
