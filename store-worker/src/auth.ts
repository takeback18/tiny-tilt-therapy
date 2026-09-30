function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// D1's datetime('now') returns "YYYY-MM-DD HH:MM:SS" (space-separated, UTC, no
// milliseconds). Date#toISOString() uses "T" and milliseconds, which sorts
// incorrectly against that format for same-day comparisons — always format
// expiry timestamps this way so `expires_at > datetime('now')` compares correctly.
export function toSqliteDatetime(date: Date): string {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

export function generateToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return toBase64Url(bytes);
}

const SESSION_COOKIE_NAME = "session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 365; // 1 year — "indefinite" access

export function getSessionToken(request: Request): string | null {
  const cookieHeader = request.headers.get("Cookie") ?? "";
  for (const part of cookieHeader.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === SESSION_COOKIE_NAME) return rest.join("=");
  }
  return null;
}

interface CookieEnv {
  ENVIRONMENT: string;
  COOKIE_DOMAIN: string;
}

export function buildSessionCookie(token: string, env: CookieEnv): string {
  const parts = [
    `${SESSION_COOKIE_NAME}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${SESSION_TTL_SECONDS}`,
  ];
  if (env.ENVIRONMENT !== "development") {
    parts.push(`Domain=${env.COOKIE_DOMAIN}`, "Secure");
  }
  return parts.join("; ");
}

export function buildClearSessionCookie(env: CookieEnv): string {
  const parts = [`${SESSION_COOKIE_NAME}=`, "Path=/", "HttpOnly", "SameSite=Lax", "Max-Age=0"];
  if (env.ENVIRONMENT !== "development") {
    parts.push(`Domain=${env.COOKIE_DOMAIN}`, "Secure");
  }
  return parts.join("; ");
}
