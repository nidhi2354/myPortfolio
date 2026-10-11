const BASE = "/api";
const TOKEN_KEY = "portfolio_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

/** Har request par token laga deta hai aur API ka error message throw karta hai. */
export async function api(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || `Request fail (${res.status})`);
  return json;
}

export const getPortfolio = () => api("/portfolio");
export const sendMessage = (body) => api("/messages", { method: "POST", body });
export const login = (body) => api("/auth/login", { method: "POST", body });
