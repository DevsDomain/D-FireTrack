import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  selectedDates: [Date | null, Date | null];
  onRectangleDrawn: (bbox: {
    north: number;
    south: number;
    east: number;
    west: number;
  }) => void;
}

const Map: React.FC<MapProps> = ({ onRectangleDrawn }) => {
  const position: [number, number] = [-23.1896, -45.8841];

  const handleDraw = (e: any) => {
    const layer = e.layer;
    if (layer instanceof L.Rectangle) {
      const bounds = layer.getBounds();
      onRectangleDrawn({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest(),
      });
    }
  };

  return (
    <MapContainer
      center={position}
      zoom={10}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={position}>
        <Popup>São José dos Campos</Popup>
      </Marker>

      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={handleDraw}
          draw={{
            rectangle: true,
            polygon: false,
            polyline: false,
            circle: false,
            marker: false,
            circlemarker: false,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};

export default Map;
