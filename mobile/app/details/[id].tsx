import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Platform } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useProperties } from '@/context/PropertyContext';

const { width } = Dimensions.get('window');

export default function PropertyDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { properties, toggleFavorite, isFavorite } = useProperties();

  // Find the property in the context
  const contextProperty = properties.find(p => p.id === id);

  // Fallback if not found (or for initial dummy data)
  const property = contextProperty || {
    id: '1',
    title: 'Apartamento Moderno na Aldeota',
    price: 'R$ 450.000',
    location: 'Rua Desembargador Leite Albuquerque, Aldeota, Fortaleza - CE',
    bedrooms: '3',
    bathrooms: '2',
    area: '85m²',
    parking: '2',
    description: 'Este apartamento incrível oferece uma vista deslumbrante da cidade e acabamentos de altíssimo padrão. Localizado no coração da Aldeota, próximo a escolas, shoppings e melhores restaurantes.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop',
  };

  const images = property.image ? [property.image] : [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop',
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Image Carrousel Area */}
        <View style={styles.imageContainer}>
          <Image source={images[0]} style={styles.mainImage} contentFit="cover" />
          
          <SafeAreaView style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
              <Feather name="arrow-left" size={24} color="#0F172A" />
            </TouchableOpacity>
            <View style={styles.rightActions}>
              <TouchableOpacity style={styles.iconBtn}>
                <Feather name="share-2" size={24} color="#0F172A" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.iconBtn, { marginLeft: 12 }]}
                onPress={() => toggleFavorite(property.id)}
              >
                <Feather 
                  name="heart" 
                  size={24} 
                  color={isFavorite(property.id) ? "#EF4444" : "#0F172A"} 
                  fill={isFavorite(property.id) ? "#EF4444" : "transparent"}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          <View style={styles.imageCount}>
            <Text style={styles.imageCountText}>1 / {images.length}</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.price}>{property.price}</Text>
          <Text style={styles.title}>{property.title}</Text>
          
          <View style={styles.addressRow}>
            <Feather name="map-pin" size={16} color="#64748B" />
            <Text style={styles.addressText}>{property.location}</Text>
          </View>

          <View style={styles.divider} />

          {/* Specs */}
          <View style={styles.specsRow}>
            <View style={styles.specItem}>
              <MaterialCommunityIcons name="bed-outline" size={24} color="#0A73D9" />
              <Text style={styles.specValue}>{property.bedrooms || '2'}</Text>
              <Text style={styles.specLabel}>Quartos</Text>
            </View>
            <View style={styles.specItem}>
              <MaterialCommunityIcons name="shower" size={24} color="#0A73D9" />
              <Text style={styles.specValue}>{property.bathrooms || '1'}</Text>
              <Text style={styles.specLabel}>Banheiros</Text>
            </View>
            <View style={styles.specItem}>
              <MaterialCommunityIcons name="ruler-square" size={24} color="#0A73D9" />
              <Text style={styles.specValue}>{property.area || '0m²'}</Text>
              <Text style={styles.specLabel}>Área</Text>
            </View>
            <View style={styles.specItem}>
              <MaterialCommunityIcons name="car-outline" size={24} color="#0A73D9" />
              <Text style={styles.specValue}>{(property as any).parking || '1'}</Text>
              <Text style={styles.specLabel}>Vagas</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>{property.description || 'Nenhuma descrição fornecida para este imóvel.'}</Text>

          <View style={styles.divider} />

          {/* Broker */}
          <View style={styles.brokerCard}>
            <Image source="https://i.pravatar.cc/150?u=diego" style={styles.brokerImg} />
            <View style={styles.brokerInfo}>
              <Text style={styles.brokerName}>Diego Ribeiro</Text>
              <Text style={styles.brokerRole}>Corretor Especialista</Text>
            </View>
            <TouchableOpacity style={styles.chatBtn}>
              <Feather name="message-square" size={20} color="#0A73D9" />
            </TouchableOpacity>
          </View>

          {/* Financing Simulator Placeholder */}
          <TouchableOpacity style={styles.simulatorCard}>
            <MaterialCommunityIcons name="calculator" size={24} color="#0A73D9" />
            <View style={styles.simulatorText}>
              <Text style={styles.simulatorTitle}>Simular Financiamento</Text>
              <Text style={styles.simulatorSub}>Veja as parcelas estimadas</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.callBtn}>
          <Feather name="phone" size={20} color="#0A73D9" />
          <Text style={styles.callBtnText}>Ligar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.whatsappBtn}>
          <FontAwesome5 name="whatsapp" size={20} color="#FFF" />
          <Text style={styles.whatsappBtnText}>Conversar no WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageContainer: {
    height: 350,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  headerActions: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
  },
  rightActions: {
    flexDirection: 'row',
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageCount: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  imageCountText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 24,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0A73D9',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    marginTop: 8,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  addressText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 6,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 24,
  },
  specsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  specItem: {
    alignItems: 'center',
  },
  specValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 8,
  },
  specLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#475569',
  },
  brokerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 20,
  },
  brokerImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  brokerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  brokerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  brokerRole: {
    fontSize: 13,
    color: '#64748B',
  },
  chatBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  simulatorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 20,
    marginTop: 16,
  },
  simulatorText: {
    flex: 1,
    marginLeft: 16,
  },
  simulatorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  simulatorSub: {
    fontSize: 13,
    color: '#64748B',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  callBtn: {
    width: 100,
    height: 56,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  callBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A73D9',
    marginLeft: 8,
  },
  whatsappBtn: {
    flex: 1,
    height: 56,
    backgroundColor: '#25D366',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#25D366',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  whatsappBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 10,
  },
});
