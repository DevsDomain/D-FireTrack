import React from 'react';
import { Link } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import '../styles/Ocorrencias.css'; 

const Ocorrencias: React.FC = () => {
  return (
    <div className="container">
      <h2 className="title">Ocorrências</h2>

      {/* Lista de Cards */}
      <div className="card-list">
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className="card">
            <h4 style={{ marginBottom: '5px' }}>Ocorrência {index + 1}</h4>
            <p style={{ margin: '2px 0', lineHeight: '1.2' }}>Cidade-Estado</p>
            <p style={{ margin: '2px 0', lineHeight: '1.6' }}>Pesquisa será exibida aqui</p>
            <button className="download-button">
              <DownloadIcon style={{ marginRight: '5px' }} />
              Download
            </button>
          </div>
        ))}

      </div>

      {/* Link de Voltar */}
      <Link to="/home" className="back-link">
        Voltar para Home
      </Link>
    </div >
  );
};

export default Ocorrencias;