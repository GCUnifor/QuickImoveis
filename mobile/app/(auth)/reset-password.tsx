import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { resetPassword } from "../../services/auth";

export default function ResetPasswordScreen() {
  const params = useLocalSearchParams();
  const initialEmail = typeof params.email === "string" ? params.email : "";

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleResetPassword() {
    if (!email.trim()) {
      Alert.alert("Atenção", "Por favor, informe seu e-mail.");
      return;
    }
    if (!code.trim() || code.trim().length < 6) {
      Alert.alert("Atenção", "Por favor, informe o código de 6 dígitos.");
      return;
    }
    if (!newPassword) {
      Alert.alert("Atenção", "Por favor, digite sua nova senha.");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("Atenção", "A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);
      await resetPassword({
        email: email.trim(),
        code: code.trim(),
        newPassword: newPassword,
      });

      Alert.alert(
        "Sucesso",
        "Sua senha foi redefinida com sucesso! Faça login com a nova senha.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/(auth)"),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Erro",
        error instanceof Error ? error.message : "Falha ao redefinir a senha."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Feather name="arrow-left" size={22} color="#111827" />
              <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Redefinir senha</Text>
            <Text style={styles.subtitle}>
              Digite o código de 6 dígitos enviado por e-mail e escolha sua nova senha.
            </Text>

            <View style={styles.form}>
              {/* E-mail */}
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

              {/* Código */}
              <Text style={styles.label}>Código de verificação (6 dígitos)</Text>
              <View style={styles.inputWrapper}>
                <Feather name="key" size={20} color="#6B7280" style={styles.leftIcon} />
                <TextInput
                  value={code}
                  onChangeText={setCode}
                  placeholder="Digite o código"
                  placeholderTextColor="#6B7280"
                  keyboardType="number-pad"
                  maxLength={6}
                  style={styles.input}
                />
              </View>

              {/* Nova Senha */}
              <Text style={styles.label}>Nova senha</Text>
              <View style={styles.inputWrapper}>
                <Feather name="lock" size={20} color="#6B7280" style={styles.leftIcon} />
                <TextInput
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="Mínimo de 6 caracteres"
                  placeholderTextColor="#6B7280"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
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

              {/* Confirmar Senha */}
              <Text style={styles.label}>Confirmar nova senha</Text>
              <View style={styles.inputWrapper}>
                <Feather name="lock" size={20} color="#6B7280" style={styles.leftIcon} />
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Repita a nova senha"
                  placeholderTextColor="#6B7280"
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  style={styles.input}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeButton}
                >
                  <Feather
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}
                onPress={handleResetPassword}
                disabled={loading}
              >
                <Text style={styles.primaryButtonText}>
                  {loading ? "Processando..." : "Redefinir senha"}
                </Text>
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
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 28,
  },
  backText: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 24,
    marginBottom: 28,
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
    marginBottom: 20,
  },
  leftIcon: { marginRight: 10 },
  input: {
    flex: 1,
    height: "100%",
    color: "#111827",
    fontSize: 16,
  },
  eyeButton: { paddingLeft: 10 },
  primaryButton: {
    height: 56,
    backgroundColor: "#0A73D9",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  primaryButtonDisabled: { opacity: 0.7 },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
});
