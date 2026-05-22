import React, { useMemo, useState } from "react";
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
import { signUp } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email.trim());
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatCreci(value: string) {
  const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const numbers = cleaned.replace(/[A-Z]/g, "").slice(0, 6);
  const letters = cleaned.replace(/[0-9]/g, "").slice(0, 2);

  if (!numbers && !letters) return "";
  if (numbers.length < 6 && letters.length === 0) return numbers;
  if (numbers.length === 6 && letters.length === 0) return `${numbers}-`;
  return `${numbers}-${letters}`;
}

function isValidCreci(value: string) {
  return /^\d{6}-[A-Z]{2}$/.test(value);
}

export default function RegisterBrokerScreen() {
  const { checkAuth } = useAuth();
  const [fullName, setFullName] = useState("");
  // ... (rest of the state)
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [creci, setCreci] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const nameError =
    fullName.trim().length > 0 && fullName.trim().length < 3
      ? "Informe seu nome completo."
      : "";

  const emailError =
    email.trim().length > 0 && !isValidEmail(email)
      ? "Digite um e-mail válido."
      : "";

  const phoneError =
    phone.length > 0 && phone.replace(/\D/g, "").length < 11
      ? "Digite um telefone válido com DDD."
      : "";

  const creciError =
    creci.length > 0 && !isValidCreci(creci)
      ? "Use o formato 123456-SP."
      : "";

  const passwordError =
    password.length > 0 && password.length < 6
      ? "A senha deve ter pelo menos 6 caracteres."
      : "";

  const confirmPasswordError =
    confirmPassword.length > 0 && confirmPassword !== password
      ? "As senhas não coincidem."
      : "";

  const isFormValid = useMemo(() => {
    return (
      fullName.trim().length >= 3 &&
      isValidEmail(email) &&
      phone.replace(/\D/g, "").length === 11 &&
      isValidCreci(creci) &&
      password.length >= 6 &&
      confirmPassword === password
    );
  }, [fullName, email, phone, creci, password, confirmPassword]);

  async function handleRegisterBroker() {
    if (!isFormValid || loading) return;

    try {
      setLoading(true);

      const data = await signUp({
        name: fullName.trim(),
        email: email.trim(),
        password,
        role: "CORRETOR",
        creci,
        phone: phone.replace(/\D/g, ""),
      });

      console.log("SIGN UP BROKER SUCCESS:", data);

      // Atualiza o estado global de autenticação para acionar o redirecionamento do RootLayout
      await checkAuth();

      Alert.alert(
        "Conta criada",
        `Cadastro realizado para ${data.user.name ?? data.user.email}`
      );
    } catch (error) {
      console.log("SIGN UP BROKER ERROR:", error);

      Alert.alert(
        "Erro no cadastro",
        error instanceof Error ? error.message : "Não foi possível criar a conta."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.header}>
              <Feather name="arrow-left" size={22} color="#111827" />
              <Text style={styles.headerTitle}>Cadastro de Corretor</Text>
            </TouchableOpacity>

            <View style={styles.topDivider} />

            <View style={styles.alertBox}>
              <MaterialCommunityIcons
                name="shield-check-outline"
                size={20}
                color="#10B981"
                style={styles.alertIcon}
              />
              <Text style={styles.alertText}>
                Para criar uma conta de corretor, é obrigatório informar seu número
                CRECI válido. Isso garante a segurança e confiabilidade da
                plataforma.
              </Text>
            </View>

            <Text style={styles.label}>Nome completo *</Text>
            <View style={[styles.inputWrapper, nameError ? styles.inputError : null]}>
              <Feather name="user" size={20} color="#6B7280" style={styles.leftIcon} />
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Seu nome completo"
                placeholderTextColor="#6B7280"
                style={styles.input}
              />
            </View>
            {!!nameError && <Text style={styles.errorText}>{nameError}</Text>}

            <Text style={styles.label}>E-mail *</Text>
            <View style={[styles.inputWrapper, emailError ? styles.inputError : null]}>
              <Feather name="mail" size={20} color="#6B7280" style={styles.leftIcon} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="seu@email.com"
                placeholderTextColor="#6B7280"
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
              />
            </View>
            {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}

            <Text style={styles.label}>Telefone *</Text>
            <View style={[styles.inputWrapper, phoneError ? styles.inputError : null]}>
              <Feather name="phone" size={20} color="#6B7280" style={styles.leftIcon} />
              <TextInput
                value={phone}
                onChangeText={(text) => setPhone(formatPhone(text))}
                placeholder="(11) 99999-9999"
                placeholderTextColor="#6B7280"
                keyboardType="phone-pad"
                style={styles.input}
              />
            </View>
            {!!phoneError && <Text style={styles.errorText}>{phoneError}</Text>}

            <Text style={styles.label}>
              Número CRECI * <Text style={styles.requiredRed}>(Obrigatório)</Text>
            </Text>
            <View style={[styles.inputWrapper, creciError ? styles.inputError : null]}>
              <MaterialCommunityIcons
                name="badge-account-outline"
                size={20}
                color="#6B7280"
                style={styles.leftIcon}
              />
              <TextInput
                value={creci}
                onChangeText={(text) => setCreci(formatCreci(text))}
                placeholder="123456-SP"
                placeholderTextColor="#6B7280"
                autoCapitalize="characters"
                style={styles.input}
              />
            </View>
            <Text style={styles.helperText}>
              Formato: 6 números + hífen + sigla do estado.
            </Text>
            {!!creciError && <Text style={styles.errorText}>{creciError}</Text>}

            <Text style={styles.label}>Senha *</Text>
            <View
              style={[styles.inputWrapper, passwordError ? styles.inputError : null]}
            >
              <Feather name="lock" size={20} color="#6B7280" style={styles.leftIcon} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor="#6B7280"
                secureTextEntry={!showPassword}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
            {!!passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

            <Text style={styles.label}>Confirmar senha *</Text>
            <View
              style={[
                styles.inputWrapper,
                confirmPasswordError ? styles.inputError : null,
              ]}
            >
              <Feather name="lock" size={20} color="#6B7280" style={styles.leftIcon} />
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Repita a senha"
                placeholderTextColor="#6B7280"
                secureTextEntry
                style={styles.input}
              />
            </View>
            {!!confirmPasswordError && (
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.primaryButton,
            (!isFormValid || loading) && styles.primaryButtonDisabled,
          ]}
          disabled={!isFormValid || loading}
          onPress={handleRegisterBroker}
        >
          <Text style={styles.primaryButtonText}>
            {loading ? "Criando..." : "Criar conta de corretor"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  scroll: {
    paddingBottom: 120,
  },
  container: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  topDivider: {
    height: 1,
    backgroundColor: "#D1D5DB",
    marginHorizontal: -24,
    marginBottom: 24,
  },
  alertBox: {
    backgroundColor: "#DDF7EE",
    borderWidth: 1,
    borderColor: "#A7E6CC",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  alertIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  alertText: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
    lineHeight: 22,
  },
  label: {
    fontSize: 16,
    color: "#111827",
    marginBottom: 8,
    marginTop: 12,
  },
  requiredRed: {
    color: "#DC2626",
    fontSize: 14,
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
  inputError: {
    borderColor: "#DC2626",
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#111827",
  },
  helperText: {
    marginTop: 8,
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 18,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 13,
    marginTop: 6,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#D1D5DB",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
  },
  primaryButton: {
    height: 56,
    backgroundColor: "#0A73D9",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
  },
  primaryButtonDisabled: {
    backgroundColor: "#93C5FD",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
});