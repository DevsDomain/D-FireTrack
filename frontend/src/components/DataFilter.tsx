// src/components/DateFilter.tsx
import React, { useState, useEffect } from 'react';
import '../styles/DataFilter.css';

interface DateFilterProps {
  onDateChange: (dates: [Date | null, Date | null]) => void;
  mousePosition?: { lat: number; lng: number } | null;
}

const DateFilter: React.FC<DateFilterProps> = ({ onDateChange, mousePosition }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [sensorImages, setSensorImages] = useState<string[]>([]);

  const handleDateChange = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      onDateChange([start, end]);

      const images = [
        `/assets/sensor_wfi_${start.toISOString().split('T')[0]}.jpg`,
        `/assets/sensor_wfi_${end.toISOString().split('T')[0]}.jpg`,
      ];
      setSensorImages(images);
    }
  };

  useEffect(() => {
    handleDateChange();
  }, [startDate, endDate]);

  return (
    <div className="date-filter-container">
      <h2 className="filter-title">Filtrar por Data</h2>

      <div className="date-inputs">
        <div className="input-container">
          <label className="input-label">Data Início</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="date-input"
          />
        </div>
        <div className="input-container">
          <label className="input-label">Data Fim</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="date-input"
          />
        </div>
      </div>

      {mousePosition && (
        <div className="coord-display">
          <p><strong>Latitude:</strong> {mousePosition.lat.toFixed(5)}</p>
          <p><strong>Longitude:</strong> {mousePosition.lng.toFixed(5)}</p>
        </div>
      )}

      <div className="image-container">
        <h3 className="image-title">Imagens do Sensor WFI</h3>
        {sensorImages.length > 0 ? (
          sensorImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Sensor ${index}`}
              className="sensor-image"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          ))
        ) : (
          <p className="no-image-text">Nenhuma imagem disponível para o intervalo selecionado.</p>
        )}
      </div>
    </div>
  );
};

export default DateFilter;