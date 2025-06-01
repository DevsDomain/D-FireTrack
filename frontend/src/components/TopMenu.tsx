import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const TopMenu = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleBlock}>
        <Text style={styles.logo}>🛰️ Mobile Scars</Text>

        <Text style={styles.subTitle}>
          Visualizador de{'\n'}Cicatrizes de Queimadas
        </Text>
      </View>

      <View style={styles.searchBox}>
        <TextInput
          placeholder="Buscar..."
          placeholderTextColor="#a78bfa"
          style={styles.input}
        />
        <Ionicons name="search" size={screenWidth * 0.045} color="#a78bfa" style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 140,
    backgroundColor: '#5555DD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
  },
  titleBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: screenWidth * 0.05,
    marginBottom: 8,
    marginLeft: 30,
  },
  subTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: screenWidth * 0.035,
    textAlign: 'center',
    lineHeight: screenWidth * 0.045,
    marginLeft: 0
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: screenWidth * 0.02,
    paddingHorizontal: screenWidth * 0.02,
    height: screenHeight * 0.045,
  },
  input: {
    fontSize: screenWidth * 0.035,
    color: '#333',
    width: screenWidth * 0.25,
    padding: 0,
    marginRight: screenWidth * 0.01,
  },
  icon: {
    marginLeft: screenWidth * 0.01,
  },
});

export default TopMenu;