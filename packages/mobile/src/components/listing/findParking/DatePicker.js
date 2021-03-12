import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import DatePicker from 'react-native-date-picker';
import AntDesignIcon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import colors from '@parkyourself-frontend/shared/config/colors';

export default function DatePickerComponent({
  type = 'start',
  mode = 'date',
  date = new Date(),
  onChange = () => {},
  onClose,
  minimumDate = new Date()
}) {
  return (
    <View style={styles.container}>
      <AntDesignIcon name="minus" style={styles.minusIcon} />
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <FontAwesomeIcon name="close" style={styles.closeIcon} />
      </TouchableOpacity>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{`Select ${type} ${mode}`}</Text>
      </View>
      <View style={styles.datePickerBox}>
        <DatePicker
          minimumDate={minimumDate}
          date={date}
          onDateChange={onChange}
          minuteInterval={15}
          androidVariant={mode === 'date' ? 'nativeAndroid' : 'iosClone'}
          mode={mode}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    paddingTop: 5,
    height: 300,
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
  datePickerBox: { flex: 1, justifyContent: 'center' }
});
