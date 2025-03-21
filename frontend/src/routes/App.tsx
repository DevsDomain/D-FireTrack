import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopMenu from '../components/TopMenu';
import Home from '../pages/Home';
import Ocorrencias from '../pages/Ocorrencias';
import Schedule from '../pages/Schedule'; // Agora importa o Schedule
import '../styles/global.css'; // Arquivo de estilos

const App: React.FC = () => {
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
              <Route path="/schedule" element={<Schedule />} /> {/* Agora a rota de Schedule está correta */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;