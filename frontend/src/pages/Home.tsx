import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Map from '../components/Map';
import TopMenu from '../components/TopMenu';

interface HomeProps {
  selectedDates: [Date | null, Date | null];
  region: { lat: string; lng: string };
}

const Home: React.FC<HomeProps> = ({ selectedDates, region }) => {
  const [mousePosition, setMousePosition] = useState<{ lat: number; lng: number } | null>(null);

  return (
    <View style={styles.pageContainer}>
      {/* TopMenu pode ficar aqui ou no App */}
      <View style={styles.mapContainer}>
        {mousePosition && (
          <View style={styles.positionBox}>
            <Text>
              <Text style={styles.label}>Latitude:</Text> {mousePosition.lat.toFixed(5)}
            </Text>
            <Text>
              <Text style={styles.label}>Longitude:</Text> {mousePosition.lng.toFixed(5)}
            </Text>
          </View>
        )}
        <Map selectedDates={selectedDates} onMouseMove={setMousePosition} />
        {/* Aqui você pode usar a prop region se precisar */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: { flex: 1, backgroundColor: '#fff' },
  mapContainer: { flex: 1 },
  positionBox: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20,
    right: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    zIndex: 1000,
  },
  label: { fontWeight: 'bold' },
});

export default Home;