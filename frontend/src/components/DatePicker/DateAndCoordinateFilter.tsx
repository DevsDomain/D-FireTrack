import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  onDateChange: (dates: [Date | null, Date | null]) => void;
  onRegionChange: (lat: string, lng: string) => void;
}

const DateAndCoordinateFilter: React.FC<Props> = ({ onDateChange, onRegionChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const handleSubmit = () => {
    if (startDate && endDate && latitude && longitude) {
      onDateChange([startDate, endDate]);
      onRegionChange(latitude, longitude);
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Data início */}
      <Text style={styles.label}>Data Início</Text>
      <Button title={startDate?.toLocaleDateString() || 'Selecionar'} onPress={() => setShowStart(true)} />
      {showStart && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, date) => {
            setShowStart(false);
            if (date) setStartDate(date);
          }}
        />
      )}

      {/* Data fim */}
      <Text style={styles.label}>Data Fim</Text>
      <Button title={endDate?.toLocaleDateString() || 'Selecionar'} onPress={() => setShowEnd(true)} />
      {showEnd && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, date) => {
            setShowEnd(false);
            if (date) setEndDate(date);
          }}
        />
      )}

      {/* Inputs de coordenadas */}
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        placeholderTextColor="#aaa"
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Longitude"
        placeholderTextColor="#aaa"
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="numeric"
      />

      {/* Botão de busca */}
      <View style={styles.buttonContainer}>
        <Button title="Buscar" onPress={handleSubmit} color="#5555DD" />
      </View>
    </View>
  );
};

export default DateAndCoordinateFilter;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    margin: 10,
  },
  label: {
    marginVertical: 8,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#5555DD',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 6,
    color: '#333',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 12,
  },
});