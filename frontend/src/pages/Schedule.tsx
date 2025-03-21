import React, { useState } from 'react';
import DateFilter from '../components/DataFilter';

import Map from '../components/Map';

const Schedule = () => {
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <DateFilter onDateChange={setSelectedDates} />
      <Map selectedDates={selectedDates} />
    </div>
  );
};

export default Schedule;