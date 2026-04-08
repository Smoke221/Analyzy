/** Backend API origin (no trailing slash). Set `VITE_API_URL` in `.env` for local dev. */
export function getApiBaseUrl() {
  const raw = import.meta.env.VITE_API_URL;
  console.log(`🚀 --- getApiBaseUrl --- raw:`, raw);
  if (raw != null && String(raw).trim() !== "") {
    return String(raw).replace(/\/$/, "");
  }
  return "http://localhost:8000";
}
