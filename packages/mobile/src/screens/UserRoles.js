import React from 'react';
import { useSelector, connect } from 'react-redux';
import colors from '@parkyourself-frontend/shared/config/colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet, Dimensions } from 'react-native';
import { toggleUserType } from '@parkyourself-frontend/shared/redux/actions/user';
import SpaceOwnerDashboard from './SpaceOwner/SpaceOwnerDashboard';
import DriverDashboard from './Dashboard';
import AdminDashboard from './admin/AdminDashboard';

const Tab = createMaterialTopTabNavigator();
const ScreenWidth = Dimensions.get('window').width;

function UserRoles({ navigation, toggleUserType, admin }) {
  const isSpaceOwner = useSelector(({ user }) => user.isSpaceOwner);

  return (
    <View style={styles.container}>
      <Tab.Navigator
        swipeEnabled={false}
        tabBarOptions={{
          scrollEnabled: true,
          activeTintColor: colors.secondary,
          indicatorStyle: {
            backgroundColor: colors.primary
          },
          labelStyle: styles.labelStyle,
          tabStyle: admin ? styles.tabStyleAdmin : styles.tabStyle
        }}
        lazy
        initialRouteName={isSpaceOwner ? 'SPACE OWNER' : 'DRIVER'}>
        <Tab.Screen
          name="SPACE OWNER"
          listeners={{
            tabPress: (e) => {
              // e.preventDefault();
              if (!isSpaceOwner) toggleUserType();
            }
          }}>
          {() => <SpaceOwnerDashboard navigation={navigation} isSpaceOwner={isSpaceOwner} />}
        </Tab.Screen>
        <Tab.Screen
          name="DRIVER"
          listeners={{
            tabPress: (e) => {
              // e.preventDefault();
              if (isSpaceOwner) toggleUserType();
            }
          }}>
          {() => <DriverDashboard navigation={navigation} isSpaceOwner={isSpaceOwner} />}
        </Tab.Screen>
        {admin && (
          <Tab.Screen name="ADMIN">{() => <AdminDashboard navigation={navigation} />}</Tab.Screen>
        )}
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 0
  },
  labelStyle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    letterSpacing: 0.4
  },
  tabStyle: {
    width: ScreenWidth / 2
  },
  tabStyleAdmin: {
    width: ScreenWidth / 3
  }
});

const mapStateToProps = ({ auth }) => ({
  admin: auth.data.admin
});

export default connect(mapStateToProps, { toggleUserType })(UserRoles);
