import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RadioButton from './RadioButton';

export default function RadioListItem({ label, checked, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <RadioButton checked={checked} onPress={onPress} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d6d6d6',
    paddingVertical: 20
  },
  label: {
    fontSize: 18
  }
});
