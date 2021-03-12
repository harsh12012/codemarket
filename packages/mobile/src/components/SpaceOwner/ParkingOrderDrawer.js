import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ParkingOrdersStack from './ParkingOrdersStack';
import AppDrawer from '../common/AppDrawer';
const drawer = createDrawerNavigator();

export default function ParkingOrderDrawer() {
  return (
    <drawer.Navigator drawerContent={() => <AppDrawer />}>
      <drawer.Screen name="ParkingOrdersStack" component={ParkingOrdersStack} />
    </drawer.Navigator>
  );
}
