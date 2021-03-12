import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AppDrawer from './common/AppDrawer';
import FindParkingStack from './FindParkingStack';
const drawer = createDrawerNavigator();

export default function FindParkingDrawer() {
  return (
    <drawer.Navigator drawerContent={() => <AppDrawer />}>
      <drawer.Screen name="FindParkingStack" component={FindParkingStack} />
    </drawer.Navigator>
  );
}
