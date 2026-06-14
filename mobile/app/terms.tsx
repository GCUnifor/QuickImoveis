import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TermsScreen() {
  const router = useRouter();

  const sections = [
    {
      icon: 'shield',
      title: '1. Aceitação dos Termos',
      content: 'Ao acessar e utilizar o aplicativo QuickImóveis, você concorda expressamente em cumprir e estar vinculado a estes Termos e Condições de Uso. Caso não concorde com qualquer parte destes termos, você não deve utilizar nossa plataforma.'
    },
    {
      icon: 'user-check',
      title: '2. Cadastro e Perfis de Usuário',
      content: 'A plataforma oferece dois perfis principais:\n• Comprador: Pode buscar imóveis, realizar simulações e favoritar anúncios.\n• Corretor: Responsável pelo cadastro de imóveis, upload de fotos e fornecimento de contatos.\n\nVocê se compromete a fornecer informações verdadeiras e atualizadas no momento do cadastro.'
    },
    {
      icon: 'home',
      title: '3. Publicação de Anúncios (Corretores)',
      content: 'Ao anunciar um imóvel no QuickImóveis, o Corretor garante que:\n• Possui autorização legal para intermediar ou vender o imóvel.\n• As fotos enviadas são reais, atualizadas e livres de direitos autorais de terceiros.\n• Os preços, localização e características declarados são totalmente verídicos. Informações falsas resultarão na suspensão imediata da conta.'
    },
    {
      icon: 'percent',
      title: '4. Simulador Financeiro Caixa',
      content: 'O simulador financeiro disponibilizado na plataforma destina-se a fins puramente informativos e de conveniência. As parcelas calculadas, juros e limites de financiamento são projeções matemáticas estimadas com base na renda e entrada informadas. O QuickImóveis não garante a aprovação de crédito nem se responsabiliza por variações nas taxas oficiais aplicadas pela Caixa Econômica Federal ou qualquer outra instituição financeira.'
    },
    {
      icon: 'message-circle',
      title: '5. Negociação e Contato por WhatsApp',
      content: 'O QuickImóveis atua exclusivamente como uma plataforma de anúncio e recomendação inteligente. Todo o contato de negociação é feito de forma externa via canais diretos (como WhatsApp) entre Comprador e Corretor. Não cobramos taxas sobre transações e não nos responsabilizamos pelo teor das conversas ou acordos financeiros firmados fora do aplicativo.'
    },
    {
      icon: 'lock',
      title: '6. Privacidade e LGPD',
      content: 'Seus dados de navegação, renda informada (para fins de filtro) e informações de cadastro são tratados com estrita confidencialidade. Adotamos as melhores práticas em conformidade com a Lei Geral de Proteção de Dados (LGPD). Seus dados de renda são utilizados unicamente de forma local para fins de simulação e recomendação e nunca são compartilhados ou vendidos.'
    },
    {
      icon: 'alert-triangle',
      title: '7. Modificações nos Termos',
      content: 'O QuickImóveis reserva-se o direito de atualizar ou modificar estes Termos de Uso a qualquer momento, sem aviso prévio. Recomendamos a consulta periódica desta página para manter-se atualizado sobre as regras vigentes da plataforma.'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Termos e Condições</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Banner Card */}
        <View style={styles.bannerCard}>
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons name="file-document-edit-outline" size={40} color="#0A73D9" />
          </View>
          <Text style={styles.bannerTitle}>Regras Gerais de Uso</Text>
          <Text style={styles.bannerSubtitle}>
            Leia com atenção as regras de convivência, anúncios de imóveis e política do simulador inteligente QuickImóveis.
          </Text>
          <Text style={styles.lastUpdate}>Última atualização: 22 de Maio de 2026</Text>
        </View>

        {/* Sections list */}
        {sections.map((section, index) => (
          <View key={index} style={styles.sectionCard}>
            <View style={styles.sectionTitleRow}>
              <View style={styles.sectionIconBox}>
                <Feather name={section.icon as any} size={20} color="#0A73D9" />
              </View>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}

        {/* Acceptance Button */}
        <TouchableOpacity style={styles.acceptBtn} onPress={() => router.back()}>
          <Text style={styles.acceptBtnText}>Entendi e Aceito os Termos</Text>
          <Feather name="check" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
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
  header: {
    backgroundColor: '#0A73D9',
    height: Platform.OS === 'ios' ? 70 : 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 30,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  bannerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  lastUpdate: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0A73D9',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
  },
  sectionContent: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
  },
  acceptBtn: {
    flexDirection: 'row',
    backgroundColor: '#10B981',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  acceptBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
