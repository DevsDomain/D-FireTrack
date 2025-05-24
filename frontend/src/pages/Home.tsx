import React, { useState } from 'react';
import Map from '../components/Map';

const Home = () => {
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);
  const [mousePosition, setMousePosition] = useState<{ lat: number; lng: number } | null>(null);

  return (
    <div
      className="page-container"
      style={{ position: 'relative', height: '100vh', width: '100%' }}
    >
      {mousePosition && (
        <div
        style={{
          position: 'absolute',
          top: '1vh',                  // 12px ≈ 1vh
          right: '1vw',                // 12px ≈ 1vw
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '0.5rem 0.75rem',   // 8px 12px ≈ 0.5rem 0.75rem
          borderRadius: '0.5rem',      // 8px ≈ 0.5rem
          fontSize: '0.875rem',        // 14px ≈ 0.875rem
          boxShadow: '0 0 0.375rem rgba(0,0,0,0.1)', // 6px ≈ 0.375rem
          zIndex: 1000,
        }}
        >
          <div>
            <strong>Latitude:</strong> {mousePosition.lat.toFixed(5)}
          </div>
          <div>
            <strong>Longitude:</strong> {mousePosition.lng.toFixed(5)}
          </div>
        </div>
      )}

      <Map
        selectedDates={selectedDates}
        onMouseMove={setMousePosition}
      />
    </div>
  );
};

export default Home;