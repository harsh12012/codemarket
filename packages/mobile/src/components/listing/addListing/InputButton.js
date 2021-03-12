import colors from '@parkyourself-frontend/shared/config/colors';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function InputButton({
  style = {},
  value = '',
  label = 'Button',
  onPress = () => {}
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.box, { ...style }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.placeholder}>{value || label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    borderBottomColor: colors.grey,
    borderBottomWidth: 0.5,
    paddingBottom: 1,
    marginVertical: 10
  },
  label: {
    color: colors.secondary,
    fontSize: 15,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  placeholder: {
    color: colors.black,
    fontSize: 17
  }
});
