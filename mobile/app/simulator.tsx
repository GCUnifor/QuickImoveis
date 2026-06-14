import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useProperties } from "@/context/PropertyContext";

export default function SimulatorScreen() {
  const router = useRouter();
  const { runSimulation, clearSimulation, renda, entrada: savedEntrada } = useProperties();
  
  const [rendaMensal, setRendaMensal] = useState("");
  const [entrada, setEntrada] = useState("");
  const [loading, setLoading] = useState(false);

  // Helper to format values as BRL currency (whole numbers)
  const formatWholeCurrency = (text: string) => {
    const clean = text.replace(/\D/g, "");
    if (!clean) return "";
    const parsed = parseInt(clean, 10);
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parsed);
  };

  // Helper to parse currency back to a number
  const parseWholeCurrency = (text: string) => {
    const clean = text.replace(/\D/g, "");
    return clean ? parseInt(clean, 10) : 0;
  };

  // Populate inputs with current simulation values on mount
  useEffect(() => {
    if (renda) {
      setRendaMensal(formatWholeCurrency(String(renda)));
    }
    if (savedEntrada) {
      setEntrada(formatWholeCurrency(String(savedEntrada)));
    }
  }, [renda, savedEntrada]);

  const handleRendaChange = (text: string) => {
    setRendaMensal(formatWholeCurrency(text));
  };

  const handleEntradaChange = (text: string) => {
    setEntrada(formatWholeCurrency(text));
  };

  const handleSimulate = async () => {
    Keyboard.dismiss();
    const rendaVal = parseWholeCurrency(rendaMensal);
    const entradaVal = parseWholeCurrency(entrada);

    if (rendaVal <= 0) {
      alert("Por favor, informe uma renda mensal maior que zero.");
      return;
    }

    if (entradaVal < 0) {
      alert("Por favor, informe um valor de entrada válido.");
      return;
    }

    setLoading(true);
    try {
      await runSimulation(rendaVal, entradaVal);
      alert("Filtro de renda Caixa atualizado!");
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar simulação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    Keyboard.dismiss();
    clearSimulation();
    setRendaMensal("");
    setEntrada("");
    alert("Simulação desativada e filtros limpos.");
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  const hasActiveSimulation = renda !== null || savedEntrada !== null;

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={styles.blueHeader}>
              <TouchableOpacity 
                onPress={() => {
                  if (router.canGoBack()) {
                    router.back();
                  } else {
                    router.replace('/(tabs)');
                  }
                }} 
                style={styles.backBtn}
                activeOpacity={0.7}
              >
                <Feather name="arrow-left" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={styles.headerTextContainer}>
                <Text style={styles.welcomeText}>Dados Financeiros</Text>
                <Text style={styles.greetingText}>Configure seu perfil Caixa de financiamento</Text>
              </View>
            </View>

            <ScrollView 
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* Form Card */}
              <View style={styles.formContainer}>
                <View style={styles.formInfoRow}>
                  <MaterialCommunityIcons name="calculator-variant" size={28} color="#0A73D9" />
                  <Text style={styles.formInfoTitle}>Simulador Inteligente</Text>
                </View>
                <Text style={styles.formInfoText}>
                  Preencha as informações abaixo para que o aplicativo possa calcular automaticamente os imóveis que cabem no seu orçamento.
                </Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Renda Mensal (R$)</Text>
                  <View style={styles.inputWrapper}>
                    <Feather name="dollar-sign" size={20} color="#0A73D9" />
                    <TextInput
                      style={styles.input}
                      placeholder="Ex: R$ 5.000"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                      value={rendaMensal}
                      onChangeText={handleRendaChange}
                    />
                    {rendaMensal.length > 0 && (
                      <TouchableOpacity onPress={() => setRendaMensal("")}>
                        <Feather name="x-circle" size={16} color="#94A3B8" />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Valor de Entrada (R$)</Text>
                  <View style={styles.inputWrapper}>
                    <Feather name="briefcase" size={20} color="#0A73D9" />
                    <TextInput
                      style={styles.input}
                      placeholder="Ex: R$ 40.000"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                      value={entrada}
                      onChangeText={handleEntradaChange}
                    />
                    {entrada.length > 0 && (
                      <TouchableOpacity onPress={() => setEntrada("")}>
                        <Feather name="x-circle" size={16} color="#94A3B8" />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.simulateBtn}
                  onPress={handleSimulate}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <>
                      <Text style={styles.simulateBtnText}>Salvar e Atualizar</Text>
                      <Feather name="check" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
                    </>
                  )}
                </TouchableOpacity>

                {hasActiveSimulation && (
                  <TouchableOpacity
                    style={styles.clearBtn}
                    onPress={handleClear}
                    disabled={loading}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.clearBtnText}>Limpar dados da simulação</Text>
                    <Feather name="trash-2" size={16} color="#EF4444" style={{ marginLeft: 6 }} />
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => {
                    if (router.canGoBack()) {
                      router.back();
                    } else {
                      router.replace('/(tabs)');
                    }
                  }}
                  disabled={loading}
                >
                  <Text style={styles.cancelBtnText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  blueHeader: {
    backgroundColor: "#0A73D9",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 40 : 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  greetingText: {
    color: "#E0F2FE",
    fontSize: 13,
    fontWeight: "500",
    marginTop: 2,
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  formInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  formInfoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  formInfoText: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    height: 52,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#0F172A",
    fontWeight: "500",
  },
  simulateBtn: {
    backgroundColor: "#0A73D9",
    borderRadius: 14,
    height: 52,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#0A73D9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  simulateBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  clearBtn: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#FEE2E2",
    backgroundColor: "#FFF8F8",
    borderRadius: 14,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  clearBtnText: {
    color: "#EF4444",
    fontSize: 15,
    fontWeight: "600",
  },
  cancelBtn: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  cancelBtnText: {
    color: "#64748B",
    fontSize: 15,
    fontWeight: "600",
  },
});
