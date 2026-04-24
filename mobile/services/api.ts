import axios from "axios";

export const api = axios.create({
  baseURL: "https://quick-imoveis-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

export function setAuthToken(token?: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}