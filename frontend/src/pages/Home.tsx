// src/pages/Home.tsx
import React, { useState } from 'react';
import Map from '../components/Map';

const Home = () => {
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);
  const [mousePosition, setMousePosition] = useState<{ lat: number; lng: number } | null>(null);
  const [bounds, setBounds] = useState<{
    north: number;
    south: number;
    east: number;
    west: number;
  } | null>(null);

  return (
    <div
      className="page-container"
      style={{ position: 'relative', height: '100vh', width: '100%' }}
    >
      {bounds && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '14px',
            boxShadow: '0px 0px 6px rgba(0,0,0,0.1)',
            zIndex: 1000,
          }}
        >
          <div>
            <strong>Norte:</strong> {bounds.north.toFixed(5)}
          </div>
          <div>
            <strong>Sul:</strong> {bounds.south.toFixed(5)}
          </div>
          <div>
            <strong>Leste:</strong> {bounds.east.toFixed(5)}
          </div>
          <div>
            <strong>Oeste:</strong> {bounds.west.toFixed(5)}
          </div>
        </div>
      )}

      <Map
        selectedDates={selectedDates}
        onMouseMove={setMousePosition}
        onBoundsChange={setBounds}
      />
    </div>
  );
};

export default Home;