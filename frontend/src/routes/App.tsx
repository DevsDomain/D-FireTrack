// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "../../src/components/Sidebar/Sidebar";
import TopMenu from "../components/TopMenu";
import Home from "../pages/Home";
import "../styles/global.css";
import Gallery from "../components/Gallery";
import axios from "axios";

const App: React.FC = () => {
  const mockParams = {
    collection: "CB4-WFI-L4-SR-1",
    bbox: "-60.1,-3.2,-48.4,-1.4",
    datetime: "2024-03-01/2024-12-31",
  };
  

  const handleSelect = async (selectedIds: string[]) => {
    console.log("🖼️ Imagens selecionadas:", selectedIds);
    const response = await axios.post('http://localhost:3010/api/search', {imagesId:selectedIds});
    console.log(response);
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
