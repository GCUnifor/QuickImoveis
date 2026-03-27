import { View, Text, StyleSheet } from 'react-native';

export default function PropertiesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Meus Imóveis</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  text: {
    fontSize: 18,
    color: '#64748B',
  },
});
