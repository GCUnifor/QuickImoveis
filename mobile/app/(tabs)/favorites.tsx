import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { useProperties } from '@/context/PropertyContext';
import { getFavorites, PropertyListing } from '@/services/listings';

export default function FavoritesScreen() {
  const router = useRouter();
  const { toggleFavorite } = useProperties();
  const [favoriteProperties, setFavoriteProperties] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    try {
      const res = await getFavorites({ page: 1, limit: 100 });
      setFavoriteProperties(res.data);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [fetchFavorites])
  );

  const handleRemoveFavorite = async (id: string) => {
    // Optimistic UI update
    setFavoriteProperties(prev => prev.filter(p => p.id !== id));
    await toggleFavorite(id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const renderItem = ({ item }: { item: PropertyListing }) => {
    const mainImage = item.images && item.images.length > 0 
      ? item.images[0].image_url 
      : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop";

    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => router.push(`/details/${item.id}`)}
      >
        <Image source={{ uri: mainImage }} style={styles.image} contentFit="cover" />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Venda</Text>
        </View>
        <TouchableOpacity 
          style={styles.favoriteBtn}
          onPress={(e) => {
            e.stopPropagation();
            handleRemoveFavorite(item.id);
          }}
        >
          <Feather 
            name="heart" 
            size={20} 
            color="#EF4444" 
            fill="#EF4444" 
          />
        </TouchableOpacity>
        
        <View style={styles.info}>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <View style={styles.locationRow}>
            <Feather name="map-pin" size={14} color="#64748B" />
            <Text style={styles.locationText}>
              {`${item.address.neighborhood}, ${item.address.city} - ${item.address.state}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Favoritos</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0A73D9" />
        </View>
      ) : (
        <FlatList
          data={favoriteProperties}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Feather name="heart" size={64} color="#E2E8F0" />
              <Text style={styles.emptyText}>Você ainda não salvou nenhum imóvel.</Text>
              <TouchableOpacity 
                style={styles.exploreBtn}
                onPress={() => router.push('/(tabs)')}
              >
                <Text style={styles.exploreBtnText}>Explorar Imóveis</Text>
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
    padding: 24,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  list: {
    padding: 16,
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
  },
  image: {
    width: '100%',
    height: 200,
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#0A73D9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  info: {
    padding: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A73D9',
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
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 16,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  exploreBtn: {
    marginTop: 20,
    backgroundColor: '#0A73D9',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  exploreBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
