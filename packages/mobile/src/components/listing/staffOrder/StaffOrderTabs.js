import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '@parkyourself-frontend/shared/config/colors';
import { View, StyleSheet } from 'react-native';
import ScreenTittle from '../../common/ScreenTittle';
import StaffOrderList from './StaffOrderList';
import FilterButton from '../../common/FilterButton';
import BookingFilter from './BookingFilter';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs({
  driverId = null,
  ownerId = null,
  listingId = null,
  showHeader = true,
  parkingOrder = false,
  screen
}) {
  return (
    <>
      {showHeader && (
        <View style={styles.headerView}>
          <ScreenTittle title="BOOKINGS" />
          <FilterButton>
            <BookingFilter />
          </FilterButton>
        </View>
      )}
      <Tab.Navigator
        tabBarOptions={{
          // scrollEnabled: true,
          activeTintColor: colors.secondary,
          indicatorStyle: {
            backgroundColor: colors.primary
          },
          labelStyle: { fontWeight: 'bold' }
        }}
        initialRouteName="CHECK-IN GUESTS">
        <Tab.Screen name="CHECK-IN GUESTS">
          {(props) => (
            <StaffOrderList
              {...props}
              status="upcoming"
              driverId={driverId}
              ownerId={ownerId}
              listingId={listingId}
              parkingOrder={parkingOrder}
              screen={screen}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="CHECK-OUT GUESTS">
          {(props) => (
            <StaffOrderList
              {...props}
              status="current"
              driverId={driverId}
              ownerId={ownerId}
              listingId={listingId}
              parkingOrder={parkingOrder}
              screen={screen}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
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
