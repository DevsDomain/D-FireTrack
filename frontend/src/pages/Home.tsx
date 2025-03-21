import React, { useState } from 'react';
import Map from '../components/Map';

const Home = () => {
  // Estado para armazenar as datas selecionadas (inicialmente ambas nulas)
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <div className="page-container">
      <Map selectedDates={selectedDates} />
    </div>
  );
};

export default Home;