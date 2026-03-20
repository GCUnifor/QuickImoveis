import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { router, type Href } from "expo-router";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function RegisterTypeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={22} color="#111827" />
            <Text style={styles.backText}>Criar Conta</Text>
          </TouchableOpacity>

          <View style={styles.dividerTop} />

          <Text style={styles.title}>Qual é o seu perfil?</Text>
          <Text style={styles.subtitle}>
            Escolha como você deseja usar a plataforma
          </Text>

          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => router.push("/register-buyer" as Href)}
          >
            <View style={styles.optionLeft}>
              <View style={[styles.iconBox, styles.blueBox]}>
                <Ionicons name="person-outline" size={26} color="#0A73D9" />
              </View>

              <View style={styles.optionTextBox}>
                <Text style={styles.optionTitle}>Sou Comprador</Text>
                <Text style={styles.optionDescription}>
                  Quero encontrar imóveis para comprar ou alugar e conectar com
                  corretores.
                </Text>
              </View>
            </View>

            <Feather name="chevron-right" size={22} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => router.push("/register-broker" as Href)}
          >
            <View style={styles.optionLeft}>
              <View style={[styles.iconBox, styles.greenBox]}>
                <MaterialCommunityIcons
                  name="briefcase-outline"
                  size={26}
                  color="#10B981"
                />
              </View>

              <View style={styles.optionTextBox}>
                <Text style={styles.optionTitle}>Sou Corretor</Text>
                <Text style={styles.optionDescription}>
                  Quero acessar leads qualificados e divulgar meus imóveis na
                  plataforma.
                </Text>
              </View>
            </View>

            <Feather name="chevron-right" size={22} color="#6B7280" />
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Corretores precisam informar seu{" "}
              <Text style={styles.bold}>número CRECI</Text> válido para criar uma
              conta.
            </Text>
          </View>

          <View style={styles.bottomArea}>
            <Text style={styles.bottomText}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => router.replace("/" as Href)}>
              <Text style={styles.loginLink}>Fazer login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  scroll: {
    flexGrow: 1,
  },
  container: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 18,
  },
  backText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  dividerTop: {
    height: 1,
    backgroundColor: "#D1D5DB",
    marginHorizontal: -24,
    marginBottom: 28,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 17,
    color: "#4B5563",
    marginBottom: 28,
    lineHeight: 24,
  },
  optionCard: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 18,
    backgroundColor: "#F8FAFC",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  optionLeft: {
    flexDirection: "row",
    flex: 1,
    marginRight: 12,
  },
  iconBox: {
    width: 58,
    height: 58,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  blueBox: {
    backgroundColor: "#DBEAFE",
  },
  greenBox: {
    backgroundColor: "#D1FAE5",
  },
  optionTextBox: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  optionDescription: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },
  infoBox: {
    backgroundColor: "#EAF1F7",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginTop: 8,
    marginBottom: 40,
  },
  infoText: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 24,
    textAlign: "center",
  },
  bold: {
    fontWeight: "700",
    color: "#111827",
  },
  bottomArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    flexWrap: "wrap",
  },
  bottomText: {
    fontSize: 15,
    color: "#4B5563",
  },
  loginLink: {
    fontSize: 15,
    color: "#0A73D9",
    fontWeight: "500",
  },
});
