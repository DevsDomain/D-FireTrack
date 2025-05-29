import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import TopMenu from './src/components/TopMenu';
import Sidebar from './src/components/Sidebar/Sidebar';
import Home from './src/pages/Home';

export default function App() {
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);
  const [region, setRegion] = useState({ lat: '', lng: '' });

  return (
    <View style={styles.container}>
      <TopMenu />

      <View style={styles.contentWrapper}>
        <Sidebar
          onDateChange={setSelectedDates}
          onRegionChange={(lat, lng) => setRegion({ lat, lng })}
        />
        <Home selectedDates={selectedDates} region={region} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    // altura total menos a altura do TopMenu (exemplo 70px)
    height: Dimensions.get('window').height - 70,
  },
});