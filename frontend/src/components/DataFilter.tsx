import React, { useState } from 'react';
import '../styles/DataFilter.css';

interface DateFilterProps {
  onDateChange: (dates: [Date | null, Date | null]) => void;
  onRegionChange: (lat: string, lng: string) => void; // Modificado para passar lat e lng separadamente
}

const DateFilter: React.FC<DateFilterProps> = ({
  onDateChange,
  onRegionChange,
}) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');

  const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLatitude(e.target.value);
  };

  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongitude(e.target.value);
  };

  const handleOkClick = () => {
    if (startDate && endDate && latitude && longitude) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      onDateChange([start, end]); // Passa as datas para o Schedule
      onRegionChange(latitude, longitude); // Passa a latitude e longitude separadas
    } else {
      alert('Por favor, preencha todos os campos: data de início, data fim, latitude e longitude.');
    }
  };

  return (
    <div className="date-filter-container">
      <h2 className="filter-title">Filtrar por data e região</h2>

      <div className="input-row">
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

        <div className="input-container region-with-button">
          <label className="input-label2">Latitude</label>
          <input
            type="text"
            value={latitude}
            onChange={handleLatitudeChange}
            placeholder="Digite a latitude"
            className="date-input"
          />
          <label className="input-label2">Longitude</label>
          <input
            type="text"
            value={longitude}
            onChange={handleLongitudeChange}
            placeholder="Digite a longitude"
            className="date-input"
          />
          <button className="filter-button" onClick={handleOkClick}>
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateFilter;