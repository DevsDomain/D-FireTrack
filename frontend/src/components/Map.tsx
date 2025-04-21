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

interface SatelliteImage {
  url: string;
  bounds: [[number, number], [number, number]];
}

const Map: React.FC<MapProps> = ({ selectedDates, onMouseMove, onBoundsChange }) => {
  const [satelliteImage, setSatelliteImage] = useState<SatelliteImage | null>(null);

  const markerIcon = new L.Icon({
    iconUrl: require('../assets/images.png'),
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
          `http://localhost:3000/search?collection=S2-16D-2&bbox=-46.0,-23.5,-45.5,-22.8&datetime=2023-01-01/2023-12-31&limit=10`
        );
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const firstFeature = data.features[0];
          const thumbnail = firstFeature.assets?.thumbnail?.href;
          const bbox = firstFeature.bbox;

          if (thumbnail && bbox) {
            setSatelliteImage({
              url: thumbnail,
              bounds: [
                [bbox[1], bbox[0]],
                [bbox[3], bbox[2]],
              ],
            });
          } else {
            console.warn("Dados incompletos na resposta da API:", firstFeature);
          }
        } else {
          console.warn("Nenhuma feature encontrada na resposta da API.");
        }
      } catch (error) {
        console.error("Erro ao buscar imagem de satélite:", error);
      }
    };

    fetchSatelliteImage();
  }, [selectedDates]);

  return (
    <MapContainer center={[-23.1896, -45.8841]} zoom={10} style={{ width: '100vw', height: '100vh' }}>
      <MouseTracker />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <LayersControl position="topright">
        <LayersControl.Overlay checked name="Cbers 4">
          <WMSTileLayer
            url="https://data.inpe.br/bdc/geoserver/mosaics/ows?"
            layers="mosaic-cbers4-brazil-3m"
            format="image/png"
            transparent
            opacity={0.6}
          />
        </LayersControl.Overlay>

      </LayersControl>

      {satelliteImage && (
        <ImageOverlay
          url={satelliteImage.url}
          bounds={satelliteImage.bounds}
          opacity={0.85}
        />
      )}

      <Marker position={[-23.1896, -45.8841]} icon={markerIcon}>
        <Popup>São José dos Campos</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;