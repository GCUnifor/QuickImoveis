import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const ACCESS_TOKEN_KEY = "@quickimoveis:access_token";
const USER_KEY = "@quickimoveis:user";

const storage = {
  getItem: async (key: string) => {
    if (Platform.OS === "web") {
      return typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    }
    return AsyncStorage.getItem(key);
  },
  setItem: async (key: string, value: string) => {
    if (Platform.OS === "web") {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, value);
      }
      return;
    }
    return AsyncStorage.setItem(key, value);
  },
  removeItem: async (key: string) => {
    if (Platform.OS === "web") {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
      return;
    }
    return AsyncStorage.removeItem(key);
  },
};

export async function saveSession(accessToken: string, user: unknown) {
  await storage.setItem(ACCESS_TOKEN_KEY, accessToken);
  await storage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getToken() {
  return storage.getItem(ACCESS_TOKEN_KEY);
}

export async function getUser() {
  const user = await storage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

export async function clearSession() {
  await storage.removeItem(ACCESS_TOKEN_KEY);
  await storage.removeItem(USER_KEY);
}