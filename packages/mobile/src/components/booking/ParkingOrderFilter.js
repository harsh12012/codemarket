import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TouchableNativeFeedback
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '@parkyourself-frontend/shared/config/colors';
import moment from 'moment';
import DatepickerRange from 'react-native-range-datepicker';
import RadioButton from '../../components/common/RadioButton';
import dateFilterConfig from '@parkyourself-frontend/shared/config/dateFilter';
import MaterialButtonPrimary from '../../components/MaterialButtonPrimary';
// import MultiSlider from '../Slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Picker } from '@react-native-community/picker';

export default function ListingFilter({
  activeFilter,
  setActiveFilter,
  range,
  setRange,
  setModalVisible,
  setDisplayDate,
  displayDate,
  showFilter,
  setShowFilter,
  address,
  applyFilter,
  setDisplayTime,
  amount,
  setAmount,
  visit,
  setVisit
}) {
  const [showModal, setShowModal] = useState(false);

  let oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() - 1);

  useEffect(() => {
    setModalVisible(true);
  }, []);
  const [activeAddress, setActiveAddress] = useState([]);

  return (
    <>
      <Modal
        style={{ backgroundColor: 'rgba(52, 52, 52, 0.3)' }}
        animationType="slide"
        transparent={true}
        visible={showFilter}>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.3)', flexDirection: 'row' }}>
          <TouchableNativeFeedback onPress={() => setShowFilter(false)}>
            <View
              style={{
                // flex: 1,
                // backgroundColor: '#fff',
                // width: '80%',
                width: '20%',
                backgroundColor: 'rgba(52, 52, 52, 0.3)',
                paddingHorizontal: 20
              }}></View>
          </TouchableNativeFeedback>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              width: '80%',
              // marginLeft: '20%',
              paddingHorizontal: 20
            }}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                marginVertical: 20,
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <Text style={{ fontWeight: '800', fontSize: 24 }}>Filter</Text>
              <TouchableNativeFeedback onPress={() => setShowFilter(false)}>
                <Text style={{ fontWeight: '800', fontSize: 18 }}>Cancel</Text>
              </TouchableNativeFeedback>
            </View>

            <View>
              <Text style={{ fontSize: 18 }}>Kindly set the below filter option</Text>
              <TouchableOpacity onPress={() => setDisplayDate(true)} style={styles.filterText}>
                <MaterialCommunityIcon name="calendar-clock" size={25} />
                <Text style={styles.rangeText}>Date Range</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterText}>
                <MaterialCommunityIcon name="map-marker" size={25} />
                <Picker
                  selectedValue={''}
                  style={{ height: 30, width: 200 }}
                  onValueChange={(itemValue, itemIndex) => console.log(itemValue)}>
                  <Picker.Item label="Set Location" value="" />
                </Picker>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => {
                  setShowFilter(false);
                  setDisplayTime(true);
                }}
                style={styles.filterText}>
                <MaterialCommunityIcon name="clock-time-three-outline" size={25} />
                <Text style={styles.rangeText}>Set the time of day</Text>
              </TouchableOpacity> */}

              <View style={{ marginTop: 10 }}>
                <Text style={styles.rangeText}>Length of Visit</Text>
                <Text>{visit[0] + ' days' + ' - ' + visit[1] + ' days'}</Text>
                <MultiSlider
                  values={[visit[0], visit[1]]}
                  sliderLength={250}
                  onValuesChange={(val) => setVisit(val)}
                  min={0}
                  max={100}
                  step={1}
                  allowOverlap
                  snapped
                  selectedStyle={{
                    backgroundColor: colors.primary
                  }}
                  markerStyle={{
                    backgroundColor: colors.primary,
                    color: colors.primary
                  }}
                />
              </View>

              <TouchableOpacity style={styles.filterText}>
                <MaterialCommunityIcon name="account" size={25} />
                <Picker
                  selectedValue={''}
                  style={{ height: 30, width: 200 }}
                  onValueChange={(itemValue, itemIndex) => console.log(itemValue)}>
                  <Picker.Item label="Driver Name" value="" />
                </Picker>
              </TouchableOpacity>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.rangeText}>Amount</Text>
                <Text>{'$ ' + amount[0] + ' - ' + '$ ' + amount[1]}</Text>
                <MultiSlider
                  values={[amount[0], amount[1]]}
                  sliderLength={250}
                  onValuesChange={(val) => setAmount(val)}
                  min={0}
                  max={1000}
                  step={10}
                  allowOverlap
                  snapped
                  selectedStyle={{
                    backgroundColor: colors.primary
                  }}
                  markerStyle={{
                    backgroundColor: colors.primary,
                    color: colors.primary
                  }}
                />
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
              }}>
              <MaterialButtonPrimary
                caption="SAVE"
                onPress={() => {
                  setShowFilter(false);
                  applyFilter(activeAddress);
                }}
                style={styles.materialButtonPrimary}></MaterialButtonPrimary>
            </View>
          </View>
          {/* <MultiSlider /> */}
        </SafeAreaView>
      </Modal>
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
  materialButtonPrimary: {
    width: 140,
    height: 36,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 60,
    shadowOpacity: 0.3,
    shadowRadius: 20,
    marginTop: 29
    // marginLeft: 1
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
  rangeText: { marginLeft: 5 },
  filterText: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row'
  }
});
