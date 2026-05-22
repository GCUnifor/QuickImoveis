import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { router, type Href } from "expo-router";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { signIn } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen() {
  const { checkAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Atenção", "Preencha e-mail e senha.");
      return;
    }

    try {
      setLoading(true);
      console.log("Tentando login para:", email.trim());
      const data = await signIn({
        email: email.trim(),
        password,
      });

      // Atualiza o estado global de autenticação
      await checkAuth();

      Alert.alert("Sucesso", `Bem-vindo, ${data.user.name ?? data.user.email}`);
    } catch (error: any) {
      console.error("ERRO BRUTO CAPTURADO:", error);
      if (error.response) {
        console.error("DADOS DA RESPOSTA DO SERVIDOR:", error.response.data);
        console.error("STATUS DA RESPOSTA:", error.response.status);
      } else if (error.request) {
        console.error("NENHUMA RESPOSTA RECEBIDA DO SERVIDOR (Provável Timeout ou Rede)");
      } else {
        console.error("ERRO AO MONTAR REQUISIÇÃO:", error.message);
      }

      Alert.alert(
        "Erro no login",
        error.message || "Falha ao entrar."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.container}>
            <View style={styles.logoBox}>
              <MaterialCommunityIcons
                name="office-building-outline"
                size={32}
                color="#FFFFFF"
              />
            </View>

            <Text style={styles.title}>Quick Imóveis</Text>
            <Text style={styles.subtitle}>Faça login na sua conta</Text>

            <View style={styles.form}>
              <Text style={styles.label}>E-mail</Text>
              <View style={styles.inputWrapper}>
                <Feather name="mail" size={20} color="#6B7280" style={styles.leftIcon} />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="seu@email.com"
                  placeholderTextColor="#6B7280"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />
              </View>

              <Text style={styles.label}>Senha</Text>
              <View style={styles.inputWrapper}>
                <Feather name="lock" size={20} color="#6B7280" style={styles.leftIcon} />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Sua senha"
                  placeholderTextColor="#6B7280"
                  secureTextEntry={!showPassword}
                  style={styles.input}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  <Feather
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => router.push("/forgot-password" as Href)}>
                <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}
                onPress={handleLogin}
                disabled={loading}
              >
                <Text style={styles.primaryButtonText}>
                  {loading ? "Entrando..." : "Entrar"}
                </Text>
              </TouchableOpacity>

              <View style={styles.dividerRow}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>ou</Text>
                <View style={styles.divider} />
              </View>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => router.push("/register-type" as Href)}
              >
                <Text style={styles.secondaryButtonText}>Criar uma conta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F1F5F9" },
  scroll: { flexGrow: 1, justifyContent: "center" },
  container: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 32,
  },
  logoBox: {
    width: 62,
    height: 62,
    borderRadius: 16,
    backgroundColor: "#0A73D9",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center",
    marginBottom: 34,
  },
  form: { width: "100%" },
  label: {
    fontSize: 16,
    color: "#111827",
    marginBottom: 8,
    marginTop: 8,
  },
  inputWrapper: {
    height: 56,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  leftIcon: { marginRight: 10 },
  input: {
    flex: 1,
    height: "100%",
    color: "#111827",
    fontSize: 16,
  },
  eyeButton: { paddingLeft: 10 },
  forgotText: {
    color: "#0A73D9",
    fontSize: 15,
    marginTop: 14,
    marginBottom: 24,
  },
  primaryButton: {
    height: 56,
    backgroundColor: "#0A73D9",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonDisabled: { opacity: 0.7 },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 28,
  },
  divider: { flex: 1, height: 1, backgroundColor: "#D1D5DB" },
  dividerText: { marginHorizontal: 14, fontSize: 14, color: "#6B7280" },
  secondaryButton: {
    height: 56,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "500",
  },
});