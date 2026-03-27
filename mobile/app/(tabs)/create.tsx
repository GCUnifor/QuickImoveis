import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import { Image } from 'expo-image';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useProperties } from '@/context/PropertyContext';

const { width } = Dimensions.get('window');

const EXAMPLE_PHOTOS = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512915922686-57c11fd9b6b1?q=80&w=400&auto=format&fit=crop",
];

const FEATURES = [
  "Varanda Gourmet", "Ar Condicionado", "Armários Planejados", "Piscina", 
  "Academia", "Salão de Festas", "Churrasqueira", "Jardim", 
  "Segurança 24h", "Playground", "Quadra de Esportes", "Vista para o Mar"
];

export default function CreatePropertyScreen() {
  const router = useRouter();
  const { addProperty } = useProperties();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: 'Venda' as 'Venda' | 'Aluguel',
    category: 'Apartamento',
    title: '',
    price: '',
    address: '',
    city: '',
    state: '',
    photos: [] as string[],
    description: '',
    selectedFeatures: [] as string[],
    bedrooms: '',
    bathrooms: '',
    parking: '',
    area: '',
    whatsapp: '',
  });

  const handlePublish = () => {
    addProperty({
      title: formData.title || "Novo Imóvel",
      price: formData.price.startsWith('R$') ? formData.price : `R$ ${formData.price}`,
      location: `${formData.address}, ${formData.city} - ${formData.state}`,
      category: formData.category,
      type: formData.type,
      image: formData.photos.length > 0 ? formData.photos[0] : EXAMPLE_PHOTOS[0],
      description: formData.description,
      features: formData.selectedFeatures,
      bedrooms: (formData as any).bedrooms,
      bathrooms: (formData as any).bathrooms,
      area: (formData as any).area,
      parking: (formData as any).parking,
      whatsapp: (formData as any).whatsapp,
    });
    router.replace('/(tabs)');
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(feature)
        ? prev.selectedFeatures.filter(f => f !== feature)
        : [...prev.selectedFeatures, feature]
    }));
  };

  const addExamplePhotos = () => {
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...EXAMPLE_PHOTOS].slice(0, 5)
    }));
  };

  const renderStep1 = () => (
    <ScrollView style={styles.stepContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Informações Básicas</Text>
      
      <Text style={styles.label}>Tipo de Imóvel</Text>
      <View style={styles.grid}>
        {[
          { id: 'Apartamento', icon: 'office-building' },
          { id: 'Casa', icon: 'home-variant-outline' },
          { id: 'Terreno', icon: 'map-marker-distance' },
          { id: 'Comercial', icon: 'storefront-outline' },
        ].map((item) => (
          <TouchableOpacity 
            key={item.id}
            style={[styles.gridItem, formData.category === item.id && styles.gridItemActive]}
            onPress={() => setFormData({...formData, category: item.id})}
          >
            <MaterialCommunityIcons 
              name={item.icon as any} 
              size={24} 
              color={formData.category === item.id ? "#0A73D9" : "#64748B"} 
            />
            <Text style={[styles.gridText, formData.category === item.id && styles.gridTextActive]}>{item.id}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Título do Anúncio *</Text>
      <TextInput 
        style={styles.input}
        placeholder="Ex: Apartamento Moderno no Centro"
        value={formData.title}
        onChangeText={t => setFormData({...formData, title: t})}
      />

      <Text style={styles.label}>Valor de Venda *</Text>
      <TextInput 
        style={styles.input}
        placeholder="R$ 0"
        keyboardType="numeric"
        value={formData.price}
        onChangeText={t => setFormData({...formData, price: t})}
      />

      <Text style={styles.label}>WhatsApp para Contato *</Text>
      <View style={styles.inputWithIconContainer}>
        <View style={styles.iconPrefix}>
          <MaterialCommunityIcons name="whatsapp" size={24} color="#25D366" />
        </View>
        <TextInput 
          style={styles.inputWithIcon}
          placeholder="(11) 99999-9999"
          keyboardType="phone-pad"
          value={formData.whatsapp}
          onChangeText={t => setFormData({...formData, whatsapp: t})}
        />
      </View>
      <Text style={styles.helpText}>Os interessados entrarão em contato por este número</Text>

      <Text style={styles.label}>Área (m²) *</Text>
      <TextInput 
        style={styles.input}
        placeholder="Ex: 75"
        keyboardType="numeric"
        value={formData.area}
        onChangeText={t => setFormData({...formData, area: t})}
      />

      <View style={styles.specsRowInputs}>
        <View style={styles.specInputCol}>
          <Text style={styles.label}>Quartos</Text>
          <TextInput 
            style={styles.inputSmall}
            placeholder="0"
            keyboardType="numeric"
            value={formData.bedrooms}
            onChangeText={t => setFormData({...formData, bedrooms: t})}
          />
        </View>
        <View style={styles.specInputCol}>
          <Text style={styles.label}>Banheiros</Text>
          <TextInput 
            style={styles.inputSmall}
            placeholder="0"
            keyboardType="numeric"
            value={formData.bathrooms}
            onChangeText={t => setFormData({...formData, bathrooms: t})}
          />
        </View>
        <View style={styles.specInputCol}>
          <Text style={styles.label}>Vagas</Text>
          <TextInput 
            style={styles.inputSmall}
            placeholder="0"
            keyboardType="numeric"
            value={formData.parking}
            onChangeText={t => setFormData({...formData, parking: t})}
          />
        </View>
      </View>
      <View style={{ height: 20 }} />
    </ScrollView>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.sectionTitle}>Localização</Text>
      
      <Text style={styles.label}>Endereço *</Text>
      <TextInput 
        style={styles.input}
        placeholder="Rua, número"
        value={formData.address}
        onChangeText={t => setFormData({...formData, address: t})}
      />

      <Text style={styles.label}>Cidade *</Text>
      <TextInput 
        style={styles.input}
        placeholder="Ex: São Paulo"
        value={formData.city}
        onChangeText={t => setFormData({...formData, city: t})}
      />

      <Text style={styles.label}>Estado *</Text>
      <TextInput 
        style={styles.input}
        placeholder="Ex: SP"
        maxLength={2}
        autoCapitalize="characters"
        value={formData.state}
        onChangeText={t => setFormData({...formData, state: t})}
      />
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.sectionTitle}>Fotos do Imóvel</Text>
      <Text style={styles.subtitle}>Adicione até 5 fotos do imóvel</Text>

      <View style={styles.photosRow}>
        {formData.photos.map((uri, idx) => (
          <View key={idx} style={styles.photoWrapper}>
            <Image source={uri} style={styles.photo} />
            {idx === 0 && (
              <View style={styles.principalBadge}>
                <Text style={styles.principalText}>Principal</Text>
              </View>
            )}
            <TouchableOpacity 
              style={styles.removePhoto}
              onPress={() => setFormData({...formData, photos: formData.photos.filter((_, i) => i !== idx)})}
            >
              <Feather name="x" size={14} color="#FFF" />
            </TouchableOpacity>
          </View>
        ))}
        {formData.photos.length < 5 && (
          <TouchableOpacity style={styles.addPhotoBtn}>
            <MaterialCommunityIcons name="camera-outline" size={32} color="#CBD5E1" />
            <Text style={styles.addPhotoText}>Adicionar</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity onPress={addExamplePhotos} style={styles.exampleBtn}>
        <Text style={styles.exampleBtnText}>Toque para adicionar fotos de exemplo</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep4 = () => (
    <ScrollView style={styles.stepContainer}>
      <Text style={styles.sectionTitle}>Descrição e Características</Text>
      
      <Text style={styles.label}>Descrição do Imóvel</Text>
      <TextInput 
        style={[styles.input, styles.textArea]}
        placeholder="Descreva o imóvel, destacando seus diferenciais..."
        multiline
        numberOfLines={4}
        value={formData.description}
        onChangeText={t => setFormData({...formData, description: t})}
      />

      <Text style={styles.label}>Características</Text>
      <View style={styles.featuresList}>
        {FEATURES.map((feature) => (
          <TouchableOpacity 
            key={feature}
            style={[styles.featureChip, formData.selectedFeatures.includes(feature) && styles.featureChipActive]}
            onPress={() => toggleFeature(feature)}
          >
            <Text style={[styles.featureText, formData.selectedFeatures.includes(feature) && styles.featureTextActive]}>
              {feature}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => step > 1 ? setStep(s => s - 1) : router.replace('/(tabs)')}>
            <Feather name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Cadastrar Imóvel</Text>
            <Text style={styles.headerStep}>Passo {step} de 4</Text>
          </View>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.progressRow}>
          {[1, 2, 3, 4].map(s => (
            <View 
              key={s} 
              style={[
                styles.progressSegment, 
                s <= step && styles.progressSegmentActive
              ]} 
            />
          ))}
        </View>

        <View style={styles.content}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.mainBtn} 
            onPress={() => step < 4 ? setStep(s => s + 1) : handlePublish()}
          >
            <Text style={styles.mainBtnText}>
              {step === 4 ? 'Publicar Imóvel' : 'Continuar'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
  },
  headerStep: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
  },
  progressRow: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 8,
    marginBottom: 20,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#F1F5F9',
  },
  progressSegmentActive: {
    backgroundColor: '#0A73D9',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
    marginTop: 10,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 4,
    marginBottom: 24,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  toggleBtnActive: {
    backgroundColor: '#0A73D9',
  },
  toggleBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
  },
  toggleBtnTextActive: {
    color: '#FFF',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  gridItem: {
    width: (width - 56) / 2,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    alignItems: 'flex-start',
    gap: 8,
  },
  gridItemActive: {
    borderColor: '#0A73D9',
    backgroundColor: '#F0F9FF',
  },
  gridText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
  },
  gridTextActive: {
    color: '#0A73D9',
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: '#0F172A',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  inputWithIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 4,
  },
  iconPrefix: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  inputWithIcon: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 15,
    color: '#0F172A',
  },
  helpText: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 16,
  },
  inputSmall: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    textAlign: 'center',
  },
  specsRowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  specInputCol: {
    flex: 1,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
  },
  photosRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  photoWrapper: {
    width: (width - 64) / 3,
    height: (width - 64) / 3,
    borderRadius: 16,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  principalBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0A73D9',
    paddingVertical: 2,
    alignItems: 'center',
  },
  principalText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  removePhoto: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    padding: 2,
  },
  addPhotoBtn: {
    width: (width - 64) / 3,
    height: (width - 64) / 3,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  addPhotoText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  exampleBtn: {
    marginTop: 20,
    alignSelf: 'center',
  },
  exampleBtnText: {
    fontSize: 13,
    color: '#64748B',
    textDecorationLine: 'underline',
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingBottom: 20,
  },
  featureChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  featureChipActive: {
    backgroundColor: '#0A73D9',
  },
  featureText: {
    fontSize: 14,
    color: '#475569',
  },
  featureTextActive: {
    color: '#FFF',
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: '#FFF',
  },
  mainBtn: {
    backgroundColor: '#0A73D9',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#0A73D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  mainBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
