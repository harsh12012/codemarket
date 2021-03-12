import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '@parkyourself-frontend/shared/config/colors';
import { View, StyleSheet } from 'react-native';
import ScreenTittle from '../../common/ScreenTittle';
import FilterButton from '../../common/FilterButton';
import UsersList from './UsersList';
import UserFilter from './UserFilter';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  const [activeFilter, setActiveFilter] = useState(null);

  return (
    <>
      <View style={styles.headerView}>
        <ScreenTittle title="USERS" />
        <FilterButton>
          <UserFilter setActiveFilter={setActiveFilter} activeFilter={activeFilter} />
        </FilterButton>
      </View>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.secondary,
          indicatorStyle: {
            backgroundColor: colors.primary
          },
          labelStyle: { fontWeight: 'bold' }
        }}>
        <Tab.Screen name="All">
          {(props) => <UsersList {...props} activeFilter={activeFilter} />}
        </Tab.Screen>
        <Tab.Screen name="Drivers">
          {(props) => <UsersList {...props} driver={true} activeFilter={activeFilter} />}
        </Tab.Screen>
        <Tab.Screen name="Space Owners">
          {(props) => <UsersList {...props} spaceOwner={true} activeFilter={activeFilter} />}
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
