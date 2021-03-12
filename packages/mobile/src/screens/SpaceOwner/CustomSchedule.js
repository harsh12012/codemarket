import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import MaterialButtonPrimary from '../../components/MaterialButtonPrimary';
import { Calendar } from 'react-native-calendars';

function CustomSchedule({ visible }) {
  const [mode, setMode] = useState('date');
  const [date, setDate] = useState('');

  return (
    <Modal visible={visible}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.customSchedule}>Custom Schedule</Text>
        <View style={styles.rect}>
          {/* <Text style={styles.calendar}>Calendar</Text> */}
          <Calendar
            style={styles.calendar}
            markingType="period"
            markedDates={{
              '2020-09-16': {
                selected: true,
                marked: true,
                selectedColor: '#27aae1'
              },
              '2020-09-22': {
                startingDay: true,
                marked: true,
                selected: true,
                color: '#27aae1'
              },
              '2020-09-23': {
                color: '#27aae1',
                marked: true,
                dotColor: 'red',
                activeOpacity: 0,
                selected: true,
                endingDay: true
              },
              '2020-09-24': { disabled: true, disableTouchEvent: true }
            }}
            // Initially visible month. Default = Date()
            current={new Date()}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={'2012-05-10'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={'2020-12-30'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={(day) => {
              console.log('selected day', day);
            }}
            // // Handler which gets executed on day long press. Default = undefined
            // onDayLongPress={(day) => {
            //   console.log('selected day', day);
            // }}
            // // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            // monthFormat={'yyyy MM'}
            // // Handler which gets executed when visible month changes in calendar. Default = undefined
            // onMonthChange={(month) => {
            //   console.log('month changed', month);
            // }}
            enableSwipeMonths={true}
          />
        </View>
        <Text style={styles.setCustomTimings}>Set Custom Timings</Text>
        <Text style={styles.date8January}>Date : 18 January</Text>
        <View style={styles.button2Row}>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.startTime1}>Start Time</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1}>
            <Text style={styles.endTime1}>End Time</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.loremIpsum}>Add another time range</Text>
        <Text style={styles.date8January}>Date : 25 - 27 January</Text>
        <View style={styles.button2Row}>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.startTime1}>Start Time</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1}>
            <Text style={styles.endTime1}>End Time</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.loremIpsum}>Add another time range</Text>

        <MaterialButtonPrimary
          onPress={() => {
            navigation.navigate('SpaceAvailable');
          }}
          caption="SAVE SCHEDULE"
          style={styles.materialButtonPrimary7}></MaterialButtonPrimary>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  customSchedule: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24
    // marginTop: 56,
    // marginLeft: 20,
  },
  rect: {
    width: '100%',
    // height: 321,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 6,
      height: 6
    },
    elevation: 30,
    shadowOpacity: 0.1,
    shadowRadius: 30,
    marginTop: 25,
    backgroundColor: '#fff',
    // marginLeft: 22,
    alignItems: 'center',
    justifyContent: 'center'
  },
  calendar: {
    width: '100%'
  },
  // calendar: {
  //   // fontFamily: 'roboto-regular',
  //   color: 'rgba(214,214,214,1)',
  //   fontSize: 24,
  // },
  setCustomTimings: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 17,
    marginTop: 38
    // marginLeft: 21,
  },
  date8January: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    fontSize: 16,
    opacity: 0.8,
    marginTop: 25
    // marginLeft: 23,
  },
  button2: {
    width: 150,
    height: 39,
    borderBottomWidth: 1,
    borderColor: 'rgba(182,182,182,1)'
  },
  startTime1: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 18,
    marginTop: 9,
    marginLeft: 2
  },
  button1: {
    width: 150,
    height: 39,
    borderBottomWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    marginLeft: 25
  },
  endTime1: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 18,
    marginTop: 9,
    marginLeft: 2
  },
  button2Row: {
    height: 39,
    flexDirection: 'row',
    marginTop: 23,
    // marginLeft: 24,
    marginRight: 26
  },
  loremIpsum: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    textDecorationLine: 'underline',
    marginTop: 15
  },
  materialButtonPrimary7: {
    height: 36,
    width: 150,
    backgroundColor: 'rgba(39,170,225,1)',
    marginVertical: 80,
    alignSelf: 'center'
  }
});

export default CustomSchedule;
