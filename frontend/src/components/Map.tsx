// src/components/Map.tsx
import React, { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  useMapEvents,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { WMSTileLayer } from 'react-leaflet';

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
  const markerIcon = new L.Icon({
    iconUrl: require('../assets/images.jpeg'),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const MouseTracker = () => {
    const map = useMap();

    useMapEvents({
      mousemove(e) {
        onMouseMove?.({ lat: e.latlng.lat, lng: e.latlng.lng });

        const bounds = map.getBounds();
        onBoundsChange?.({
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          west: bounds.getWest(),
        });
      },
    });

    return null;
  };

  return (
    <MapContainer center={[0, -50]} zoom={2} style={{ width: '100vw', height: '100vh' }}>
      <MouseTracker />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <LayersControl position="topright">
        <LayersControl.Overlay checked name="Satélite Amazônia (INPE)">
          <WMSTileLayer
            url="https://geoftp.inpe.br/geoserver/amazonia/wms?"
            layers="satellite_amazonia"
            format="image/png"
            transparent
            opacity={0.6}
          />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Satélite Cybers 4">
          <WMSTileLayer
            url="https://cybers4.example.com/wms?"
            layers="cybers4"
            format="image/png"
            transparent
            opacity={0.5}
          />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Satélite Cybers 4A">
          <WMSTileLayer
            url="https://cybers4a.example.com/wms?"
            layers="cybers4a"
            format="image/png"
            transparent
            opacity={0.5}
          />
        </LayersControl.Overlay>
      </LayersControl>

      <Marker position={[-23.55052, -46.633308]} icon={markerIcon}>
        <Popup>São Paulo</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;