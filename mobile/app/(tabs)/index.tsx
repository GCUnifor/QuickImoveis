import React, { useMemo, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  RefreshControl,
  Modal,
} from "react-native";
import { Image } from "expo-image";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useProperties } from "@/context/PropertyContext";
import { useAuth } from "@/context/AuthContext";
import { getListings, PropertyListing } from "@/services/listings";

const { width } = Dimensions.get("window");

const HomeHeader = React.memo(({ 
  searchQuery, 
  setSearchQuery, 
  selectedFilter, 
  setSelectedFilter 
}: {
  searchQuery: string;
  setSearchQuery: (t: string) => void;
  selectedFilter: string;
  setSelectedFilter: (t: string) => void;
}) => (
  <>
    {/* Header Section */}
    <View style={styles.blueHeader}>
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.greetingText}>Olá, Diego</Text>
          <Text style={styles.welcomeText}>Encontre seu imóvel</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#6B7280" />
          <TextInput
            placeholder="Buscar por cidade..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
    </View>

    {/* Filters Section */}
    <View style={styles.whiteBackground}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={["Todos", "Apartamento", "Casa"]}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.filterScroll}
        renderItem={({ item: filter }) => (
          <TouchableOpacity
            style={[
              styles.filterChip,
              selectedFilter === filter && styles.activeFilterChip,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Featured Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Destaques para você</Text>
      </View>
    </View>
  </>
));

export default function HomeScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { 
    toggleFavorite, 
    isFavorite, 
    simulatedProperties, 
    runSimulation, 
    clearSimulation, 
    renda, 
    entrada 
  } = useProperties();

  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // States for simulate-financing modal
  const [showModal, setShowModal] = useState(false);
  const [rendaInput, setRendaInput] = useState("");
  const [entradaInput, setEntradaInput] = useState("");
  const [simulating, setSimulating] = useState(false);
  const [hasSkipped, setHasSkipped] = useState(false);

  useEffect(() => {
    // Show modal if logged in, hasn't simulated yet, and hasn't skipped in this session
    if (isAuthenticated && !simulatedProperties && !hasSkipped) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [isAuthenticated, simulatedProperties, hasSkipped]);

  const handleSimulate = async () => {
    Keyboard.dismiss();
    const r = parseFloat(rendaInput.replace(/[^0-9.]/g, ''));
    const ent = parseFloat(entradaInput.replace(/[^0-9.]/g, ''));

    if (isNaN(r) || isNaN(ent) || r <= 0 || ent <= 0) {
      alert("Por favor, informe valores válidos maiores que zero.");
      return;
    }

    setSimulating(true);
    try {
      await runSimulation(r, ent);
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert("Erro ao realizar a simulação. Verifique os dados ou tente novamente.");
    } finally {
      setSimulating(false);
    }
  };

  const fetchListings = useCallback(async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    try {
      const response = await getListings({
        city: searchQuery || undefined,
      });
      setListings(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchListings();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchListings]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchListings(true);
  }, [fetchListings]);

  const filteredProperties = useMemo(() => {
    const baseList = simulatedProperties 
      ? simulatedProperties.map(s => s.property)
      : listings;

    return baseList.filter((p) => {
      const typeMap: Record<string, string> = {
        'Apartamento': 'APARTAMENTO',
        'Casa': 'CASA',
        'Terreno': 'TERRENO',
        'Comercial': 'COMERCIAL'
      };
      
      const matchesCategory =
        selectedFilter === "Todos" || p.property_type === typeMap[selectedFilter];
      
      return matchesCategory;
    });
  }, [listings, selectedFilter, simulatedProperties]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const renderProperty = ({ item: property }: { item: PropertyListing }) => {
    const mainImage = property.images && property.images.length > 0 
      ? property.images[0].image_url 
      : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop";

    const simInfo = simulatedProperties?.find(s => s.id_imovel === property.id);

    return (
      <View style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity
          style={styles.propertyCardVertical}
          onPress={() => router.push(`/details/${property.id}`)}
        >
          <View style={styles.cardImageContainer}>
            <Image
              source={mainImage}
              style={styles.propertyImage}
              contentFit="cover"
            />
            {simInfo ? (
              <View style={[styles.statusBadge, { backgroundColor: '#10B981' }]}>
                <Text style={styles.statusText}>Recomendado</Text>
              </View>
            ) : (
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Venda</Text>
              </View>
            )}
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
                fill={isFavorite(property.id) ? "#EF4444" : "transparent"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.priceText}>{formatPrice(property.price)}</Text>
            <Text style={styles.propertyTitle} numberOfLines={1}>
              {property.title}
            </Text>


            <View style={styles.locationRow}>
              <Feather name="map-pin" size={14} color="#6B7280" />
              <Text style={styles.locationText}>
                {`${property.address.neighborhood}, ${property.address.city} - ${property.address.state}`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safe}>
        <FlatList
          data={filteredProperties}
          renderItem={renderProperty}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <>
              <HomeHeader 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
              
              {/* Simulation Banner */}
              {simulatedProperties && (
                <View style={styles.simulationBanner}>
                  <View style={styles.simulationBannerTextRow}>
                    <Feather name="info" size={16} color="#137333" />
                    <Text style={styles.simulationBannerText}>
                      Filtro Caixa Ativo (Renda: R$ {renda?.toLocaleString('pt-BR')})
                    </Text>
                  </View>
                  <TouchableOpacity onPress={clearSimulation} style={styles.clearSimBtn}>
                    <Text style={styles.clearSimBtnText}>Limpar</Text>
                  </TouchableOpacity>
                </View>
              )}

              {loading && !refreshing && (
                <View style={{ padding: 20 }}>
                  <ActivityIndicator size="large" color="#0A73D9" />
                </View>
              )}
              {!loading && filteredProperties.length === 0 && (
                <View style={{ padding: 40, alignItems: 'center' }}>
                  <Feather name="search" size={48} color="#CBD5E1" />
                  <Text style={{ marginTop: 10, color: '#64748B', fontSize: 16 }}>Nenhum imóvel encontrado</Text>
                </View>
              )}
            </>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#0A73D9" />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          removeClippedSubviews={Platform.OS === 'android'}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={10}
          ListFooterComponent={<View style={{ height: 100 }} />}
        />

        {/* Simulate Financing Blur Modal */}
        <Modal visible={showModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalContent}>
                <View style={styles.modalIconBox}>
                  <MaterialCommunityIcons name="calculator" size={32} color="#0A73D9" />
                </View>
                
                <Text style={styles.modalTitle}>Imóveis Recomendados</Text>
                <Text style={styles.modalSubtitle}>
                  Informe sua renda e entrada para filtrarmos automaticamente apenas o que cabe no seu bolso com a simulação Caixa!
                </Text>

                <View style={styles.modalInputGroup}>
                  <Text style={styles.modalLabel}>Renda Mensal (R$)</Text>
                  <View style={styles.modalInputWrapper}>
                    <Feather name="dollar-sign" size={18} color="#64748B" />
                    <TextInput
                      style={styles.modalInput}
                      placeholder="Ex: 5000"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                      value={rendaInput}
                      onChangeText={setRendaInput}
                    />
                  </View>
                </View>

                <View style={styles.modalInputGroup}>
                  <Text style={styles.modalLabel}>Valor de Entrada (R$)</Text>
                  <View style={styles.modalInputWrapper}>
                    <Feather name="briefcase" size={18} color="#64748B" />
                    <TextInput
                      style={styles.modalInput}
                      placeholder="Ex: 40000"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                      value={entradaInput}
                      onChangeText={setEntradaInput}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.modalSubmitBtn}
                  onPress={handleSimulate}
                  disabled={simulating}
                >
                  {simulating ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.modalSubmitBtnText}>Ver Imóveis Ideais</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalSkipBtn}
                  onPress={() => setHasSkipped(true)}
                  disabled={simulating}
                >
                  <Text style={styles.modalSkipBtnText}>Pular e ver todos</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0A73D9",
  },
  blueHeader: {
    backgroundColor: "#0A73D9",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  greetingText: {
    color: "#E0F2FE",
    fontSize: 16,
    fontWeight: "500",
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
  profileIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    marginTop: 10,
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    height: 60,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderWidth: 4,
    borderColor: "#E0F2FE",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#111827",
  },
  whiteBackground: {
    backgroundColor: "#F8FAFC",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingTop: 30,
    flex: 1,
  },
  filterScroll: {
    paddingLeft: 20,
    marginBottom: 25,
  },
  filterChip: {
    height: 44,
    paddingHorizontal: 20,
    borderRadius: 22,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  activeFilterChip: {
    backgroundColor: "#0A73D9",
  },
  filterText: {
    fontSize: 15,
    color: "#475569",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  infoCardsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginBottom: 35,
  },
  infoCard: {
    flex: 0.48,
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  infoIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#BFDBFE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
  },
  infoSubtitle: {
    fontSize: 12,
    color: "#64748B",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  seeAllText: {
    color: "#0A73D9",
    fontWeight: "600",
  },
  verticalFeed: {
    paddingHorizontal: 20,
  },
  propertyCardVertical: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    alignSelf: "center",
  },
  cardImageContainer: {
    height: 220,
    backgroundColor: "#F1F5F9",
  },
  propertyImage: {
    width: "100%",
    height: "100%",
  },
  statusBadge: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "#0A73D9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  favoriteBtn: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFFEE",
    alignItems: "center",
    justifyContent: "center",
  },
  cardInfo: {
    padding: 15,
  },
  priceText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 5,
  },
  propertyTitle: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 10,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    color: "#64748B",
    marginLeft: 5,
  },
  flatListContent: {
    backgroundColor: "#F8FAFC",
    paddingBottom: 20,
  },
  simulationBox: {
    backgroundColor: "#F0FDF4",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
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
    marginLeft: 5,
  },
  simulationBanner: {
    backgroundColor: "#E6F4EA",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#A3E635",
  },
  simulationBannerTextRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  simulationBannerText: {
    color: "#137333",
    fontSize: 14,
    fontWeight: "600",
  },
  clearSimBtn: {
    backgroundColor: "#D93025",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  clearSimBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.85)", // beautiful dark blur simulation
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  modalIconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  modalInputGroup: {
    width: "100%",
    marginBottom: 16,
  },
  modalLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
  },
  modalInputWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
  },
  modalInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#0F172A",
  },
  modalSubmitBtn: {
    width: "100%",
    backgroundColor: "#0A73D9",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#0A73D9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  modalSubmitBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  modalSkipBtn: {
    width: "100%",
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  modalSkipBtnText: {
    color: "#64748B",
    fontSize: 15,
    fontWeight: "600",
  },
});
