import React from "react";
import Map from "../components/Map";

interface HomeProps {
  onRectangleDrawn: (bbox: {
    north: number;
    south: number;
    east: number;
    west: number;
  }) => void;
}

const Home: React.FC<HomeProps> = ({ onRectangleDrawn }) => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map selectedDates={[null, null]} onRectangleDrawn={onRectangleDrawn} />
    </div>
  );
};

export default Home;
