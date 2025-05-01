import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopMenu from "../components/TopMenu";
import Home from "../pages/Home";
import "../styles/global.css";
import Gallery from "../components/Gallery";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";

const App: React.FC = () => {
  const [bbox, setBbox] = useState<string>("-60.1,-3.2,-48.4,-1.4"); // Inicializa com algum valor padrão
  const [datetime, setDatetime] = useState<string>("2024-03-01/2024-12-31");

  const handleSelect = async (selectedIds: string[]) => {
    console.log("🖼️ Imagens selecionadas:", selectedIds);
    const response = await axios.post("http://localhost:3010/api/search", {
      imagesId: selectedIds,
    });
    console.log(response);
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    if (dates[0] && dates[1]) {
      const start = dates[0].toISOString().split("T")[0];
      const end = dates[1].toISOString().split("T")[0];
      setDatetime(`${start}/${end}`);
    }
  };

  const handleRegionChange = (latitude: string, longitude: string) => {
    // Aqui vamos criar uma bounding box de exemplo baseada na latitude e longitude
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const delta = 0.5; // Exemplo: meio grau para cima/baixo/direita/esquerda
    const bboxString = `${lon - delta},${lat - delta},${lon + delta},${
      lat + delta
    }`;
    setBbox(bboxString);
  };

  return (
    <Router>
      <div className="app-container">
        <TopMenu />
        <div className="content">
          <Sidebar
            onDateChange={handleDateChange}
            onRegionChange={handleRegionChange}
          />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/gallery"
                element={
                  <Gallery
                    collection="CB4-WFI-L4-SR-1"
                    bbox={bbox}
                    datetime={datetime}
                    onSelect={handleSelect}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
