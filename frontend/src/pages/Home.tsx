// Home.tsx
import React, { useState } from "react";
import Map, { ClassifiedDBImage } from "../components/Map";

interface HomeProps {
  selectedOccurrence: ClassifiedDBImage | null;
  onRectangleDrawn: (bbox: {
    north: number;
    south: number;
    east: number;
    west: number;
  }) => void;
}

const Home: React.FC<HomeProps> = ({ selectedOccurrence,onRectangleDrawn }) => {
  const [selectedDates, setSelectedDates] = useState<
    [Date | null, Date | null]
  >([null, null]);
  const [mousePosition, setMousePosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  return (
    <div
      className="page-container"
      style={{ position: "relative", height: "100vh", width: "100%" }}
    >
      {mousePosition && (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "8px 12px",
            borderRadius: "8px",
            fontSize: "14px",
            boxShadow: "0px 0px 6px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          <div>
            <strong>Latitude:</strong> {mousePosition.lat.toFixed(5)}
          </div>
          <div>
            <strong>Longitude:</strong> {mousePosition.lng.toFixed(5)}
          </div>
        </div>
      )}

      <Map
        selectedDates={selectedDates}
        onMouseMove={setMousePosition}
        selectedOccurrence={selectedOccurrence}
        onRectangleDrawn={onRectangleDrawn}
      />
    </div>
  );
};

export default Home;
