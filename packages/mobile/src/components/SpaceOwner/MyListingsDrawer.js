import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MyListingsStack from './MyListingsStack';
import AppDrawer from '../common/AppDrawer';
const drawer = createDrawerNavigator();

export default function MyListingsDrawer() {
  return (
    <drawer.Navigator drawerContent={() => <AppDrawer />}>
      <drawer.Screen name="MyListingsStack" component={MyListingsStack} />
    </drawer.Navigator>
  );
}
