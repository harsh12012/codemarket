import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '@parkyourself-frontend/shared/config/colors';
import { View, StyleSheet, Text, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import ScreenTittle from '../common/ScreenTittle';
import BookingList from './BookingList';
import FilterButton from '../common/FilterButton';
import BookingFilter from './BookingFilter';
import moment from 'moment';
import DatepickerRange from 'react-native-range-datepicker';
import ParkingOrderFilter from './ParkingOrderFilter';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
// import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs({
  driverId = null,
  ownerId = null,
  listingId = null,
  showHeader = true,
  parkingOrder = false,
  screen,
  title = null,
  ...props
}) {
  const [range, setRange] = useState({
    startDate: null,
    endDate: null,
    displayedDate: moment()
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('');
  const [displayDate, setDisplayDate] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [displayTime, setDisplayTime] = useState(false);
  const [time, setTime] = useState(new Date());

  const [visit, setVisit] = React.useState([30, 70]);
  const [amount, setAmount] = React.useState([30, 70]);

  const applyFilter = () => {
    console.log('applied filter');
  };

  const clearDate = () => {
    setRange({
      startDate: null,
      endDate: null,
      displayedDate: moment()
    });
    setActiveFilter('');
  };

  return (
    <>
      <Modal animationType="slide" transparent={true} visible={displayTime}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ height: '100%', width: '100%', zIndex: 10 }}>
            <DateTimePicker
              testID="dateTimePicker"
              // value={time}
              mode={'time'}
              is24Hour={true}
              display="default"
              onChange={(val) => setTime(val)}
              // style={{ flex: 1, zIndex: 20, elevation: 20 }}
            />
          </View>
        </SafeAreaView>
      </Modal>

      <Modal
        style={{ backgroundColor: 'red', height: '100%' }}
        animationType="slide"
        transparent={true}
        visible={displayDate}>
        <SafeAreaView style={{ flex: 1 }}>
          <DatepickerRange
            startDate={range.startDate || new Date()}
            untilDate={range.endDate || new Date()}
            buttonColor={colors.primary}
            placeHolderStart="Start Date"
            placeHolderUntil="End Date"
            selectedBackgroundColor={colors.primary}
            todayColor={colors.primary}
            onClose={() => {
              // setModalVisible(false);
              // setShowModal(false);
            }}
            onConfirm={(start, end) => {
              // let newDate = {
              //   startDate: start,
              //   endDate: end,
              //   displayedDate: moment()
              // };

              // setRange({ ...range, ...newDate });

              // setModalVisible(false);
              // setShowModal(false);
              setDisplayDate(false);
              setShowFilter(false);
            }}
          />
        </SafeAreaView>
      </Modal>

      {title === 'Parking Orders' && (
        <React.Fragment>
          <ParkingOrderFilter
            range={range}
            setRange={setRange}
            setModalVisible={(val) => setModalVisible(val)}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            setDisplayDate={setDisplayDate}
            displayeDate={displayDate}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            applyFilter={applyFilter}
            setDisplayTime={setDisplayTime}
            amount={amount}
            setAmount={setAmount}
            visit={visit}
            setVisit={setVisit}
          />

          <View style={styles.myListings4Row}>
            <ScreenTittle title={`Parking Orders`} />

            <View style={styles.rect}>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  onPress={() => setShowFilter(true)}
                  style={[
                    {
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 60
                    }
                  ]}>
                  {/* <FontAwesomeIcon
                    name="filter"
                    style={[
                      styles.icon,
                      {
                        borderWidth: 1,
                        borderColor: 'rgba(214,214,214,1)',
                        borderRadius: 7,
                        width: 30,
                        height: 28,
                        padding: 7
                      }
                    ]} */}
                       <MaterialCommunityIcon name="filter-variant" size={28}  
                  />
                  {/* <A name="downcircleo" style={styles.icon} /> */}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </React.Fragment>
      )}

      {showHeader && title !== 'Parking Orders' && (
        <View style={styles.headerView}>
          <ScreenTittle title={title || 'Bookings'} />
          <FilterButton modalVisible={modalVisible}>
            <BookingFilter
              range={range}
              setRange={setRange}
              setModalVisible={(val) => setModalVisible(val)}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          </FilterButton>
        </View>
      )}

      {/* {!!range.startDate || !!range.endDate ? ( */}
      <React.Fragment>
        <View
          style={{
            backgroundColor: '#fff',
            marginLeft: 20,
            display: 'flex',
            flexDirection: 'row'
          }}>
          <Text style={{ color: colors.secondary }}>
            {!!range.startDate && moment(range?.startDate).format('ll')}
            {!!range.endDate && ' ' + '-' + ' ' + moment(range?.endDate).format('ll')}
          </Text>
          {!!range?.startDate || !!range?.endDate ? (
            <TouchableOpacity onPress={clearDate} style={{ marginLeft: 10 }}>
              <Text>X</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        {/* <BookingList
            status="pending"
            driverId={driverId}
            ownerId={ownerId}
            listingId={listingId}
            parkingOrder={parkingOrder}
            screen={screen}
            range={range}
            //  {...props}
          /> */}
      </React.Fragment>
      {/* ) : ( */}
      <Tab.Navigator
        tabBarOptions={{
          scrollEnabled: true,
          activeTintColor: colors.secondary,
          indicatorStyle: {
            backgroundColor: colors.primary
          },
          labelStyle: { fontWeight: 'bold' }
        }}
        initialRouteName="UPCOMING">
        <Tab.Screen name="PENDING">
          {(props) => (
            <BookingList
              status="pending"
              driverId={driverId}
              ownerId={ownerId}
              listingId={listingId}
              parkingOrder={parkingOrder}
              screen={screen}
              range={range}
              visit={visit}
              amount={amount}
              {...props}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="UPCOMING">
          {(props) => (
            <BookingList
              {...props}
              status="upcoming"
              driverId={driverId}
              ownerId={ownerId}
              listingId={listingId}
              parkingOrder={parkingOrder}
              screen={screen}
              range={range}
              visit={visit}
              amount={amount}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="CURRENT">
          {(props) => (
            <BookingList
              {...props}
              status="current"
              driverId={driverId}
              ownerId={ownerId}
              listingId={listingId}
              parkingOrder={parkingOrder}
              screen={screen}
              range={range}
              visit={visit}
              amount={amount}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="COMPLETED">
          {(props) => (
            <BookingList
              {...props}
              status="completed"
              driverId={driverId}
              ownerId={ownerId}
              listingId={listingId}
              parkingOrder={parkingOrder}
              screen={screen}
              range={range}
              visit={visit}
              amount={amount}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="CANCELLED">
          {(props) => (
            <BookingList
              {...props}
              status="cancelled"
              driverId={driverId}
              ownerId={ownerId}
              listingId={listingId}
              parkingOrder={parkingOrder}
              screen={screen}
              range={range}
              visit={visit}
              amount={amount}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
      {/* )} */}
    </>
  );
}

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rect: {
    width: 93,
    // backgroundColor: 'red',
    // height: 80,
    // shadowColor: 'rgba(0,0,0,1)',
    // shadowOffset: {
    //   width: 3,
    //   height: 3
    // },
    elevation: 30,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    flexDirection: 'row',
    marginLeft: 98
  },
  buttonRow: {
    // height: 29,
    flexDirection: 'column',
    flex: 1
  },
  myListings4Row: {
    // height: 40,
    flexDirection: 'row',
    // marginBottom: 20,
    justifyContent: 'space-between',
    padding: 10
  },
  icon: {
    color: 'rgba(11,64,148,1)',
    fontSize: 16,
    height: 16,
    width: 15,
    marginTop: 6,
    marginLeft: 9
  }
});
