// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopMenu from "../components/TopMenu";
import Home from "../pages/Home";
import Ocorrencias from "../pages/Ocorrencias";
import Schedule from "../pages/Schedule";
import "../styles/global.css";
import Gallery from "../components/Gallery";

const App: React.FC = () => {
  const mockParams = {
    collection: "CB4-WFI-L4-SR-1",
    bbox: "-47.9,-21.3,-47.5,-20.9",
    datetime: "2024-03-01/2024-08-31",
  };

  const handleSelect = (selectedIds: string[]) => {
    console.log("🖼️ Imagens selecionadas:", selectedIds);
    // você pode navegar ou armazenar para download depois
  };

  return (
    <Router>
      <div className="app-container">
        <TopMenu />
        <div className="content">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/ocorrencias" element={<Ocorrencias />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route
                path="/gallery"
                element={<Gallery {...mockParams} onSelect={handleSelect} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
