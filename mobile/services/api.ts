import axios from "axios";
import { clearSession } from "../storage/auth-storage";

export const api = axios.create({
  baseURL: "https://quickimoveis.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await clearSession();
      delete api.defaults.headers.common.Authorization;
      // We can also trigger a page reload or let the app naturally redirect to login on next check
    }
    return Promise.reject(error);
  }
);

export function setAuthToken(token?: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}