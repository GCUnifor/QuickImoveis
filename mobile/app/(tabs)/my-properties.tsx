import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Platform, ActivityIndicator, RefreshControl } from 'react-native';
import { Image } from 'expo-image';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { getMyProperties } from '@/services/property';

export default function MyPropertiesScreen() {
  const router = useRouter();
  const [myProperties, setMyProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMyProperties = useCallback(async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    try {
      const res = await getMyProperties({ page: 1, limit: 100 });
      setMyProperties(res.data || []);
    } catch (error) {
      console.error("Failed to fetch my properties:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMyProperties();
    }, [fetchMyProperties])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchMyProperties(true);
  }, [fetchMyProperties]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const renderItem = ({ item }: { item: any }) => {
    const mainImage = item.images && item.images.length > 0 
      ? item.images[0].image_url 
      : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop";

    const locationText = item.address
      ? `${item.address.neighborhood || ""}, ${item.address.city || ""} - ${item.address.state || ""}`
      : 'Localização não informada';

    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => router.push(`/details/${item.id}`)}
      >
        <Image source={{ uri: mainImage }} style={styles.image} contentFit="cover" />
        <View style={[
          styles.statusBadge,
          item.status === 'VENDIDO' && { backgroundColor: '#94A3B8' },
          item.status === 'EM_NEGOCIACAO' && { backgroundColor: '#F59E0B' },
        ]}>
          <Text style={styles.statusText}>
            {item.status === 'DISPONIVEL' ? 'Publicado' :
             item.status === 'VENDIDO' ? 'Vendido' :
             item.status === 'EM_NEGOCIACAO' ? 'Em negociação' : 'Rascunho'}
          </Text>
        </View>
        
        <View style={styles.info}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
            <TouchableOpacity style={styles.editBtn}>
              <Feather name="edit-2" size={18} color="#0A73D9" />
            </TouchableOpacity>
          </View>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <View style={styles.locationRow}>
            <Feather name="map-pin" size={14} color="#64748B" />
            <Text style={styles.locationText}>{locationText}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/profile')} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meus Imóveis</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading && !refreshing ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0A73D9" />
        </View>
      ) : (
        <FlatList
          data={myProperties}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#0A73D9"
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="home-city-outline" size={80} color="#E2E8F0" />
              <Text style={styles.emptyTitle}>Nenhum imóvel publicado</Text>
              <Text style={styles.emptyText}>Você ainda não cadastrou nenhum imóvel para venda.</Text>
              <TouchableOpacity 
                style={styles.addBtn}
                onPress={() => router.push('/create')}
              >
                <Text style={styles.addBtnText}>Cadastrar meu primeiro imóvel</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingTop: Platform.OS === 'android' ? 40 : 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  list: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  image: {
    width: '100%',
    height: 180,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  info: {
    padding: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A73D9',
  },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  addBtn: {
    marginTop: 24,
    backgroundColor: '#0A73D9',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
  },
  addBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
