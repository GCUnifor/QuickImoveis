import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Dimensions, Modal, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useProperties } from '@/context/PropertyContext';
import { getListings, PropertyListing } from '@/services/listings';

const { width } = Dimensions.get('window');

export default function SearchScreen() {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useProperties();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isFilterModalVisible, setIsFilterModalVisible] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState('Todas');
  const [selectedBedrooms, setSelectedBedrooms] = React.useState('Qualquer');
  const [selectedBathrooms, setSelectedBathrooms] = React.useState('Qualquer');

  const [listings, setListings] = React.useState<PropertyListing[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchListingsData = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await getListings({ limit: 100 });
      setListings(res.data);
    } catch (error) {
      console.error("Error loading listings in search page:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchListingsData();
  }, [fetchListingsData]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatType = (type: string) => {
    const map: Record<string, string> = {
      'APARTAMENTO': 'Apartamento',
      'CASA': 'Casa',
      'TERRENO': 'Terreno',
      'COMERCIAL': 'Comercial'
    };
    return map[type] || type;
  };

  const filteredProperties = listings.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.address?.city && item.address.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.address?.neighborhood && item.address.neighborhood.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.property_type && item.property_type.toLowerCase().includes(searchQuery.toLowerCase()));

    const typeMap: Record<string, string> = {
      'Apartamento': 'APARTAMENTO',
      'Casa': 'CASA',
      'Terreno': 'TERRENO',
      'Comercial': 'COMERCIAL'
    };
    const matchesCategory = selectedCategory === 'Todas' || item.property_type === typeMap[selectedCategory];
    
    const itemBeds = item.bedrooms || 0;
    let matchesBeds = true;
    if (selectedBedrooms !== 'Qualquer') {
      if (selectedBedrooms === '4+') matchesBeds = itemBeds >= 4;
      else matchesBeds = itemBeds === parseInt(selectedBedrooms);
    }

    return matchesSearch && matchesCategory && matchesBeds;
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.searchRow}>
            <View style={styles.searchBar}>
              <Feather name="search" size={20} color="#64748B" />
              <TextInput 
                placeholder="Buscar por cidade, bairro ou tipo..." 
                style={styles.searchInput}
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity style={styles.filterBtn} onPress={() => setIsFilterModalVisible(true)}>
              <MaterialCommunityIcons name="filter-variant" size={24} color="#1E293B" />
            </TouchableOpacity>
          </View>
        </View>

        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0A73D9" />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.listContent}>
            <Text style={styles.resultsText}>{filteredProperties.length} imóveis encontrados</Text>
            
            {filteredProperties.map((item) => {
              const mainImage = item.images && item.images.length > 0 
                ? item.images[0].image_url 
                : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop";

              return (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.card}
                  onPress={() => router.push(`/details/${item.id}`)}
                >
                  <View style={styles.imageContainer}>
                    <Image source={mainImage} style={styles.image} contentFit="cover" />
                    <TouchableOpacity 
                      style={styles.heartBtn}
                      onPress={() => toggleFavorite(item.id)}
                    >
                      <Feather 
                        name="heart" 
                        size={20} 
                        color={isFavorite(item.id) ? "#EF4444" : "#1E293B"} 
                        fill={isFavorite(item.id) ? "#EF4444" : "transparent"}
                      />
                    </TouchableOpacity>
                    <View style={styles.badgesRow}>
                      <View style={[styles.badge, { backgroundColor: '#0A73D9' }]}>
                        <Text style={styles.badgeText}>Venda</Text>
                      </View>
                      <View style={[styles.badge, { backgroundColor: '#F1F5F9' }]}>
                        <Text style={[styles.badgeText, { color: '#1E293B' }]}>{formatType(item.property_type)}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.info}>
                    <Text style={styles.price}>{formatPrice(item.price)}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.locationRow}>
                      <Feather name="map-pin" size={14} color="#64748B" />
                      <Text style={styles.locationText}>
                        {`${item.address.neighborhood}, ${item.address.city} - ${item.address.state}`}
                      </Text>
                    </View>
                    
                    <View style={styles.specsRow}>
                      <View style={styles.spec}>
                        <MaterialCommunityIcons name="bed-outline" size={18} color="#64748B" />
                        <Text style={styles.specText}>{item.bedrooms || '0'} quartos</Text>
                      </View>
                      <View style={styles.spec}>
                        <MaterialCommunityIcons name="shower" size={18} color="#64748B" />
                        <Text style={styles.specText}>1 banheiros</Text>
                      </View>
                      <View style={styles.spec}>
                        <MaterialCommunityIcons name="ruler-square" size={18} color="#64748B" />
                        <Text style={styles.specText}>{item.area ? `${item.area}m²` : '0m²'}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}


        <Modal
          visible={isFilterModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsFilterModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Filtros Avançados</Text>
                  <TouchableOpacity onPress={() => setIsFilterModalVisible(false)}>
                    <Feather name="x" size={24} color="#1E293B" />
                  </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.filterSectionTitle}>Categoria</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                    {['Todas', 'Apartamento', 'Casa'].map(cat => (
                      <TouchableOpacity
                        key={cat}
                        style={[styles.filterOptionBtn, selectedCategory === cat && styles.filterOptionBtnActive]}
                        onPress={() => setSelectedCategory(cat)}
                      >
                        <Text style={[styles.filterOptionText, selectedCategory === cat && styles.filterOptionTextActive]}>{cat}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>

                  <Text style={styles.filterSectionTitle}>Quartos</Text>
                  <View style={styles.filterRow}>
                    {['Qualquer', '1', '2', '3', '4+'].map(num => (
                      <TouchableOpacity
                        key={num}
                        style={[styles.filterOptionBtn, selectedBedrooms === num && styles.filterOptionBtnActive]}
                        onPress={() => setSelectedBedrooms(num)}
                      >
                        <Text style={[styles.filterOptionText, selectedBedrooms === num && styles.filterOptionTextActive]}>{num}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={styles.filterSectionTitle}>Banheiros</Text>
                  <View style={styles.filterRow}>
                    {['Qualquer', '1', '2', '3', '4+'].map(num => (
                      <TouchableOpacity
                        key={num}
                        style={[styles.filterOptionBtn, selectedBathrooms === num && styles.filterOptionBtnActive]}
                        onPress={() => setSelectedBathrooms(num)}
                      >
                        <Text style={[styles.filterOptionText, selectedBathrooms === num && styles.filterOptionTextActive]}>{num}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>

                <View style={styles.modalFooter}>
                  <TouchableOpacity 
                    style={styles.clearFilterBtn}
                    onPress={() => {
                      setSelectedCategory('Todas');
                      setSelectedBedrooms('Qualquer');
                      setSelectedBathrooms('Qualquer');
                    }}
                  >
                    <Text style={styles.clearFilterText}>Limpar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.applyFilterBtn}
                    onPress={() => setIsFilterModalVisible(false)}
                  >
                    <Text style={styles.applyFilterText}>Aplicar Filtros</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 54,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#0F172A',
  },
  filterBtn: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  chipRow: {
    flexDirection: 'row',
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 10,
  },
  activeChip: {
    backgroundColor: '#0A73D9',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  activeChipText: {
    color: '#FFF',
  },
  listContent: {
    padding: 20,
  },
  resultsText: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  imageContainer: {
    height: 220,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  badgesRow: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    flexDirection: 'row',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  info: {
    padding: 20,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  title: {
    fontSize: 16,
    color: '#1E293B',
    marginTop: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  locationText: {
    fontSize: 13,
    color: '#64748B',
    marginLeft: 6,
  },
  specsRow: {
    flexDirection: 'row',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  spec: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  specText: {
    fontSize: 13,
    color: '#64748B',
    marginLeft: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
    marginTop: 16,
  },
  filterScroll: {
    marginBottom: 8,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
  },
  filterOptionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: 'transparent',
    marginRight: 10,
    marginBottom: 10,
  },
  filterOptionBtnActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#3B82F6',
  },
  filterOptionText: {
    color: '#64748B',
    fontWeight: '500',
  },
  filterOptionTextActive: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  modalFooter: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 16,
  },
  clearFilterBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },
  clearFilterText: {
    color: '#64748B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  applyFilterBtn: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#0A73D9',
    alignItems: 'center',
  },
  applyFilterText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
