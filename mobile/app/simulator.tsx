import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { simulateFinancing, SimulationResult } from "@/services/listings";
import { useProperties } from "@/context/PropertyContext";

const { width } = Dimensions.get("window");

export default function SimulatorScreen() {
  const router = useRouter();
  const { toggleFavorite, isFavorite, runSimulation } = useProperties();
  
  const [rendaMensal, setRendaMensal] = useState("");
  const [entrada, setEntrada] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSimulate = async () => {
    Keyboard.dismiss();
    const renda = parseFloat(rendaMensal.replace(/[^0-9.]/g, ''));
    const valorEntrada = parseFloat(entrada.replace(/[^0-9.]/g, ''));

    if (isNaN(renda) || isNaN(valorEntrada) || renda <= 0 || valorEntrada <= 0) {
      alert("Por favor, informe valores válidos maiores que zero.");
      return;
    }

    setLoading(true);
    setHasSearched(true);
    try {
      await runSimulation(renda, valorEntrada);
      alert("Simulação atualizada com sucesso!");
      router.replace('/(tabs)');
    } catch (error) {
      console.error(error);
      alert("Erro ao realizar a simulação. Verifique os dados ou tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const renderItem = ({ item }: { item: SimulationResult }) => {
    const { property } = item;
    const mainImage =
      property.images && property.images.length > 0
        ? property.images[0].image_url
        : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop";

    return (
      <View style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity
          style={styles.propertyCardVertical}
          onPress={() => router.push(`/details/${property.id}`)}
        >
          <View style={styles.cardImageContainer}>
            <Image
              source={{ uri: mainImage }}
              style={styles.propertyImage}
              contentFit="cover"
            />
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Recomendado</Text>
            </View>
            <TouchableOpacity
              style={styles.favoriteBtn}
              onPress={(e) => {
                e.stopPropagation();
                toggleFavorite(property.id);
              }}
            >
              <Feather
                name="heart"
                size={20}
                color={isFavorite(property.id) ? "#EF4444" : "#111827"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.priceText}>{formatCurrency(property.price)}</Text>
            <Text style={styles.propertyTitle} numberOfLines={1}>
              {property.title}
            </Text>
            
            <View style={styles.simulationBox}>
              <View style={styles.simulationRow}>
                <Feather name="check-circle" size={14} color="#10B981" />
                <Text style={styles.simulationTextBold}>
                  Parcelas estimadas: {formatCurrency(item.valor_parcela_calculada)}
                </Text>
              </View>
              <View style={styles.simulationRow}>
                <Feather name="pie-chart" size={14} color="#6B7280" />
                <Text style={styles.simulationText}>
                  Compromete {item.percentual_renda_comprometido}% da renda
                </Text>
              </View>
              <View style={styles.simulationRow}>
                <Feather name="home" size={14} color="#6B7280" />
                <Text style={styles.simulationText}>
                  Valor financiado: {formatCurrency(item.valor_restante_apos_entrada)}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

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
              >
                <Feather name="x" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <View>
                <Text style={styles.welcomeText}>Simulador de Imóveis</Text>
                <Text style={styles.greetingText}>Descubra o que cabe no seu bolso</Text>
              </View>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Renda Mensal (R$)</Text>
                <View style={styles.inputWrapper}>
                  <Feather name="dollar-sign" size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: 5000"
                    placeholderTextColor="#94A3B8"
                    keyboardType="numeric"
                    value={rendaMensal}
                    onChangeText={setRendaMensal}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Valor de Entrada (R$)</Text>
                <View style={styles.inputWrapper}>
                  <Feather name="briefcase" size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: 40000"
                    placeholderTextColor="#94A3B8"
                    keyboardType="numeric"
                    value={entrada}
                    onChangeText={setEntrada}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.simulateBtn}
                onPress={handleSimulate}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.simulateBtnText}>Simular Agora</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginTop: 20, alignItems: 'center' }}
                onPress={() => router.replace('/(tabs)')}
              >
                <Text style={{ color: '#64748B', fontWeight: 'bold' }}>Pular e ir para a tela inicial</Text>
              </TouchableOpacity>
            </View>

            {/* Results */}
            <View style={styles.resultsContainer}>
              {loading && results.length === 0 ? (
                <View style={styles.centerBox}>
                  <ActivityIndicator size="large" color="#0A73D9" />
                  <Text style={styles.emptyText}>Calculando melhores opções...</Text>
                </View>
              ) : hasSearched && results.length === 0 ? (
                <View style={styles.centerBox}>
                  <Feather name="frown" size={48} color="#CBD5E1" />
                  <Text style={styles.emptyText}>
                    Nenhum imóvel recomendado para esses valores.
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={results}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id_imovel}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
                  ListHeaderComponent={
                    results.length > 0 ? (
                      <Text style={styles.resultsTitle}>
                        {results.length} imóveis ideais para você:
                      </Text>
                    ) : null
                  }
                />
              )}
            </View>
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
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    marginRight: 15,
    padding: 5,
  },
  greetingText: {
    color: "#E0F2FE",
    fontSize: 14,
    fontWeight: "500",
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#1E293B",
  },
  simulateBtn: {
    backgroundColor: "#0A73D9",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  simulateBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  resultsContainer: {
    flex: 1,
    marginTop: 10,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginHorizontal: 20,
    marginBottom: 15,
  },
  centerBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    marginTop: 15,
    color: "#64748B",
    fontSize: 15,
    textAlign: "center",
  },
  propertyCardVertical: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardImageContainer: {
    height: 180,
    backgroundColor: "#E2E8F0",
  },
  propertyImage: {
    width: "100%",
    height: "100%",
  },
  statusBadge: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "#10B981",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  favoriteBtn: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFFEE",
    alignItems: "center",
    justifyContent: "center",
  },
  cardInfo: {
    padding: 15,
  },
  priceText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 5,
  },
  propertyTitle: {
    fontSize: 15,
    color: "#475569",
    marginBottom: 10,
  },
  simulationBox: {
    backgroundColor: "#F0FDF4",
    padding: 10,
    borderRadius: 10,
    gap: 6,
  },
  simulationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  simulationTextBold: {
    fontSize: 13,
    color: "#065F46",
    fontWeight: "700",
  },
  simulationText: {
    fontSize: 12,
    color: "#475569",
  },
});
