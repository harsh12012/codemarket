import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import colors from '@parkyourself-frontend/shared/config/colors';

export default function MapMarker({ price = 'NaN' }) {
  return (
    <TouchableOpacity>
      <View style={styles.priceCircle}>
        <Text style={styles.label}>${price}</Text>
      </View>
      <Icon name="location-pin" style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  priceCircle: {
    position: 'absolute',
    marginLeft: 26,
    top: 14,
    zIndex: 100,
    backgroundColor: colors.secondary,
    width: 48,
    height: 48,
    borderRadius: 25,
    paddingTop: 13
  },
  icon: {
    fontSize: 100,
    color: colors.secondary,
    textAlign: 'center'
  },
  label: { textAlign: 'center', color: colors.white }
});
