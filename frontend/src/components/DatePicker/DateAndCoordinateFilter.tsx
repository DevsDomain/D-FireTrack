import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface Props {
  onDateChange: (dates: [Date | null, Date | null]) => void;
  onRegionChange: (lat: string, lng: string) => void;
}

const DateAndCoordinateFilter: React.FC<Props> = ({ onDateChange, onRegionChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [pickerMode, setPickerMode] = useState<'start' | 'end' | null>(null);

  const handleSubmit = () => {
    if (startDate && endDate && latitude && longitude) {
      onDateChange([startDate, endDate]);
      onRegionChange(latitude, longitude);
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  };

  const handleConfirm = (date: Date) => {
    if (pickerMode === 'start') {
      setStartDate(date);
    } else if (pickerMode === 'end') {
      setEndDate(date);
    }
    setPickerMode(null);
  };

  return (
    <View style={styles.container}>
      {/* Data início */}
      <Text style={styles.label}>Data Início</Text>
      <Button title={startDate?.toLocaleDateString() || 'Selecionar'} onPress={() => setPickerMode('start')} />

      {/* Data fim */}
      <Text style={styles.label}>Data Fim</Text>
      <Button title={endDate?.toLocaleDateString() || 'Selecionar'} onPress={() => setPickerMode('end')} />

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

      {/* Modal de seleção de data */}
      <DateTimePickerModal
        isVisible={pickerMode !== null}
        mode="date"
        date={pickerMode === 'start' ? startDate || new Date() : endDate || new Date()}
        onConfirm={handleConfirm}
        onCancel={() => setPickerMode(null)}
        locale="pt-BR"
      />
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