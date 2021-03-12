import React from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';

export default function ToggleButton({ value, onChange, label }) {
  return (
    <View style={styles.rect12}>
      <Switch
        value={value}
        trackColor={{ true: 'rgba(74,144,226,1)', false: 'rgba(0,0,0,1)' }}
        onValueChange={onChange}
      />
      <Text style={styles.switchToDriver}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rect12: {
    width: '100%',
    backgroundColor: 'rgba(20,222,113,1)',
    shadowColor: 'rgba(180,177,177,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 20,
    shadowOpacity: 1,
    shadowRadius: 10,
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5
  },
  switchToDriver: {
    color: 'rgba(255,255,255,1)',
    fontSize: 15,
    marginLeft: 10
  }
});
