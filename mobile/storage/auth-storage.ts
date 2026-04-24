import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = "@quickimoveis:access_token";
const USER_KEY = "@quickimoveis:user";

export async function saveSession(accessToken: string, user: unknown) {
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getToken() {
  return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function clearSession() {
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  await AsyncStorage.removeItem(USER_KEY);
}