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
  FeatureGroup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { WMSTileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";

interface MapProps {
  selectedDates: [Date | null, Date | null];
  onMouseMove?: (pos: { lat: number; lng: number }) => void;
  onBoundsChange?: (bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  }) => void;
  selectedOccurrence?: ClassifiedDBImage | null;
  onRectangleDrawn: (bbox: {
    north: number;
    south: number;
    east: number;
    west: number;
  }) => void;

}

export interface ClassifiedDBImage {
  _id: string;
  image: string;
  xcoord: string;
  ycoord: string;
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

interface OverlayData {
  bounds: L.LatLngBoundsExpression;
  imageUrl: string;
  polygonCoords: [number, number][];
  occurrenceDate: string;
  occurrenceCoords: { x: string; y: string };
}

const FitBounds: React.FC<{ polygons: ClassifiedDBImage[] }> = ({ polygons }) => {
  const map = useMap();

  useEffect(() => {
    if (polygons.length > 0) {
      const allCoords = polygons.flatMap((img) =>
        img.geometry.coordinates[0].map(([lng, lat]) => [lat, lng] as [number, number])
      );
      const bounds = L.latLngBounds(allCoords);
      map.fitBounds(bounds);
    }
  }, [polygons, map]);

  return null;
};



const CenterMapOnOccurrence: React.FC<{
  occurrence: ClassifiedDBImage | null;
}> = ({ occurrence }) => {
  const map = useMap();

  useEffect(() => {
    if (!occurrence) return;

    console.log("🔍 Centralizando no polígono da ocorrência:", occurrence._id);

    const coords = occurrence.geometry.coordinates[0].map(
      ([lng, lat]) => [lat, lng] as [number, number]
    );
    const bounds = L.latLngBounds(coords);
    map.fitBounds(bounds);
  }, [occurrence, map]);

  return null;
};

const Map: React.FC<MapProps> = ({
  selectedDates,
  onMouseMove,
  onBoundsChange,
  onRectangleDrawn,
  selectedOccurrence,
}) => {
  const [satelliteImage, setSatelliteImage] = useState<SatelliteImage | null>(null);
  const [classifiedImages, setClassifiedImages] = useState<ClassifiedDBImage[]>([]);
  const [overlayData, setOverlayData] = useState<OverlayData | null>(null);

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
  useEffect(() => {
    const fetchClassifiedImages = async () => {
      try {
        const response = await fetch("http://localhost:3010/api/list");
        const data = await response.json();

        const parsed = data.map((occ: ClassifiedDBImage) => ({
          ...occ,
          image: occ.image.split("/").pop() || "",
        }));

        setClassifiedImages(parsed);

        if (!selectedOccurrence && parsed.length > 0) {
          const sortedImages = [...parsed].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          const latestImage = sortedImages[0];
          const coords = latestImage.geometry.coordinates[0].map(
            (pair: [number, number]) => {
              const [lng, lat] = pair;
              return [lat, lng] as [number, number];
            }
          );

          const lngs = latestImage.geometry.coordinates[0].map(
            (pair: [number, number]) => pair[0]
          );
          const lats = latestImage.geometry.coordinates[0].map(
            (pair: [number, number]) => pair[1]
          );

          const bounds: [[number, number], [number, number]] = [
            [Math.min(...lats), Math.min(...lngs)],
            [Math.max(...lats), Math.max(...lngs)],
          ];

          setOverlayData({
            bounds,
            imageUrl: `http://localhost:3333/classified-images/${latestImage.image}`,
            polygonCoords: coords,
            occurrenceDate: latestImage.date,
            occurrenceCoords: { x: latestImage.xcoord, y: latestImage.ycoord },
          });
        }
      } catch (error) {
        console.error("Erro ao buscar imagens classificadas:", error);
      }
    };

    fetchClassifiedImages();
  }, [selectedOccurrence]);

  useEffect(() => {
    if (selectedOccurrence) {
      console.log("📥 selectedOccurrence recebida em <Map>:", selectedOccurrence);

      const geometry = selectedOccurrence.geometry;

      if (geometry && geometry.coordinates) {
        const coords = geometry.coordinates[0].map(
          ([lng, lat]) => [lat, lng] as [number, number]
        );

        const lngs = geometry.coordinates[0].map(([lng]) => lng);
        const lats = geometry.coordinates[0].map(([, lat]) => lat);

        const bounds: [[number, number], [number, number]] = [
          [Math.min(...lats), Math.min(...lngs)],
          [Math.max(...lats), Math.max(...lngs)],
        ];

        setOverlayData({
          bounds,
          imageUrl: `http://localhost:3333/classified-images/${selectedOccurrence.image}`,
          polygonCoords: coords,
          occurrenceDate: selectedOccurrence.date,
          occurrenceCoords: {
            x: selectedOccurrence.xcoord,
            y: selectedOccurrence.ycoord,
          },
        });
      }
    } else {
      setOverlayData(null);
    }
  }, [selectedOccurrence]);

  const markerIcon = new L.Icon({
    iconUrl: require("../assets/images.png"),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

 /*  const MouseTracker = () => {
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
 */
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
{/*       <MouseTracker />
 */}      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

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

      {overlayData && (
        <React.Fragment key={overlayData.imageUrl}>
          <Polygon positions={overlayData.polygonCoords} color="red">
            <Popup>
              <div>
                <strong>Data:</strong> {overlayData.occurrenceDate} <br />
                <strong>Coords:</strong> ({overlayData.occurrenceCoords.x},{" "}
                {overlayData.occurrenceCoords.y}) <br />
                <img
                  src={overlayData.imageUrl}
                  alt="Classificada"
                  style={{ width: "100px", height: "auto" }}
                />
              </div>
            </Popup>
          </Polygon>
          <ImageOverlay
            url={overlayData.imageUrl}
            bounds={overlayData.bounds}
            opacity={0.5}
          />
        </React.Fragment>
      )}

      {selectedOccurrence && (
        <CenterMapOnOccurrence occurrence={selectedOccurrence} />
      )}

      <Marker position={[-23.1896, -45.8841]} icon={markerIcon}>
        <Popup>São José dos Campos</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
