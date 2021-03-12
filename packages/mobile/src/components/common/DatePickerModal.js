/* eslint-disable react/prop-types */
import colors from '@parkyourself-frontend/shared/config/colors';
import {
  getRangeOfDates,
  saveDateAndTime,
  timeTo12HrFormat
} from '@parkyourself-frontend/shared/utils/time';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import ModalHeader from './ModalHeader';
import BottomSheet from 'reanimated-bottom-sheet';
import DatePicker from '../../components/common/DatePicker';
import MaterialButtonPrimary from '../MaterialButtonPrimary';
import moment from 'moment';
import { round } from 'react-native-reanimated';
const currentDate = new Date();

const changeRoundOfDate = (newdate, hr = 0) => {
  const roundate = new Date(newdate);
  roundate.setHours(hr);
  roundate.setMinutes(0);
  return new Date(roundate);
};

const DatePickerModal = ({
  visible,
  handleClose,
  minDate = currentDate,
  maxDate = new Date().setMonth(currentDate.getMonth() + 4),
  handleSaveFixedSchedule
}) => {
  const sheetRef = useRef();
  const [rangeType, setRangeType] = useState('dot');
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [markedDates, setMarkedDates] = React.useState({});
  const [showActionBtns, setShowActionBtns] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null
  });

  const [picker, setPicker] = useState({
    type: 'start',
    mode: 'time',
    startTime: changeRoundOfDate(new Date(), 0),
    endTime: changeRoundOfDate(new Date(), 18)
  });

  const handleDateTimeClick = (type, mode) => {
    setPicker({
      ...picker,
      type,
      mode
    });
    sheetRef.current.snapTo(0);
    setShowActionBtns(false);
  };

  const setNewDaySelected = useCallback(
    (date) => {
      let markedDate = {};
      if (rangeType === 'dot') {
        markedDate[date] = {
          selected: true,
          selectedColor: colors.primary
        };
        setSelectedDate(date);
        setMarkedDates(markedDate);
      } else if (rangeType === 'custom') {
        markedDate = markedDates;
        if (Object.keys(markedDate).includes(date)) {
          delete markedDate[date];
          setSelectedDate(new Date());
          setMarkedDates(markedDate);
        } else {
          markedDate[date] = {
            selected: true,
            selectedColor: colors.primary
          };
          setSelectedDate(date);
          setMarkedDates(markedDate);
        }
      } else {
        if (dateRange.start && dateRange.end) {
          setDateRange({
            start: date,
            end: null
          });

          markedDate[date] = {
            startingDay: true,
            selected: true,
            color: colors.primary
          };
          setSelectedDate(date);
          setMarkedDates(markedDate);
        } else if (dateRange.start) {
          setDateRange({
            ...dateRange,
            end: date
          });
          const resultDates = getRangeOfDates(dateRange.start, date);
          markedDate = markedDates;
          resultDates.map((item, index) => {
            if (index === 0) {
              markedDate[item] = {
                startingDay: true,
                selected: true,
                color: colors.primary
              };
            } else if (index === resultDates.length - 1) {
              markedDate[item] = {
                endingDay: true,
                selected: true,
                color: colors.primary
              };
            } else {
              markedDate[item] = {
                selected: true,
                color: colors.primary
              };
            }
          });
          setSelectedDate(date);
          setMarkedDates(markedDate);
        } else {
          setDateRange({
            ...dateRange,
            start: date
          });
          markedDate[date] = {
            startingDay: true,
            selected: true,
            color: colors.primary
          };
          setSelectedDate(date);
          setMarkedDates(markedDate);
        }
      }
    },
    [markedDates, dateRange]
  );

  const handleResetValues = () => {
    setSelectedDate(new Date());
    setMarkedDates({});
    setDateRange({
      start: null,
      end: null
    });
  };

  const onSaveHandler = () => {
    if (rangeType === 'period') {
      const newTimeRange = saveDateAndTime(
        dateRange.start,
        dateRange.end,
        picker.startTime,
        picker.endTime
      );
      handleSaveFixedSchedule(newTimeRange, 'range');
    } else if (rangeType === 'custom') {
      const newTimeRangeArray = [];
      Object.keys(markedDates).map((item) => {
        newTimeRangeArray.push(saveDateAndTime(item, item, picker.startTime, picker.endTime));
      });
      handleSaveFixedSchedule(newTimeRangeArray, 'multiple');
    } else {
      const newTimeRange = saveDateAndTime(
        new Date(Object.keys(markedDates)[0]),
        new Date(Object.keys(markedDates)[0]),
        picker.startTime,
        picker.endTime
      );
      handleSaveFixedSchedule(newTimeRange, 'single');
    }

    handleClose();
    handleResetValues();
  };

  console.log(currentDate, new Date(picker.startTime));

  return (
    <Modal style={styles.modal} animationType="slide" visible={visible}>
      <SafeAreaView style={styles.safeView}>
        <ModalHeader
          title="Add a Time Range"
          onClose={() => {
            handleResetValues();
            handleClose();
          }}
          style={{
            paddingHorizontal: 10
          }}
        />
        <View style={styles.selectRow}>
          <TouchableOpacity
            style={rangeType === 'dot' ? styles.active : styles.inactive}
            onPress={() => {
              setRangeType('dot');
              setMarkedDates({});
            }}>
            <Text style={rangeType === 'dot' ? styles.activeText : styles.inactiveText}>
              Single
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={rangeType === 'custom' ? styles.active : styles.inactive}
            onPress={() => {
              setRangeType('custom');
              setMarkedDates({});
            }}>
            <Text style={rangeType === 'custom' ? styles.activeText : styles.inactiveText}>
              Multiple
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={rangeType === 'period' ? styles.active : styles.inactive}
            onPress={() => {
              setRangeType('period');
              setMarkedDates({});
            }}>
            <Text style={rangeType === 'period' ? styles.activeText : styles.inactiveText}>
              Range
            </Text>
          </TouchableOpacity>
        </View>
        <CalendarList
          maxDate={maxDate}
          minDate={minDate}
          markedDates={markedDates}
          current={selectedDate}
          pastScrollRange={5}
          futureScrollRange={5}
          horizontal
          pagingEnabled
          onDayPress={(day) => {
            setNewDaySelected(day.dateString);
          }}
          markingType={rangeType}
          initialNumToRender={1}
        />

        {Object.keys(markedDates).length > 0 && (
          <View style={styles.flexRow}>
            <View style={[styles.row, { marginRight: 10 }]}>
              <Text style={styles.labelText}>Start Time</Text>
              <TouchableOpacity
                style={styles.inputStyle}
                onPress={() => handleDateTimeClick('start', 'time')}>
                <Text style={styles.date}>
                  {timeTo12HrFormat(
                    moment(picker.startTime).format('HH'),
                    moment(picker.startTime).format('mm')
                  )}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelText}>End Time</Text>
              <TouchableOpacity
                style={styles.inputStyle}
                onPress={() => handleDateTimeClick('end', 'time')}>
                <Text style={styles.date}>
                  {timeTo12HrFormat(
                    moment(picker.endTime).format('HH'),
                    moment(picker.endTime).format('mm')
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {showActionBtns && (
          <View style={styles.actionView}>
            <MaterialButtonPrimary
              style={styles.cancelBtn}
              caption="Cancel"
              onPress={() => {
                handleClose();
                handleResetValues();
              }}
            />
            <MaterialButtonPrimary
              caption={'Save'}
              style={styles.materialButtonPrimary}
              onPress={onSaveHandler}
            />
          </View>
        )}

        <BottomSheet
          ref={sheetRef}
          initialSnap={1}
          snapPoints={[300, 0]}
          borderRadius={20}
          renderContent={(props) => (
            <DatePicker
              {...props}
              date={picker.type === 'start' ? picker.startTime : picker.endTime}
              mode={picker.mode}
              type={picker.type}
              onClose={() => {
                sheetRef.current.snapTo(1);
                setShowActionBtns(true);
              }}
              minuteInterval={15}
              onChange={(resDate) => {
                if (picker.type === 'start') {
                  setPicker({
                    ...picker,
                    startTime: resDate
                  });
                } else {
                  setPicker({
                    ...picker,
                    endTime: resDate
                  });
                }
              }}
            />
          )}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default DatePickerModal;

const styles = StyleSheet.create({
  modal: {},
  safeView: {
    flex: 1,
    paddingVertical: 10
  },
  selectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15
  },
  active: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5
  },
  inactive: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5
  },
  date: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500'
  },
  activeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700'
  },
  inactiveText: {
    color: colors.secondary,
    fontSize: 18,
    fontWeight: '700'
  },
  flexRow: {
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 10
  },
  row: {
    flex: 1
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.secondary
  },
  actionView: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 10
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#cecece',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5
  },
  materialButtonPrimary: {
    width: 100,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10
    },
    elevation: 8,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginTop: 10,
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: 30,
    zIndex: 0
  },
  cancelBtn: {
    color: 'black',
    width: 100,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10
    },
    elevation: 8,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginTop: 10,
    backgroundColor: '#6c757D',
    paddingVertical: 12,
    borderRadius: 30,
    marginRight: 10,
    zIndex: 0
  }
});
