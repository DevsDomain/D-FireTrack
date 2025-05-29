import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const TopMenu = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🛰️ Mobile Scars</Text>

      <View style={styles.titleBox}>
        <View style={styles.dot} />
        <Text style={styles.title}>Visualizador de{'\n'}Cicatrizes de Queimadas</Text>
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
      height: 120, // aumente para a altura desejada
      backgroundColor: '#5555DD',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingTop: Platform.OS === 'ios' ? 40 : 20,
    },
  logo: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: screenWidth * 0.04,
  },
  titleBox: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    marginHorizontal: screenWidth * 0.02,
  },
  dot: {
    width: screenWidth * 0.015,
    height: screenWidth * 0.015,
    backgroundColor: '#091794',
    borderRadius: screenWidth * 0.015,
    marginRight: 1,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: screenWidth * 0.035,
    textAlign: 'left',
    lineHeight: screenWidth * 0.045,
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