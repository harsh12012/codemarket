import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '@parkyourself-frontend/shared/config/colors';
import { useGetAllUser } from '@parkyourself-frontend/shared/hooks/users';
import dateFilter from '@parkyourself-frontend/shared/config/dateFilter';
import dateFilterConfig from '@parkyourself-frontend/shared/config/dateFilter';
import { View, StyleSheet, Text } from 'react-native';
import ScreenTittle from '../../common/ScreenTittle';
import UsersList from './UsersList';
import FilterButton from '../../common/FilterButton';
import BookingFilter from './UserRangeFilter';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs({ driver, spaceOwner, activeFilter }) {
  const [date, setDate] = useState({
    startDate: new Date(dateFilterConfig.oneDayBack),
    endDate: new Date(),
    key: 'selection'
  });

  const [range, setRange] = useState({
    startDate: null,
    endDate: null,
    key: 'selection',
    displayedDate: moment()
  });

  const clearDate = () => {
    setRange({
      startDate: null,
      endDate: null,
      displayedDate: moment()
    });
  };

  const filterStartDate = date?.startDate?.toString();
  const filterEndDate = date?.endDate?.toString();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={styles.headerView}>
        <ScreenTittle title="REGISTRATION STATS" />
        <FilterButton modalVisible={modalVisible}>
          <BookingFilter
            range={range}
            setRange={(val) => setRange(val)}
            setModalVisible={(val) => setModalVisible(val)}
          />
        </FilterButton>
      </View>

      {!!range?.startDate || !!range?.endDate ? (
        <>
          <View
            style={{
              backgroundColor: '#fff',
              marginLeft: 20,
              display: 'flex',
              flexDirection: 'row'
            }}>
            <Text style={{ color: colors.secondary }}>
              {!!range.startDate && moment(range?.startDate).format('LL')}
              {!!range.endDate && ' ' + '-' + ' ' + moment(range?.endDate).format('LL')}
            </Text>
            {!!range?.startDate || !!range?.endDate ? (
              <TouchableOpacity onPress={clearDate} style={{ marginLeft: 10 }}>
                <Text>X</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <UsersList
            showTime={true}
            higherRange={range.endDate}
            lowerRange={range.startDate}
            // {...props}
          />
        </>
      ) : (
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: colors.secondary,
            indicatorStyle: {
              backgroundColor: colors.primary
            },
            labelStyle: { fontWeight: 'bold' }
          }}>
          <Tab.Screen name="Today">
            {(props) => (
              <UsersList
                showTime={true}
                higherRange={filterEndDate}
                lowerRange={filterStartDate}
                {...props}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Last Week">
            {(props) => (
              <UsersList
                showTime={true}
                higherRange={new Date()}
                lowerRange={dateFilterConfig.oneWeekBack}
                {...props}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Last Month">
            {(props) => (
              <UsersList
                showTime={true}
                higherRange={new Date()}
                lowerRange={dateFilterConfig.oneMonthBack}
                {...props}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      )}
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
  }
});
