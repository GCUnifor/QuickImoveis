import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { router, type Href } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { signUp } from "../../services/auth";

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email.trim());
}

function formatCurrencyInput(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  const number = Number(digits) / 100;
  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function RegisterBuyerScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [income, setIncome] = useState("");
  const [downPayment, setDownPayment] = useState("");
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
      password.length >= 6 &&
      confirmPassword === password
    );
  }, [fullName, email, password, confirmPassword]);

  async function handleRegisterBuyer() {
    if (!isFormValid || loading) return;

    try {
      setLoading(true);

      const data = await signUp({
        name: fullName.trim(),
        email: email.trim(),
        password,
        role: "COMPRADOR",
      });

      console.log("SIGN UP BUYER SUCCESS:", data);

      Alert.alert(
        "Conta criada",
        `Bem-vindo, ${data.user.name ?? data.user.email}`
      );

      router.replace("/(tabs)/index" as Href);
    } catch (error) {
      console.log("SIGN UP BUYER ERROR:", error);

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
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={() => router.back()} style={styles.header}>
            <Feather name="arrow-left" size={22} color="#111827" />
            <Text style={styles.headerTitle}>Cadastro de Comprador</Text>
          </TouchableOpacity>

          <View style={styles.topDivider} />

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

          <View style={styles.sectionDivider} />
          <Text style={styles.sectionText}>
            Informações opcionais para recomendações personalizadas:
          </Text>

          <Text style={styles.label}>Renda mensal</Text>
          <View style={styles.inputWrapper}>
            <Feather
              name="dollar-sign"
              size={20}
              color="#6B7280"
              style={styles.leftIcon}
            />
            <TextInput
              value={income}
              onChangeText={(text) => setIncome(formatCurrencyInput(text))}
              placeholder="R$ 0,00"
              placeholderTextColor="#6B7280"
              keyboardType="numeric"
              style={styles.input}
            />
          </View>

          <Text style={styles.label}>Valor de entrada disponível</Text>
          <View style={styles.inputWrapper}>
            <Feather
              name="dollar-sign"
              size={20}
              color="#6B7280"
              style={styles.leftIcon}
            />
            <TextInput
              value={downPayment}
              onChangeText={(text) => setDownPayment(formatCurrencyInput(text))}
              placeholder="R$ 0,00"
              placeholderTextColor="#6B7280"
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.primaryButton,
            (!isFormValid || loading) && styles.primaryButtonDisabled,
          ]}
          disabled={!isFormValid || loading}
          onPress={handleRegisterBuyer}
        >
          <Text style={styles.primaryButtonText}>
            {loading ? "Criando..." : "Criar minha conta"}
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
  label: {
    fontSize: 16,
    color: "#111827",
    marginBottom: 8,
    marginTop: 12,
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
  errorText: {
    color: "#DC2626",
    fontSize: 13,
    marginTop: 6,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: "#D1D5DB",
    marginTop: 22,
    marginBottom: 16,
  },
  sectionText: {
    fontSize: 15,
    color: "#4B5563",
    marginBottom: 4,
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