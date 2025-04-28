import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './../src/components/Sidebar/Sidebar';
import TopMenu from './components/TopMenu';
import Home from './pages/Home';


import './styles/global.css'; // Arquivo de estilos

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
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;