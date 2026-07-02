/**
 * src/utils/auth.js
 * Centralised helpers for reading and writing auth data in localStorage.
 * All components should use these instead of calling localStorage directly.
 */

const KEYS = {
  TOKEN:   'token',
  USER_ID: 'userId',
  ROLE:    'role',
};

/** Returns the stored JWT, or null if not present. */
export function getToken() {
  return localStorage.getItem(KEYS.TOKEN);
}

/** Returns the stored user ID, or null if not present. */
export function getUserId() {
  return localStorage.getItem(KEYS.USER_ID);
}

/** Returns the stored role ('seller' | 'customer'), or null. */
export function getRole() {
  return localStorage.getItem(KEYS.ROLE);
}

/**
 * Persists auth data returned from login/register.
 * @param {{ token: string, user: { _id: string, role: string } }} authPayload
 */
export function setAuthData({ token, user }) {
  localStorage.setItem(KEYS.TOKEN, token);
  localStorage.setItem(KEYS.USER_ID, user._id);
  localStorage.setItem(KEYS.ROLE, user.role);
}

/** Removes all auth data from localStorage (logout). */
export function clearAuthData() {
  localStorage.removeItem(KEYS.TOKEN);
  localStorage.removeItem(KEYS.USER_ID);
  localStorage.removeItem(KEYS.ROLE);
}

/** Returns true if a token is present (does not verify expiry). */
export function isAuthenticated() {
  return Boolean(getToken());
}
