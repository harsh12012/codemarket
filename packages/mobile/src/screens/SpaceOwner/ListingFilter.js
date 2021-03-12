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
  applyFilter
}) {
  const [showModal, setShowModal] = useState(false);

  let oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() - 1);

  useEffect(() => {
    setModalVisible(true);
  }, []);
  const [activeAddress, setActiveAddress] = useState([]);

  // console.log(activeAddress);

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
              <Text style={{ fontSize: 18 }}>
                Kindly select specfic properties to view booking for only those properties
              </Text>
              <View style={{ marginTop: 20 }}>
                {!!address &&
                  address.map((item) => (
                    <RadioButton
                      checked={activeAddress.includes(item)}
                      onPress={() => {
                        setActiveFilter(item);
                        if (!activeAddress.includes(item)) {
                          let tempAdd = [...activeAddress];
                          tempAdd.push(item);
                          setActiveAddress(tempAdd);
                        } else {
                          let tempAdd = [...activeAddress];

                          let deletedAdd = activeAddress.filter((id) => item !== id);

                          setActiveAddress(deletedAdd);
                        }

                        setModalVisible(false);
                        let newDate = {
                          startDate: dateFilterConfig.oneDayBack,
                          endDate: new Date(),
                          displayedDate: moment()
                        };
                        setRange({ ...range, ...newDate });
                      }}
                      label={item}
                    />
                  ))}
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
  rangeText: { marginLeft: 5 }
});
