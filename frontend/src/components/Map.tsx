import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  useMapEvents,
  useMap,
  ImageOverlay,
  Polygon,
} from "react-leaflet";
import L, { LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import { WMSTileLayer } from "react-leaflet";
import { useClassifiedImages } from "../contexts/ClassifiedImagesContext";

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

interface ClassifiedDBImage {
  _id: string;
  image: string;
  xcoord: number;
  ycoord: number;
  date: string;
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}

interface SatelliteImage {
  url: string;
  bounds: [[number, number], [number, number]];
}

const FitBounds: React.FC<{ polygons: ClassifiedDBImage[] }> = ({
  polygons,
}) => {
  const map = useMap();

  useEffect(() => {
    if (polygons.length > 0) {
      const allCoords = polygons.flatMap((img) =>
        img.geometry.coordinates[0].map(
          ([lng, lat]) => [lat, lng] as [number, number]
        )
      );
      const bounds = L.latLngBounds(allCoords);
      map.fitBounds(bounds);
    }
  }, [polygons, map]);

  return null;
};

const Map: React.FC<MapProps> = ({
  selectedDates,
  onMouseMove,
  onBoundsChange,
}) => {
  const [satelliteImage, setSatelliteImage] = useState<SatelliteImage | null>(
    null
  );
  const [classifiedImages, setClassifiedImages] = useState<ClassifiedDBImage[]>(
    []
  );

  useEffect(() => {
    const fetchClassifiedImages = async () => {
      try {
        const response = await fetch("http://localhost:3010/api/classified");
        const data = await response.json();
        setClassifiedImages(data);
      } catch (error) {
        console.error("Erro ao buscar imagens classificadas:", error);
      }
    };

    fetchClassifiedImages();
  }, []);

  const markerIcon = new L.Icon({
    iconUrl: require("../assets/images.png"),
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
    <MapContainer
      center={[-23.1896, -45.8841]}
      zoom={10}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
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

      {classifiedImages.map((img) => {
        const coords = img.geometry.coordinates[0].map(
          ([lng, lat]) => [lat, lng] as [number, number]
        );

        return (
          <Polygon key={img._id} positions={coords} color="red">
            <Popup>
              <div>
                <strong>Data:</strong> {img.date} <br />
                <strong>Coords:</strong> ({img.xcoord}, {img.ycoord}) <br />
                <img
                  src={`http://localhost:3010/classified-images/${img.image}`}
                  alt="Classificada"
                  style={{ width: "100px", height: "auto" }}
                />
              </div>
            </Popup>
          </Polygon>
        );
      })}

      <FitBounds polygons={classifiedImages} />

      <Marker position={[-23.1896, -45.8841]} icon={markerIcon}>
        <Popup>São José dos Campos</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
