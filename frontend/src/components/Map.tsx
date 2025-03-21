import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { WMSTileLayer } from 'react-leaflet';  // Importar WMS corretamente

interface MapProps {
  selectedDates: [Date | null, Date | null];
}

const Map: React.FC<MapProps> = ({ selectedDates }) => {
  const [sensorImages, setSensorImages] = useState<string[]>([]);

  // Ícone do marcador personalizado
  const markerIcon = new L.Icon({
    iconUrl: require('../assets/images.jpeg'),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // Atualiza as imagens do sensor WFI com base no intervalo de datas
  useEffect(() => {
    if (selectedDates[0] && selectedDates[1]) {
      const startDate = selectedDates[0].toISOString().split('T')[0];
      const endDate = selectedDates[1].toISOString().split('T')[0];

      // Caminho relativo ao public/ (evitando require)
      const images = [
        `/assets/sensor_wfi_${startDate}.jpg`,
        `/assets/sensor_wfi_${endDate}.jpg`,
      ];
      setSensorImages(images);
    }
  }, [selectedDates]);

  return (
    <MapContainer center={[0, -50]} zoom={2} style={{ width: '100vw', height: '100vh' }}>
      {/* Camada base */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <LayersControl position="topright">
        {/* Camada de satélite Amazônia */}
        <LayersControl.Overlay checked name="Satélite Amazônia (INPE)">
          <WMSTileLayer
            url="https://geoftp.inpe.br/geoserver/amazonia/wms?"
            layers="satellite_amazonia"  // Troque pelo nome correto da camada
            format="image/png"
            transparent={true}
            opacity={0.6}
          />
        </LayersControl.Overlay>

        {/* Camada de satélite Cybers 4 */}
        <LayersControl.Overlay name="Satélite Cybers 4">
          <WMSTileLayer
            url="https://cybers4.example.com/wms?"  // Substitua pela URL correta
            layers="cybers4"  // Troque pelo nome correto da camada
            format="image/png"
            transparent={true}
            opacity={0.5}
          />
        </LayersControl.Overlay>

        {/* Camada de satélite Cybers 4A */}
        <LayersControl.Overlay name="Satélite Cybers 4A">
          <WMSTileLayer
            url="https://cybers4a.example.com/wms?"  // Substitua pela URL correta
            layers="cybers4a"  // Troque pelo nome correto da camada
            format="image/png"
            transparent={true}
            opacity={0.5}
          />
        </LayersControl.Overlay>
      </LayersControl>

      <Marker position={[-23.55052, -46.633308]} icon={markerIcon}>
        <Popup>São Paulo</Popup>
      </Marker>

      {/* Exibir imagens do sensor WFI */}

      <div
        style={{
          top: 0,
          right: 5,
          background: 'transparent',
          padding: 1,
          color: '#070707',         // Cor da letra branca
        }}
      >
      </div>

    </MapContainer>
  );
};

export default Map;