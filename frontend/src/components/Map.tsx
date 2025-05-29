import React, { useState } from "react";
import MapView, {
  Marker,
  UrlTile,
  Overlay,
  MapPressEvent,
  LatLng,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { View, StyleSheet, Platform } from "react-native";

interface MapProps {
  selectedDates: [Date | null, Date | null];
  onMouseMove?: (pos: { lat: number; lng: number }) => void;
  onBoundsChange?: (bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  }) => void;
}

const Map: React.FC<MapProps> = ({ selectedDates, onMouseMove, onBoundsChange }) => {
  const [region, setRegion] = useState({
    latitude: -23.1896,
    longitude: -45.8841,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  });

  const [markerPosition, setMarkerPosition] = useState<LatLng>({
    latitude: -23.1896,
    longitude: -45.8841,
  });

  const handleRegionChangeComplete = (reg: typeof region) => {
    const bounds = {
      north: reg.latitude + reg.latitudeDelta / 2,
      south: reg.latitude - reg.latitudeDelta / 2,
      east: reg.longitude + reg.longitudeDelta / 2,
      west: reg.longitude - reg.longitudeDelta / 2,
    };
    onBoundsChange?.(bounds);
  };

  const handlePress = (e: MapPressEvent) => {
    const coords = e.nativeEvent.coordinate;
    setMarkerPosition(coords);
    onMouseMove?.({ lat: coords.latitude, lng: coords.longitude });
  };

  // Exemplo fixo do bounds da imagem satélite (igual bbox do seu exemplo leaflet)
  // bbox: [-46.0, -23.5, -45.5, -22.8]
  // que equivale a [SW_lat, SW_lng], [NE_lat, NE_lng]
  const satelliteBounds: [[number, number], [number, number]] = [
    [-23.5, -46.0], // SW lat,lng
    [-22.8, -45.5], // NE lat,lng
  ];

  // URL da imagem de satélite - troque pela sua real
  const satelliteImageUrl = "https://your-server.com/path-to-satellite-image.png";

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={region}
        onRegionChangeComplete={handleRegionChangeComplete}
        onPress={handlePress}
      >
        {/* Camada de tiles OpenStreetMap */}
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
        />

        {/* Marker móvel */}
        <Marker coordinate={markerPosition} title="Localização" />

        {/* Overlay da imagem satélite - só funciona no iOS */}
        {Platform.OS === "ios" && (
          <Overlay
            image={{ uri: satelliteImageUrl }}
            bounds={satelliteBounds}
            opacity={0.7}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Map;