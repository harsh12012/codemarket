import colors from '@parkyourself-frontend/shared/config/colors';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

export default function RadioButton({ checked = false, onPress, label }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <IoniconsIcon
        name={checked ? 'checkmark-circle' : 'radio-button-off'}
        color={colors.primary}
        size={28}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  label: {
    fontSize: 18,
    marginLeft: 5
  }
});
