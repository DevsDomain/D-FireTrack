import React, { useState } from 'react';
import DateFilter from '../components/DataFilter';
import Map from '../components/Map';
import axios from 'axios';

const Schedule = () => {
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);
  const [regionCoords, setRegionCoords] = useState<{ lat: string; lng: string }>({
    lat: '',
    lng: ''
  });

  const handleRegionChange = async (lat: string, lng: string) => {
    setRegionCoords({ lat, lng });

    if (selectedDates[0] && selectedDates[1]) {
      const start = selectedDates[0].toISOString().split('T')[0];
      const end = selectedDates[1].toISOString().split('T')[0];

      try {
        const response = await axios.post('http://localhost:3333/api/apontamento/filtro', {
          startDate: start,
          endDate: end,
          latitude: lat,
          longitude: lng
        });

        console.log('Resposta do backend:', response.data);
        alert('Dados enviados com sucesso!');
      } catch (error) {
        console.error('Erro ao enviar dados para o backend:', error);
      }
    } else {
      console.warn('Por favor, selecione as datas antes de buscar.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <DateFilter
        onDateChange={setSelectedDates}
        onRegionChange={handleRegionChange}
      />

      {/* Mapa com largura reduzida e centralizado */}
      <div style={{ width: '60%', height: '0px', marginTop: '0px', marginLeft: '-500px' }}>
        <Map
          selectedDates={selectedDates}
          onMouseMove={(pos) => console.log('Mouse:', pos)}
          onBoundsChange={(bounds) => console.log('Bounds:', bounds)}
        />
      </div>
    </div>
  );
};

export default Schedule;