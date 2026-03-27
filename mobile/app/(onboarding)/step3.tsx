import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get("window");

export default function OnboardingThree() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source="https://images.unsplash.com/photo-1554232456-8727aae0cfa4?q=80&w=1000&auto=format&fit=crop"
            style={styles.image}
            contentFit="cover"
          />
        </View>
        
        <View style={styles.textSection}>
          <Text style={styles.title}>Segurança e transparência total</Text>
          <Text style={styles.description}>
            Processos claros e seguros para que você tenha tranquilidade ao realizar o maior investimento da sua vida.
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.pagination}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
          </View>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.replace('/(auth)')}
          >
            <Text style={styles.buttonText}>Começar</Text>
            <Feather name="check" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  imageContainer: {
    height: width,
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textSection: {
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 16,
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
    marginRight: 8,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#0A73D9',
  },
  button: {
    backgroundColor: '#0A73D9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});
