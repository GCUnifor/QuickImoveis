import axios from "axios";
import { api, setAuthToken } from "./api";
import { saveSession, clearSession } from "../storage/auth-storage";
import type {
  AuthResponse,
  ForgotPasswordPayload,
  SignInPayload,
  SignUpPayload,
} from "../types/auth";

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    return data?.message || error.message || fallback;
  }
  return fallback;
}

export async function signIn(payload: SignInPayload) {
  try {
    const { data } = await api.post<AuthResponse>("/auth/sign-in", payload);
    await saveSession(data.access_token, data.user);
    setAuthToken(data.access_token);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Não foi possível fazer login."));
  }
}

export async function signUp(payload: SignUpPayload) {
  try {
    const { data } = await api.post<AuthResponse>("/auth/sign-up", payload);
    await saveSession(data.access_token, data.user);
    setAuthToken(data.access_token);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Não foi possível criar a conta."));
  }
}

export async function forgotPassword(payload: ForgotPasswordPayload) {
  try {
    const { data } = await api.post<{ message: string }>(
      "/auth/forgot-password",
      payload
    );
    return data;
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "Não foi possível enviar o código.")
    );
  }
}

export async function logout() {
  try {
    await api.post("/auth/logout");
  } finally {
    setAuthToken(null);
    await clearSession();
  }
}