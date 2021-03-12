import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import DatePicker from 'react-native-date-picker';
import AntDesignIcon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colors from '@parkyourself-frontend/shared/config/colors';

export default function DatePickerComponent({
  type = 'start',
  mode = 'date',
  date = new Date(),
  onChange = () => {},
  onClose,
  minimumDate = null,
  minuteInterval = 15
}) {

  const [selectedDate,setSelectedDate] = useState(date)
  return (
    <View style={styles.container}>
      <AntDesignIcon name="minus" style={styles.minusIcon} />
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <FontAwesomeIcon name="close" style={styles.closeIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={() =>{
        onChange(selectedDate);
        onClose();
        
      }}>
        <MaterialIcon name="done" style={styles.saveIcon} />
      </TouchableOpacity>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{`Select ${type} ${mode}`}</Text>
      </View>
      <View style={styles.datePickerBox}>
        <DatePicker
          minimumDate={minimumDate}
          date={selectedDate}
          onDateChange={(resDate) => setSelectedDate(resDate)}
          minuteInterval={minuteInterval}
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
    alignItems: 'center',
    zIndex: 100000,
    elevation:10,
    
  },
  minusIcon: { fontSize: 30, color: colors.grey, marginTop: -8, marginBottom: -5 },
  closeButton: {
    position: 'absolute',
    width: '100%',
    top: Platform.OS === 'ios' ? 19 : 24,
    right: 20,
    zIndex: 1
  },
  saveButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 19 : 24,
    left: 20,
    zIndex: 1
  },
  closeIcon: { fontSize: 30, color: colors.secondary, textAlign: 'right' },
  saveIcon: { fontSize: 30, color: colors.secondary, textAlign: 'left' },
  titleRow: { width: '100%' },
  title: {
    marginTop:5,
    textAlign: 'center',
    color: colors.secondary,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  datePickerBox: { flex: 1, justifyContent: 'center' }
});
