import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Modal } from 'react-native';
import DatePicker from 'react-native-date-picker';
import AntDesignIcon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import colors from '@parkyourself-frontend/shared/config/colors';

export default function DatePickerComponent({
  type = 'start',
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
        <Text style={styles.title}>{`Select ${type} Date`}</Text>
      </View>
      <View style={styles.datePickerBox}>
        <DatePicker
          minimumDate={minimumDate}
          date={date}
          onDateChange={onChange}
          androidVariant="nativeAndroid"
          mode="date"
        />
        <Text style={styles.title}>{`Select ${type} Time`}</Text>
        <DatePicker
          minimumDate={minimumDate}
          date={date}
          onDateChange={onChange}
          // androidVariant="nativeAndroid"
          minuteInterval={15}
          mode="time"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    paddingTop: 2,
    height: 500,
    alignItems: 'center'
    // borderTopWidth: 1
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
