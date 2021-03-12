import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, ScrollView } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import colors from '@parkyourself-frontend/shared/config/colors';
import RadioListItem from '../../RadioListItem';

export default function DatePickerComponent({
  spaceLabelSelected = '',
  onChange = () => {},
  onClose,
  spaceLabels = []
}) {
  return (
    <View style={styles.container}>
      <AntDesignIcon name="minus" style={styles.minusIcon} />
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <FontAwesomeIcon name="close" style={styles.closeIcon} />
      </TouchableOpacity>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Select Space Label</Text>
      </View>
      <View style={styles.row}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {spaceLabels.map((item) => (
            <RadioListItem
              key={item.label}
              label={`**** **** **** ${item.label}`}
              checked={spaceLabelSelected === item.label}
              onPress={() => {
                onChange(item.label);
                onClose();
              }}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    paddingTop: 2,
    height: 400,
    alignItems: 'center'
  },
  minusIcon: { fontSize: 30, color: colors.grey, marginTop: -8, marginBottom: -5 },
  closeButton: {
    position: 'absolute',
    width: '100%',
    top: Platform.OS === 'ios' ? 19 : 24,
    right: 20,
    zIndex: 1
  },
  closeIcon: { fontSize: 30, color: colors.secondary, textAlign: 'right' },
  titleRow: { width: '100%' },
  title: {
    textAlign: 'center',
    color: colors.secondary,
    fontSize: 23,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  row: { flex: 1, justifyContent: 'flex-start', width: '100%' }
});
