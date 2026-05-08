import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { logout, userRole, user } = useAuth();

  const baseMenuItems = [
    { icon: 'settings', label: 'Configurações', iconLib: 'Feather' },
    { icon: 'file-text', label: 'Termos e condições', iconLib: 'Feather' },
  ];

  const menuItems = userRole === 'broker' 
    ? [{ icon: 'home-city', label: 'Meus imóveis', iconLib: 'MaterialCommunityIcons' }, ...baseMenuItems]
    : baseMenuItems;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Minha Conta</Text>
          
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <Feather name="user" size={40} color="#0A73D9" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.userName}>{user?.name || 'Usuário'}</Text>
              <Text style={styles.userEmail}>{user?.email || 'email@exemplo.com'}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.badgeBtn}>
            <Text style={styles.badgeText}>{userRole === 'broker' ? 'Corretor' : 'Comprador'}</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items Card */}
        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.menuItem, 
                index === menuItems.length - 1 && { borderBottomWidth: 0 }
              ]}
              onPress={() => {
                if (item.label === 'Meus imóveis') {
                  router.push('/my-properties' as any);
                }
              }}
            >
              <View style={styles.menuIconBox}>
                {item.iconLib === 'Feather' ? (
                  <Feather name={item.icon as any} size={22} color="#0F172A" />
                ) : (
                  <MaterialCommunityIcons name={item.icon as any} size={22} color="#0F172A" />
                )}
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Feather name="chevron-right" size={20} color="#64748B" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Feather name="log-out" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#0A73D9',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 30,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  userEmail: {
    fontSize: 14,
    color: '#E0F2FE',
    marginTop: 4,
  },
  badgeBtn: {
    backgroundColor: '#1E293B33',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#38BDF855',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  menuCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 24,
    marginTop: -20,
    borderRadius: 24,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 24,
    marginTop: 30,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF4444',
    marginLeft: 10,
  },
});
