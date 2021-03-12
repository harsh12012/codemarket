import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SpaceOwnerDashboardStack from './SpaceOwnerDashboardStack';
import AppDrawer from '../common/AppDrawer';
const drawer = createDrawerNavigator();

export default function SpaceOwnerDrawer() {
  return (
    <drawer.Navigator drawerContent={() => <AppDrawer />}>
      <drawer.Screen name="SpaceOwnerDashboardStack" component={SpaceOwnerDashboardStack} />
    </drawer.Navigator>
  );
}
