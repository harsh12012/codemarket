import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AppDrawer from './common/AppDrawer';
import DashboardStack from './DashboardStack';
const drawer = createDrawerNavigator();

export default function DashboardDrawer({navigation}) {
  return (
    <drawer.Navigator
      drawerContent={() => <AppDrawer navigation={navigation} />}>
      <drawer.Screen name="DashboardStack" component={DashboardStack} />
    </drawer.Navigator>
  );
}
