import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/context/AuthContext';

export default function TabLayout() {
  const { userRole } = useAuth();
  const colorScheme = useColorScheme();
  const activeColor = "#0A73D9";
  const inactiveColor = "#94A3B8";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === "ios" ? 100 : 85,
          paddingBottom: Platform.OS === "ios" ? 35 : 15,
          paddingTop: 10,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E2E8F0",
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Buscar",
          tabBarIcon: ({ color }) => <Feather name="search" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "",
          href: userRole === 'broker' ? '/create' : null,
          tabBarIcon: () => (
            <View style={styles.createButtonCustom}>
              <Feather name="plus" size={32} color="#FFFFFF" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color }) => <Feather name="heart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
        }}
      />
      {/* Hidden screens */}
      <Tabs.Screen name="my-properties" options={{ href: null, title: 'Meus Imóveis' }} />
      <Tabs.Screen name="properties" options={{ href: null }} />
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  createButtonCustom: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#0A73D9",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -35,
    shadowColor: "#0A73D9",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 12,
    borderWidth: 5,
    borderColor: "#FFFFFF",
  },
});
