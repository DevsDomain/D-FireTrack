import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  useMapEvents,
  useMap,
  ImageOverlay,
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
  const [satelliteImage, setSatelliteImage] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchSatelliteImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/search?collection=S2-16D-2&bbox=-54.0,-25.0,-44.0,-19.0&datetime=2023-01-01/2023-12-31&limit=10`
        );
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          const thumbnails = data.features.map((feature: any) => feature.assets.thumbnail.href);
          setSatelliteImage(thumbnails[0]);
        }
      } catch (error) {
        console.error('Erro ao buscar imagem de satélite:', error);
      }
    };

    fetchSatelliteImage();
}, [selectedDates]);

  return (
    <MapContainer center={[-23.55052, -46.633308]} zoom={10} style={{ width: '100vw', height: '100vh' }}>
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

      {satelliteImage && (
        <ImageOverlay
          url={satelliteImage}
          bounds={[
            [-23.65, -46.75], 
            [-23.45, -46.55], 
          ]}
          opacity={0.7}
        />
      )}

      <Marker position={[-23.55052, -46.633308]} icon={markerIcon}>
        <Popup>São Paulo</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;