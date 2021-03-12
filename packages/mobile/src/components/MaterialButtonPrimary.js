import colors from '@parkyourself-frontend/shared/config/colors';
import React from 'react';
import { ActivityIndicator, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MaterialButtonPrimary({ caption, style, onPress, disabled = false }) {
  return (
    <TouchableOpacity style={{ ...styles.btn, ...style }} onPress={onPress} disabled={disabled}>
      {disabled ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Text style={styles.title}>{caption}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#27aae1',
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 15,
    color: colors.white,
    fontWeight: 'bold'
  }
});
