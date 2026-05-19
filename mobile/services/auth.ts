import axios from "axios";
import { api, setAuthToken } from "./api";
import { saveSession, clearSession } from "../storage/auth-storage";
import type {
  AuthResponse,
  ForgotPasswordPayload,
  SignInPayload,
  SignUpPayload,
  ResetPasswordPayload,
} from "../types/auth";

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || fallback;
  }
  return error instanceof Error ? error.message : fallback;
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

export async function resetPassword(payload: ResetPasswordPayload) {
  try {
    const { data } = await api.post<{ message: string }>(
      "/auth/reset-password",
      payload
    );
    return data;
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "Não foi possível redefinir a senha.")
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

export async function requestEmailVerification() {
  try {
    const { data } = await api.post<{ message: string }>("/auth/request-email-verification");
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Não foi possível enviar o e-mail de verificação."));
  }
}