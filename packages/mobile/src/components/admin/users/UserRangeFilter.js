import React, { useEffect, useState } from 'react';
import { Text, View, Modal, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '@parkyourself-frontend/shared/config/colors';
import moment from 'moment';
import DatepickerRange from 'react-native-range-datepicker';

export default function BookingFilter({
  activeFilter,
  setActiveFilter,
  range,
  setRange,
  setModalVisible
}) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setModalVisible(true);
  }, []);

  return (
    <>
      <Modal style={{}} animationType="slide" transparent={true} visible={showModal}>
        <SafeAreaView style={styles.safeView}>
          <DatepickerRange
            startDate={range.startDate || new Date()}
            untilDate={range.endDate || new Date()}
            buttonColor={colors.primary}
            placeHolderStart="Start Date"
            placeHolderUntil="End Date"
            selectedBackgroundColor={colors.primary}
            todayColor={colors.primary}
            onClose={() => {
              setModalVisible(false);
              setShowModal(false);
            }}
            onConfirm={(start, end) => {
              let newDate = {
                startDate: start,
                endDate: end,
                displayedDate: moment()
              };

              setRange({ ...range, ...newDate });

              setModalVisible(false);
              setShowModal(false);
            }}
          />
        </SafeAreaView>
      </Modal>
      <View style={styles.filterBox}>
        <View style={styles.header}>
          <MaterialCommunityIcon name="filter-variant" size={28} />
          <Text style={styles.headerText}>FILTER BY</Text>
        </View>
        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.dateRangeButton}>
          <MaterialCommunityIcon name="calendar-clock" size={25} />
          <Text style={styles.rangeText}>Date Range</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  safeView: { flex: 1 },
  filterBox: {
    backgroundColor: colors.white,
    borderRadius: 1,
    borderColor: colors.primary,
    borderWidth: 1,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderBottomWidth: 1
  },
  headerText: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5
  },
  dateRangeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 1
  },
  rangeText: { marginLeft: 5 }
});
