/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {
  convertToUnit,
  convertToMilliseconds,
  timeTo12HrFormat,
  getDateRange
} from '@parkyourself-frontend/shared/utils/time';
import { tempListingSpaceA } from '@parkyourself-frontend/shared/redux/actions/tempListing';
import DatepickerRange from 'react-native-range-datepicker';
import moment from 'moment';
import colors from '@parkyourself-frontend/shared/config/colors';
import BottomSheet from 'reanimated-bottom-sheet';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import DatePicker from '../../components/common/DatePicker';
import MaterialButtonPrimary from '../../components/MaterialButtonPrimary';
import { addListingSpaceAvailable } from '../../actions/listing';
import AddListingHeader from '../../components/SpaceOwner/AddListingHeader';
import NextButton from '../../components/SpaceOwner/NextButton';
import RadioListItem from '../../components/RadioListItem';
import UnitModal from '../../components/listing/addListing/UnitModal';
import OutlineButton from '../../components/common/OutlineButton';
import DatePickerModal from '../../components/common/DatePickerModal';

function SpaceAvailable({
  onBackButtonPress,
  onNextButtonPress,
  spaceAvailable,
  tempListingSpaceA,
  navigation,
  activeIndex,
  setActiveIndex,
  validated
}) {
  const scrollRef = useRef();

  // const [activeIndex, setActiveIndex] = useState(1);

  const [showUnitModal, setShowUnitModal] = useState(false);
  const [howLong, setHowLong] = useState('minTime');

  // const [validated, setvalidated] = useState(false);

  // for custom schedule modal
  const [visible, setVisible] = useState(false);

  const [monday, setMonday] = useState(
    spaceAvailable && spaceAvailable.activeDays ? spaceAvailable.activeDays.monday : false
  );
  const [tuesday, setTuesday] = useState(
    spaceAvailable && spaceAvailable.activeDays ? spaceAvailable.activeDays.tuesday : false
  );
  const [wednesday, setWednesday] = useState(
    spaceAvailable && spaceAvailable.activeDays ? spaceAvailable.activeDays.wednesday : false
  );
  const [thursday, setThursday] = useState(
    spaceAvailable && spaceAvailable.activeDays ? spaceAvailable.activeDays.thursday : false
  );
  const [friday, setFriday] = useState(
    spaceAvailable && spaceAvailable.activeDays ? spaceAvailable.activeDays.friday : false
  );
  const [saturday, setSaturday] = useState(
    spaceAvailable && spaceAvailable.activeDays ? spaceAvailable.activeDays.saturday : false
  );
  const [sunday, setSunday] = useState(
    spaceAvailable && spaceAvailable.activeDays ? spaceAvailable.activeDays.sunday : false
  );
  const [scheduleType, setScheduleType] = useState(
    spaceAvailable && spaceAvailable.scheduleType
      ? spaceAvailable.scheduleType == 'daily'
        ? 1
        : 2
      : 1
  );
  const [noticeTime, setNoticeTime] = useState(
    spaceAvailable && spaceAvailable.noticeTime ? spaceAvailable.noticeTime : 1
  );
  const [advanceBookingTime, setAdvanceBookingTime] = useState(
    spaceAvailable && spaceAvailable.advanceBookingTime ? spaceAvailable.advanceBookingTime : 3
  );
  const [minTime, setMinTime] = useState(
    spaceAvailable && spaceAvailable.minTime ? spaceAvailable.minTime : 1
  );
  const [maxTime, setMaxTime] = useState(
    spaceAvailable && spaceAvailable.maxTime ? spaceAvailable.maxTime : 30
  );
  const [instantBooking, setInstantBooking] = useState(
    spaceAvailable && spaceAvailable.instantBooking ? spaceAvailable.instantBooking : true
  );

  // date picker
  const [startTime, setStartTime] = useState(
    spaceAvailable && spaceAvailable.startTime ? spaceAvailable.startTime : new Date()
  );
  const [endTime, setEndTime] = useState(
    spaceAvailable && spaceAvailable.endTime ? spaceAvailable.endTime : new Date()
  );
  const [mode, setMode] = useState('time');
  const [activeDay, setActiveDay] = useState('monday');
  const [showModal, setShowModal] = useState(false);
  const [dateRangeSelected, setDateRangeSelected] = useState([]);

  const sheetRef = useRef(null);
  const [pickerChanged, setPickerChanged] = useState(false);

  const [picker, setPicker] = useState({
    mode: 'time',
    type: 'start',
    date: new Date().setMinutes(30),
    minDate: null,
    dateIndex: null,
    schedulePicker: false
  });

  const showPicker = (type, day) => {
    setActiveDay(day);
    let minDate;
    if (type === 'start') {
      minDate = new Date();
      minDate.setHours(spaceAvailable[day].startHour);
      minDate.setMinutes(spaceAvailable[day].startMinute);
    } else {
      minDate = new Date();
      minDate.setHours(spaceAvailable[day].endHour);
      minDate.setMinutes(spaceAvailable[day].endMinute);
    }
    setPicker({
      ...picker,
      date: minDate,
      type,
      minDate
    });

    sheetRef.current.snapTo(0);
  };

  const handlePickerChange = (selectedDate) => {
    setPicker({
      ...picker,
      date: selectedDate
    });
    if (picker.type === 'start') {
      const currentDate_start = {
        hour: new Date(selectedDate).getHours() || spaceAvailable[activeDay].startHour,
        minute:
          new Date(selectedDate).getMinutes() !== 0
            ? new Date(selectedDate).getMinutes() || spaceAvailable[activeDay].startMinute
            : 0
      };
      tempListingSpaceA({
        [activeDay]: {
          ...spaceAvailable[activeDay],
          startHour: currentDate_start.hour,
          startMinute: currentDate_start.minute
        }
      });
    } else {
      const currentDate_end = {
        hour: new Date(selectedDate).getHours() || spaceAvailable[activeDay].endHour,
        minute:
          new Date(selectedDate).getMinutes() !== 0
            ? new Date(selectedDate).getMinutes() || spaceAvailable[activeDay].endMinute
            : 0
      };

      tempListingSpaceA({
        [activeDay]: {
          ...spaceAvailable[activeDay],
          endHour: currentDate_end.hour,
          endMinute: currentDate_end.minute
        }
      });
    }
  };

  const showScheduleTimePicker = (type, local_date, dateIndex) => {
    setPicker({
      ...picker,
      date: local_date,
      type,
      dateIndex,
      minDate: null,
      schedulePicker: true
    });

    sheetRef.current.snapTo(0);
  };

  const handleSchedulePickerChange = (selectedDate) => {
    const resData = dateRangeSelected;
    resData.map((item, index) => {
      if (index === picker.dateIndex) {
        if (picker.type === 'start') {
          item.startDate = selectedDate.toString();
          return item;
        }
        item.endDate = selectedDate.toString();
        return item;
      }
      return item;
    });

    setDateRangeSelected(resData);
    setPickerChanged(!pickerChanged);
  };

  useEffect(() => {}, [pickerChanged]);

  //Handle Update Fixed Schdedule Funtion
  const handleSaveFixedSchedule = (dateRange,rangeType) => {
      if(rangeType === 'range' || rangeType ==='single'){
        const newDateRange = {
          startDate: dateRange.startTime,
          endDate: dateRange.endTime
        };
    
        if (spaceAvailable.customTimeRange.length <= 0) {
          tempListingSpaceA({
            customTimeRange: [newDateRange]
          });
        } else {
          const newTimeRange = spaceAvailable.customTimeRange;
          tempListingSpaceA({
            customTimeRange: newTimeRange.concat(newDateRange)
          });
        }
      }else{
        const newDateRangeArray = [];
        dateRange.map(item =>{
          newDateRangeArray.push({
            startDate: item.startTime,
            endDate: item.endTime
          })
        })
        if (spaceAvailable.customTimeRange.length <= 0) {
          tempListingSpaceA({
            customTimeRange: newDateRangeArray
          });
        } else {
          const newTimeRange = spaceAvailable.customTimeRange;
          tempListingSpaceA({
            customTimeRange: newTimeRange.concat(...newDateRangeArray)
          });
        }
      }
  };

  return (
    <>
      <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
        {activeIndex === 9 && (
          <>
            <Text style={styles.heading}>What are the timings?</Text>
            <RadioListItem
              label="Set to 24 hours a day"
              checked={spaceAvailable.scheduleType === '24hours'}
              onPress={() => tempListingSpaceA({ scheduleType: '24hours' })}
            />
            <RadioListItem
              label="Set to a Fixed schedule"
              checked={spaceAvailable.scheduleType === 'fixed'}
              onPress={() => tempListingSpaceA({ scheduleType: 'fixed' })}
            />
            <RadioListItem
              label="Set a Custom Schedule"
              checked={spaceAvailable.scheduleType === 'custom'}
              onPress={() => {
                tempListingSpaceA({ scheduleType: 'custom' });
              }}
            />
            {spaceAvailable.scheduleType === 'fixed' && (
              <>
                <Text style={styles.heading}>At what days can drivers park at your listing?</Text>

                <RadioListItem
                  label="Monday"
                  checked={spaceAvailable.monday.isActive}
                  onPress={() =>
                    tempListingSpaceA({
                      monday: {
                        ...spaceAvailable.monday,
                        isActive: !spaceAvailable.monday.isActive
                      }
                    })
                  }
                />
                {spaceAvailable.monday.isActive && (
                  <View style={styles.button2Row}>
                    <View style={styles.wrapper}>
                      <Text style={styles.label}>Start Time</Text>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showPicker('start', 'monday')}>
                        <Text style={styles.startTime} numberOfLines={1}>
                          {timeTo12HrFormat(
                            spaceAvailable.monday.startHour,
                            spaceAvailable.monday.startMinute
                          )}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.wrapper}>
                      <Text style={styles.label}>End Time</Text>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showPicker('end', 'monday')}>
                        <Text style={styles.endTime} numberOfLines={1}>
                          {timeTo12HrFormat(
                            spaceAvailable.monday.endHour,
                            spaceAvailable.monday.endMinute
                          )}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <RadioListItem
                  label="Tuesday"
                  checked={spaceAvailable.tuesday.isActive}
                  onPress={() =>
                    tempListingSpaceA({
                      tuesday: {
                        ...spaceAvailable.tuesday,
                        isActive: !spaceAvailable.tuesday.isActive
                      }
                    })
                  }
                />
                {spaceAvailable.tuesday.isActive && (
                  <View style={styles.button2Row}>
                    <View style={styles.wrapper}>
                      <Text style={styles.label}>Start Time</Text>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showPicker('start', 'tuesday')}>
                        <Text style={styles.startTime} numberOfLines={1}>
                          {timeTo12HrFormat(
                            spaceAvailable.tuesday.startHour,
                            spaceAvailable.tuesday.startMinute
                          )}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.wrapper}>
                      <Text style={styles.label}>End Time</Text>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showPicker('end', 'tuesday')}>
                        <Text style={styles.endTime} numberOfLines={1}>
                          {timeTo12HrFormat(
                            spaceAvailable.tuesday.endHour,
                            spaceAvailable.tuesday.endMinute
                          )}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <RadioListItem
                  label="Wednesday"
                  checked={spaceAvailable.wednesday.isActive}
                  onPress={() =>
                    tempListingSpaceA({
                      wednesday: {
                        ...spaceAvailable.wednesday,
                        isActive: !spaceAvailable.wednesday.isActive
                      }
                    })
                  }
                />
                {spaceAvailable.wednesday.isActive && (
                  <View style={styles.button2Row}>
                    <View style={styles.wrapper}>
                      <Text style={styles.label}>Start Time</Text>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showPicker('start', 'wednesday')}>
                        <Text style={styles.startTime} numberOfLines={1}>
                          {timeTo12HrFormat(
                            spaceAvailable.wednesday.startHour,
                            spaceAvailable.wednesday.startMinute
                          )}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.wrapper}>
                      <Text style={styles.label}>End Time</Text>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showPicker('end', 'wednesday')}>
                        <Text style={styles.endTime} numberOfLines={1}>
                          {timeTo12HrFormat(
                            spaceAvailable.wednesday.endHour,
                            spaceAvailable.wednesday.endMinute
                          )}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <RadioListItem
                  label="Thursday"
                  checked={spaceAvailable.thursday.isActive}
                  onPress={() =>
                    tempListingSpaceA({
                      thursday: {
                        ...spaceAvailable.thursday,
                        isActive: !spaceAvailable.thursday.isActive
                      }
                    })
                  }
                />
                {spaceAvailable.thursday.isActive && (
                  <View style={styles.button2Row}>
                    <View style={styles.wrapper}>
                      <Text style={styles.label}>Start Time</Text>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showPicker('start', 'thursday')}>
                        <Text style={styles.startTime} numberOfLines={1}>
                          {timeTo12HrFormat(
                            spaceAvailable.thursday.startHour,
                            spaceAvailable.thursday.startMinute
                          )}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.wrapper}>
                      <Text style={styles.label}>End Time</Text>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showPicker('end', 'thursday')}>
                        <Text style={styles.endTime} numberOfLines={1}>
                          {timeTo12HrFormat(
                            spaceAvailable.thursday.endHour,
                            spaceAvailable.thursday.endMinute
                          )}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <RadioListItem
                  label="Friday"
                  checked={spaceAvailable.friday.isActive}
                  onPress={() =>
                    tempListingSpaceA({
                      friday: {
                        ...spaceAvailable.friday,
                        isActive: !spaceAvailable.friday.isActive
                      }
                    })
                  }
                />
                {spaceAvailable.friday.isActive && (
                  <View style={styles.button2Row}>
                    <View style={styles.wrapper}>
                      <Text style={styles.label}>Start Time</Text>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showPicker('start', 'friday')}>
                        <Text style={styles.startTime} numberOfLines={1}>
                          {timeTo12HrFormat(
                            spaceAvailable.friday.startHour,
                            spaceAvailable.friday.startMinute
                          )}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.wrapper}>
                      <Text style={styles.label}>End Time</Text>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showPicker('end', 'friday')}>
                        <Text style={styles.endTime} numberOfLines={1}>
                          {timeTo12HrFormat(
                            spaceAvailable.friday.endHour,
                            spaceAvailable.friday.endMinute
                          )}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <RadioListItem
                  label="Saturday"
                  checked={spaceAvailable.saturday.isActive}
                  onPress={() =>
                    tempListingSpaceA({
                      saturday: {
                        ...spaceAvailable.saturday,
                        isActive: !spaceAvailable.saturday.isActive
                      }
                    })
                  }
                />
                {spaceAvailable.saturday.isActive && (
                  <View style={styles.button2Row}>
                    <View style={styles.wrapper}>
                      <Text style={styles.label}>Start Time</Text>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showPicker('start', 'saturday')}>
                        <Text style={styles.startTime} numberOfLines={1}>
                          {timeTo12HrFormat(
                            spaceAvailable.saturday.startHour,
                            spaceAvailable.saturday.startMinute
                          )}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.wrapper}>
                      <Text style={styles.label}>End Time</Text>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showPicker('end', 'saturday')}>
                        <Text style={styles.endTime} numberOfLines={1}>
                          {timeTo12HrFormat(
                            spaceAvailable.saturday.endHour,
                            spaceAvailable.saturday.endMinute
                          )}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <RadioListItem
                  label="Sunday"
                  checked={spaceAvailable.sunday.isActive}
                  onPress={() =>
                    tempListingSpaceA({
                      sunday: {
                        ...spaceAvailable.sunday,
                        isActive: !spaceAvailable.sunday.isActive
                      }
                    })
                  }
                />
                {spaceAvailable.sunday.isActive && (
                  <View style={styles.button2Row}>
                    <View style={styles.wrapper}>
                      <Text style={styles.label}>Start Time</Text>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showPicker('start', 'sunday')}>
                        <Text style={styles.startTime} numberOfLines={1}>
                          {timeTo12HrFormat(
                            spaceAvailable.sunday.startHour,
                            spaceAvailable.sunday.startMinute
                          )}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.wrapper}>
                      <Text style={styles.label}>End Time</Text>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showPicker('end', 'sunday')}>
                        <Text style={styles.endTime} numberOfLines={1}>
                          {timeTo12HrFormat(
                            spaceAvailable.sunday.endHour,
                            spaceAvailable.sunday.endMinute
                          )}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {validated &&
                  !(
                    spaceAvailable.monday.isActive ||
                    spaceAvailable.tuesday.isActive ||
                    spaceAvailable.wednesday.isActive ||
                    spaceAvailable.thursday.isActive ||
                    spaceAvailable.friday.isActive ||
                    spaceAvailable.saturday.isActive ||
                    spaceAvailable.sunday.isActive
                  ) && <Text style={styles.requiredText}>Please select at least one day</Text>}
              </>
            )}
            {spaceAvailable.scheduleType === 'custom' && (
              <>
                <Text style={styles.heading1}>Set Custom Timings</Text>
                <DatePickerModal
                  visible={showModal}
                  handleClose={() => setShowModal(false)}
                  handleSaveFixedSchedule={handleSaveFixedSchedule}
                />
                {/* <Modal style={{}} animationType="slide" transparent={true} visible={showModal}>
                  <SafeAreaView style={styles.safeView}>
                    <DatepickerRange
                      startDate={new Date()}
                      untilDate={new Date()}
                      buttonColor={colors.primary}
                      placeHolderStart="Start Date"
                      placeHolderUntil="End Date"
                      selectedBackgroundColor={colors.primary}
                      todayColor={colors.primary}
                      onClose={() => {
                        setShowModal(false);
                      }}
                      onConfirm={(start, end) => {
                        let sDate = new Date(start);
                        let eDate = new Date(end);
                        sDate.setHours(1, 0, 0, 0);
                        eDate.setHours(12, 0, 0, 0);
                        setDateRangeSelected(
                          dateRangeSelected.length > 0
                            ? [
                                ...dateRangeSelected,
                                {
                                  startDate: sDate.toString(),
                                  endDate: eDate.toString()
                                }
                              ]
                            : [
                                {
                                  startDate: sDate.toString(),
                                  endDate: eDate.toString()
                                }
                              ]
                        );
                        setShowModal(false);
                      }}
                    />
                  </SafeAreaView>
                </Modal> */}

                {dateRangeSelected.length > 0 && (
                  <>
                    {dateRangeSelected.map((item, index) => {
                      return (
                        <View key={`time-${index}`}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'flex-start'
                            }}>
                            <Text style={[styles.label, { fontSize: 20, marginRight: 10 }]}>
                              Date:{' '}
                              <Text style={[styles.label, { fontSize: 18 }]}>
                                {getDateRange(item.startDate, item.endDate)}
                              </Text>
                            </Text>
                          </View>
                          <View style={styles.button2Row}>
                            <View style={styles.wrapper}>
                              <Text style={styles.label}>Start Time</Text>
                              <TouchableOpacity
                                style={styles.button2}
                                onPress={() => {
                                  showScheduleTimePicker('start', item.startDate, index);
                                }}>
                                <Text style={styles.startTime} numberOfLines={1}>
                                  {timeTo12HrFormat(
                                    new Date(item.startDate).getHours(),
                                    new Date(item.startDate).getMinutes()
                                  )}
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <View style={styles.wrapper}>
                              <Text style={styles.label}>End Time</Text>
                              <TouchableOpacity
                                style={styles.button2}
                                onPress={() => {
                                  showScheduleTimePicker('end', item.endDate, index);
                                }}>
                                <Text style={styles.endTime} numberOfLines={1}>
                                  {timeTo12HrFormat(
                                    new Date(item.endDate).getHours(),
                                    new Date(item.endDate).getMinutes()
                                  )}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      );
                    })}

                    <TouchableOpacity onPress={() => setShowModal(true)}>
                      <Text style={styles.subHeading1}>Add Another Time Range</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                      <TouchableOpacity
                        onPress={() => {
                          if (spaceAvailable.customTimeRange.length <= 0) {
                            tempListingSpaceA({
                              customTimeRange: dateRangeSelected
                            });
                          } else {
                            const newTimeRange = spaceAvailable.customTimeRange;
                            tempListingSpaceA({
                              customTimeRange: newTimeRange.concat(...dateRangeSelected)
                            });
                          }

                          setDateRangeSelected([]);
                        }}
                        style={styles.materialButtonPrimary}>
                        <Text style={{ fontSize: 17, color: '#fff' }}>Save Schedule Time</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                {dateRangeSelected.length <= 0 && (
                  <OutlineButton
                    label="Add a time range"
                    textCenter
                    onPress={() => {
                      setShowModal(true);
                    }}
                  />
                )}

                {spaceAvailable.customTimeRange.map((item, index) => {
                  return (
                    <View key={`sa-${index}`} style={styles.timeRange}>
                      <View>
                        <Text style={styles.timeText}>
                          {`${moment(item.startDate).format('lll')}`}
                        </Text>
                        <AntDesignIcon name="arrowdown" style={[styles.featherIcon,{marginVertical:10,textAlign:'center'}]} />
                        <Text style={styles.timeText}>{`${moment(item.endDate).format(
                          'lll'
                        )}`}</Text>
                      </View>
                      <View>
                        {/* <TouchableOpacity style={{ marginBottom: 15 }}>
                          <FeatherIcon name="edit" style={styles.featherIcon} />
                        </TouchableOpacity> */}
                        <TouchableOpacity
                          onPress={() => {
                            tempListingSpaceA({
                              customTimeRange: spaceAvailable.customTimeRange.filter(
                                (saitem, saindex) => saindex !== index
                              )
                            });
                          }}>
                          <MaterialCommunityIconsIcon name="delete" style={styles.materialCIcon} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </>
            )}
          </>
        )}

        {activeIndex === 10 && (
          <>
            <Text style={styles.heading}>How much notice do you need before a Guest arrives?</Text>
            <RadioListItem
              label="Set it to None"
              checked={!spaceAvailable.hasNoticeTime}
              onPress={() =>
                tempListingSpaceA({
                  hasNoticeTime: !spaceAvailable.hasNoticeTime
                })
              }
            />
            {spaceAvailable.hasNoticeTime && (
              <View style={styles.rect10}>
                <View style={styles.iconRow}>
                  <TouchableOpacity
                    onPress={() => {
                      if (
                        convertToUnit(
                          spaceAvailable.noticeTime.value,
                          spaceAvailable.noticeTime.unit
                        ) > 1
                      ) {
                        tempListingSpaceA({
                          noticeTime: {
                            ...spaceAvailable.noticeTime,
                            value: convertToMilliseconds(
                              convertToUnit(
                                spaceAvailable.noticeTime.value,
                                spaceAvailable.noticeTime.unit
                              ) - 1,
                              spaceAvailable.noticeTime.unit
                            )
                          }
                        });
                      }
                    }}>
                    <EntypoIcon name="circle-with-minus" style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setShowUnitModal(true)}
                    style={styles.unitButton}>
                    <Text style={styles.unitText}>
                      {convertToUnit(
                        spaceAvailable.noticeTime.value,
                        spaceAvailable.noticeTime.unit
                      )}{' '}
                      {spaceAvailable.noticeTime.unit}
                    </Text>
                    <AntDesignIcon name="caretdown" style={styles.unitText} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      tempListingSpaceA({
                        noticeTime: {
                          ...spaceAvailable.noticeTime,
                          value: convertToMilliseconds(
                            convertToUnit(
                              spaceAvailable.noticeTime.value,
                              spaceAvailable.noticeTime.unit
                            ) + 1,
                            spaceAvailable.noticeTime.unit
                          )
                        }
                      })
                    }>
                    <EntypoIcon name="circle-with-plus" style={styles.icon2} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <UnitModal
              onHide={() => setShowUnitModal(false)}
              visible={showUnitModal}
              unit={spaceAvailable.noticeTime.unit}
              onSelect={(value, unit) => {
                tempListingSpaceA({
                  noticeTime: {
                    unit,
                    value
                  }
                });
                setShowUnitModal(false);
              }}
            />
            <Text style={styles.description}>
              Tip : At least 2 days&#39; notice can help you plan for a guest&#39;s arrival, but you
              might miss out last minute trips.
            </Text>
          </>
        )}

        {activeIndex === 11 && (
          <>
            <Text style={styles.heading}>How far in advance can guests book?</Text>
            <View style={styles.rect10}>
              <View style={styles.iconRow}>
                <TouchableOpacity
                  onPress={() => {
                    if (
                      convertToUnit(
                        spaceAvailable.advanceBookingTime.value,
                        spaceAvailable.advanceBookingTime.unit
                      ) > 1
                    ) {
                      tempListingSpaceA({
                        advanceBookingTime: {
                          ...spaceAvailable.advanceBookingTime,
                          value: convertToMilliseconds(
                            convertToUnit(
                              spaceAvailable.advanceBookingTime.value,
                              spaceAvailable.advanceBookingTime.unit
                            ) - 1,
                            spaceAvailable.advanceBookingTime.unit
                          )
                        }
                      });
                    }
                  }}>
                  <EntypoIcon name="circle-with-minus" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowUnitModal(true)} style={styles.unitButton}>
                  <Text style={styles.unitText}>
                    {convertToUnit(
                      spaceAvailable.advanceBookingTime.value,
                      spaceAvailable.advanceBookingTime.unit
                    )}{' '}
                    {spaceAvailable.advanceBookingTime.unit}
                  </Text>
                  <AntDesignIcon name="caretdown" style={styles.unitText} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    tempListingSpaceA({
                      advanceBookingTime: {
                        ...spaceAvailable.advanceBookingTime,
                        value: convertToMilliseconds(
                          convertToUnit(
                            spaceAvailable.advanceBookingTime.value,
                            spaceAvailable.advanceBookingTime.unit
                          ) + 1,
                          spaceAvailable.advanceBookingTime.unit
                        )
                      }
                    })
                  }>
                  <EntypoIcon name="circle-with-plus" style={styles.icon2} />
                </TouchableOpacity>
              </View>
            </View>
            <UnitModal
              onHide={() => setShowUnitModal(false)}
              visible={showUnitModal}
              unit={spaceAvailable.advanceBookingTime.unit}
              onSelect={(value, unit) => {
                tempListingSpaceA({
                  advanceBookingTime: {
                    unit,
                    value
                  }
                });
                setShowUnitModal(false);
              }}
            />
            <Text style={styles.description}>
              Tip : Avoid cancelling or declining guests by only unblocking dates you can host.
            </Text>
          </>
        )}

        {activeIndex === 12 && (
          <>
            <Text style={styles.heading}>How long can guests stay?</Text>
            <View style={styles.rect10}>
              <View style={styles.iconRow}>
                <TouchableOpacity
                  onPress={() => {
                    if (
                      convertToUnit(spaceAvailable.minTime.value, spaceAvailable.minTime.unit) > 1
                    ) {
                      tempListingSpaceA({
                        minTime: {
                          ...spaceAvailable.minTime,
                          value: convertToMilliseconds(
                            convertToUnit(
                              spaceAvailable.minTime.value,
                              spaceAvailable.minTime.unit
                            ) - 1,
                            spaceAvailable.minTime.unit
                          )
                        }
                      });
                    }
                  }}>
                  <EntypoIcon name="circle-with-minus" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setShowUnitModal(true);
                    setHowLong('minTime');
                  }}
                  style={styles.unitButton}>
                  <Text style={styles.unitText}>
                    Min {convertToUnit(spaceAvailable.minTime.value, spaceAvailable.minTime.unit)}{' '}
                    {spaceAvailable.minTime.unit}
                  </Text>
                  <AntDesignIcon name="caretdown" style={styles.unitText} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    tempListingSpaceA({
                      minTime: {
                        ...spaceAvailable.minTime,
                        value: convertToMilliseconds(
                          convertToUnit(spaceAvailable.minTime.value, spaceAvailable.minTime.unit) +
                            1,
                          spaceAvailable.maxTime.unit
                        )
                      }
                    })
                  }>
                  <EntypoIcon name="circle-with-plus" style={styles.icon2} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.rect10}>
              <View style={styles.iconRow}>
                <TouchableOpacity
                  onPress={() => {
                    if (
                      convertToUnit(spaceAvailable.maxTime.value, spaceAvailable.maxTime.unit) > 1
                    ) {
                      tempListingSpaceA({
                        maxTime: {
                          ...spaceAvailable.maxTime,
                          value: convertToMilliseconds(
                            convertToUnit(
                              spaceAvailable.maxTime.value,
                              spaceAvailable.maxTime.unit
                            ) - 1,
                            spaceAvailable.maxTime.unit
                          )
                        }
                      });
                    }
                  }}>
                  <EntypoIcon name="circle-with-minus" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setShowUnitModal(true);
                    setHowLong('maxTime');
                  }}
                  style={styles.unitButton}>
                  <Text style={styles.unitText}>
                    Max {convertToUnit(spaceAvailable.maxTime.value, spaceAvailable.maxTime.unit)}{' '}
                    {spaceAvailable.maxTime.unit}
                  </Text>
                  <AntDesignIcon name="caretdown" style={styles.unitText} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    tempListingSpaceA({
                      maxTime: {
                        ...spaceAvailable.maxTime,
                        value: convertToMilliseconds(
                          convertToUnit(spaceAvailable.maxTime.value, spaceAvailable.maxTime.unit) +
                            1,
                          spaceAvailable.maxTime.unit
                        )
                      }
                    })
                  }>
                  <EntypoIcon name="circle-with-plus" style={styles.icon2} />
                </TouchableOpacity>
              </View>
            </View>
            <UnitModal
              onHide={() => setShowUnitModal(false)}
              visible={showUnitModal}
              unit={spaceAvailable[howLong].unit}
              onSelect={(value, unit) => {
                tempListingSpaceA({
                  [howLong]: {
                    unit,
                    value
                  }
                });
                setShowUnitModal(false);
              }}
            />
            <Text style={styles.description}>
              Tip : Shorter trips can mean more reservations but you might have to turn over your
              space more often.
            </Text>
          </>
        )}

        {activeIndex === 13 && (
          <>
            <Text style={styles.heading}>Which booking process do you prefer?</Text>
            <RadioListItem
              label="Instant Booking"
              checked={spaceAvailable.instantBooking}
              onPress={() =>
                tempListingSpaceA({
                  instantBooking: !spaceAvailable.instantBooking
                })
              }
            />
            <RadioListItem
              label="Approval is required"
              checked={!spaceAvailable.instantBooking}
              onPress={() =>
                tempListingSpaceA({
                  instantBooking: !spaceAvailable.instantBooking
                })
              }
            />
          </>
        )}
      </ScrollView>
      {activeIndex === 9 && (
        <BottomSheet
          ref={sheetRef}
          initialSnap={1}
          snapPoints={[300, 0]}
          borderRadius={20}
          renderContent={(props) => (
            <DatePicker
              {...props}
              type={picker.type}
              mode={picker.mode}
              date={new Date(picker.date)}
              onChange={picker.schedulePicker ? handleSchedulePickerChange : handlePickerChange}
              onClose={() => sheetRef.current.snapTo(1)}
              minuteInterval={15}
            />
          )}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  safeView: { flex: 1 },
  unitButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  unitText: {
    fontSize: 20
  },
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    // minHeight: Dimensions.get('window').height,
    paddingBottom: 80,
    paddingTop: 0
  },
  spaceAvailable: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24
  },
  heading: {
    color: 'rgba(11,64,148,1)',
    fontSize: 30,
    fontWeight: '700'
    // marginTop: 30,
    // marginVertical: 20
  },
  heading1: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    // marginTop: 30,
    marginVertical: 20
  },
  subHeading: {
    color: 'rgba(11,64,148,1)',
    fontSize: 20,
    fontWeight: '700'
    // marginTop: 40
  },
  subHeading1: {
    color: colors.primary,
    fontSize: 17,
    textDecorationLine: 'underline'
  },

  loremIpsum: {
    // fontFamily: 'roboto-300',
    color: 'rgba(11,64,148,1)',
    fontSize: 18,
    marginVertical: 21
  },
  rect: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d6d6d6',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  monday: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 20,
    marginLeft: 2,
    marginTop: 12
  },
  switch: {},
  text: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 20,
    marginTop: 37
  },
  materialRadio1: {
    height: 30,
    width: 30
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    fontSize: 17,
    marginLeft: 10
    // marginTop: 6,
  },
  materialRadio1Row: {
    height: 30,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center'
  },
  wrapper: {
    width: '49%'
  },
  button2: {
    width: '100%',
    height: 39,
    borderBottomWidth: 1,
    borderColor: 'rgba(182,182,182,1)'
  },
  startTime: {
    color: colors.black,
    fontSize: 16,
    marginTop: 9,
    textAlign: 'center'
  },
  button3: {
    width: '50%',
    height: 39,
    borderBottomWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    marginLeft: 38
  },
  endTime: {
    color: colors.black,
    fontSize: 16,
    marginTop: 9,
    textAlign: 'center'
  },
  button2Row: {
    height: 39,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 21,
    // marginLeft: 25,
    marginBottom: 30
  },
  materialRadio2: {
    height: 30,
    width: 30
  },
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    fontSize: 17,
    marginLeft: 10
  },
  materialRadio2Row: {
    height: 30,
    flexDirection: 'row',
    marginTop: 28,
    alignItems: 'center'
  },
  rect9: {
    width: 238,
    height: 38,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 10,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(39,170,225,1)',
    marginTop: 30,
    // marginLeft: 27,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loremIpsum4: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 13
  },
  loremIpsum5: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 17,
    marginTop: 30
  },
  required: {
    borderBottomColor: 'red'
  },
  requiredText: {
    color: 'red',
    marginTop: 5,
    fontSize: 13
  },
  button: {
    width: '100%',
    // height: 46,
    // borderBottomWidth: 1,
    // borderColor: 'rgba(214,214,214,1)',
    marginTop: 17
  },
  hour: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(0,0,0,1)',
    fontSize: 16,
    marginTop: 15
    // marginLeft: 13,
  },
  description: {
    // fontFamily: 'roboto-300',
    color: 'rgba(11,64,148,1)',
    lineHeight: 20,
    marginTop: 40,
    fontSize: 16
    // marginLeft: 28,
  },
  loremIpsum7: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 17,
    marginTop: 31
    // marginLeft: 29,
  },
  button4: {
    width: '100%',
    // height: 46,
    borderBottomWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    marginTop: 16
    // marginLeft: 26,
  },
  loremIpsum8: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginTop: 15
    // marginLeft: 11,
  },
  loremIpsum9: {
    // fontFamily: 'roboto-300',
    color: 'rgba(11,64,148,1)',
    lineHeight: 20,
    marginTop: 24
    // marginLeft: 29,
  },
  loremIpsum10: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 17,
    marginTop: 24
    // marginLeft: 29,
  },
  rect10: {
    // width: '100%',
    flexDirection: 'row',
    marginTop: 25
    // justifyContent: 'space-between'
  },
  label: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  icon: {
    color: colors.primary,
    fontSize: 30,
    marginBottom: -5
    // height: 34,
    // width: 34,
  },
  loremIpsum11: {
    color: colors.secondary,
    marginLeft: 20,
    // marginTop: 5,
    fontSize: 18,
    textAlign: 'center'
  },
  icon2: {
    color: colors.secondary,
    fontSize: 30,
    // height: 24,
    // width: 22,
    // marginLeft: 20
    marginBottom: -5
  },
  iconRow: {
    height: 24,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon5: {
    color: 'rgba(39,170,225,1)',
    fontSize: 20
  },
  instantBooking: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    marginLeft: 11
  },
  icon5Row: {
    height: 22,
    flexDirection: 'row',
    marginTop: 17,
    marginLeft: 28,
    marginRight: 222
  },
  icon6: {
    color: 'rgba(182,182,182,1)',
    fontSize: 20
  },
  approvalIsRequired: {
    // fontFamily: 'roboto-regular',
    color: '#0b4094',
    marginLeft: 12
  },
  icon6Row: {
    height: 22,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 28,
    marginRight: 195
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  backBtnText: {
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  materialButtonPrimary1: {
    width: 100,
    height: 36,
    marginVertical: 67,
    alignSelf: 'center'
    // marginLeft: 136,
  },
  materialButtonPrimary: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.secondary
    // marginLeft: 136,
  },
  timeRange: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    elevation: 5,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  timeText: {
    fontSize: 15,
    color: colors.secondary,
    fontWeight: '700'
  },
  removeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.error
  },
  materialCIcon: {
    fontSize: 28,
    color: colors.secondary
  },
  featherIcon: {
    fontSize: 20,
    color: colors.primary
  }
});

const mapStateToProps = ({ tempListing }) => ({
  spaceAvailable: tempListing.spaceAvailable,
  validated: tempListing.validated
});
export default connect(mapStateToProps, { tempListingSpaceA })(SpaceAvailable);
