// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importação correta para o React 18
import App from './routes/App';
import './styles/global.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);