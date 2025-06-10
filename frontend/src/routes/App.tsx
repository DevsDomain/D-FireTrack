import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopMenu from "../components/TopMenu";
import Home from "../pages/Home";
import "../styles/global.css";
import Gallery, { ImageItem } from "../components/Gallery";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";
import ProcessingOverlay from "../components/Processing/ProcessingOverlay";
import { ClassifiedImagesProvider } from "../contexts/ClassifiedImagesContext";
import { ClassifiedDBImage } from "../components/Map";

const App: React.FC = () => {
  const [bbox, setBbox] = useState<string>("-60.1,-3.2,-48.4,-1.4"); // Inicializa com algum valor padrão
  const [datetime, setDatetime] = useState<string>("2024-03-01/2024-12-31");
  const [processing, setProcessing] = useState(false); //fd
  const [percentage, setPercentage] = useState<number>(0); //fd
  const [selectedOccurrence, setSelectedOccurrence] =
    useState<ClassifiedDBImage | null>(null);

  const handleSelect = async (selectedImages: ImageItem[]) => {
    console.log("🖼️ Imagens selecionadas:", selectedImages);

    try {
      setProcessing(true); // Inicia o processamento
      setPercentage(0); // Reseta a porcentagem
      const response = await axios.post("http://localhost:3010/api/search", {
        images: selectedImages.map((img) => ({
          id: img.id,
          datetime: img.datetime,
          geometry: img.geometry,
        })),
      });

      console.log("✅ Enviado com sucesso:", response.data);
      setProcessing(false); // fd
      setPercentage(100); // fd
      alert("Imagens baixadas com sucesso! Processamento iniciado.");
    } catch (error) {
      console.error("❌ Erro ao enviar imagens:", error);
      setProcessing(false); // fd
      setPercentage(0); // fd
      alert("Erro ao processar as imagens selecionadas. Tente novamente.");
    }
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
    <ClassifiedImagesProvider>
      <Router>
        <div className="app-container">
          <TopMenu />
          <div className="content">
            <Sidebar
              onDateChange={handleDateChange}
              onRegionChange={handleRegionChange}
              onSelectImage={(occ) => {
                console.log("🟢 Ocorrência selecionada no App:", occ);
                setSelectedOccurrence(occ);
              }}
            />
            <div className="main-content">
              <Routes>
                <Route
                  path="/"
                  element={<Home selectedOccurrence={selectedOccurrence} />}
                />
                <Route
                  path="/home"
                  element={<Home selectedOccurrence={selectedOccurrence} />}
                />
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
        {processing && (
          <ProcessingOverlay message="Processando imagens selecionadas..." />
        )}
      </Router>
    </ClassifiedImagesProvider>
  );
};

export default App;
