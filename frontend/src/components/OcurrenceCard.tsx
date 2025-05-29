// components/OccurrenceCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  region: string;
  date: string;
  hectares: string;
  description: string;
}

const OccurrenceCard: React.FC<Props> = ({ region, date, hectares, description }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{region}</Text>
      <Text style={styles.text}>Data: {date}</Text>
      <Text style={styles.text}>Hectares: {hectares}</Text>
      <Text style={styles.text}>Descrição: {description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: '#444',
  },
});

export default OccurrenceCard;