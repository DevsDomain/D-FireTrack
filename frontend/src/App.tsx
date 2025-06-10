import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import TopMenu from "./components/TopMenu";
import Home from "./pages/Home";
import Gallery from "./components/Gallery";
import "./styles/global.css";

const App: React.FC = () => {
  const [bbox, setBbox] = useState<string>("-60.1,-3.2,-48.4,-1.4");
  const [datetime, setDatetime] = useState<string>("2024-03-01/2024-12-31");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    if (dates[0] && dates[1]) {
      const start = dates[0].toISOString().split("T")[0];
      const end = dates[1].toISOString().split("T")[0];
      setDatetime(`${start}/${end}`);
    }
  };

  const handleRegionChange = (latitude: string, longitude: string) => {
    setLat(latitude);
    setLng(longitude);
    const delta = 0.5;
    const latNum = parseFloat(latitude);
    const lngNum = parseFloat(longitude);
    const bboxString = `${lngNum - delta},${latNum - delta},${lngNum + delta},${latNum + delta}`;
    setBbox(bboxString);
  };

  const handleRectangleDrawn = (bbox: {
    north: number;
    south: number;
    east: number;
    west: number;
  }) => {
    const centerLat = ((bbox.north + bbox.south) / 2).toFixed(6);
    const centerLng = ((bbox.east + bbox.west) / 2).toFixed(6);
    handleRegionChange(centerLat, centerLng);
  };

  return (
    <Router>
      <div className="app-container">
        <TopMenu />
        <div className="content">
          <Sidebar
            onDateChange={handleDateChange}
            onRegionChange={handleRegionChange}
            externalLat={lat}
            externalLng={lng}
          />
          <div className="main-content">
            <Routes>
              <Route path="/home" element={<Home onRectangleDrawn={handleRectangleDrawn} />} />
              <Route path="/gallery" element={<Gallery collection="CB4-WFI-L4-SR-1" bbox={bbox} datetime={datetime} onSelect={() => {}} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
