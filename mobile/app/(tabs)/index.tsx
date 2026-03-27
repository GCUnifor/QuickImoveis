import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useProperties } from "@/context/PropertyContext";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const { properties, toggleFavorite, isFavorite } = useProperties();
  const [selectedFilter, setSelectedFilter] = React.useState("Todos");

  const filteredProperties = selectedFilter === "Todos" 
    ? properties 
    : properties.filter(p => p.category === selectedFilter);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]}>
        {/* Header Section */}
        <View style={styles.blueHeader}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greetingText}>Olá, Diego</Text>
              <Text style={styles.welcomeText}>Encontre seu imóvel</Text>
            </View>
            <TouchableOpacity style={styles.profileIconBtn}>
              <MaterialCommunityIcons name="office-building" size={24} color="#0A73D9" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Feather name="search" size={20} color="#6B7280" />
              <TextInput
                placeholder="Buscar por cidade ou bairro..."
                placeholderTextColor="#94A3B8"
                style={styles.searchInput}
              />
              <TouchableOpacity style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Buscar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Filters Section */}
        <View style={styles.whiteBackground}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {["Todos", "Apartamento", "Casa"].map((filter) => (
              <TouchableOpacity
                key={filter}
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
            ))}
          </ScrollView>

          {/* Featured Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Destaques para você</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.verticalFeed}>
            {filteredProperties.map((property) => (
              <TouchableOpacity
                key={property.id}
                style={styles.propertyCardVertical}
                onPress={() => router.push(`/details/${property.id}`)}
              >
                <View style={styles.cardImageContainer}>
                  <Image
                    source={property.image}
                    style={styles.propertyImage}
                    contentFit="cover"
                  />
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>Venda</Text>
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
                      fill={isFavorite(property.id) ? "#EF4444" : "transparent"}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.cardInfo}>
                  <Text style={styles.priceText}>{property.price}</Text>
                  <Text style={styles.propertyTitle} numberOfLines={1}>
                    {property.title}
                  </Text>
                  <View style={styles.locationRow}>
                    <Feather name="map-pin" size={14} color="#6B7280" />
                    <Text style={styles.locationText}>{property.location}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
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
  searchButton: {
    backgroundColor: "#0A73D9",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
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
});
