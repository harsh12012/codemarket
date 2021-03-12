/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react';
import colors from '@parkyourself-frontend/shared/config/colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet, Dimensions } from 'react-native';
import ParkingOrders from './SpaceOwner/ParkingOrders';

const Tab = createMaterialTopTabNavigator();
const ScreenWidth = Dimensions.get('window').width;

const ParkingOrderRoles = () => {
    return(
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
                    tabStyle: styles.tabStyle
                }}
                lazy
                initialRouteName='SPACE OWNER'
            >
                <Tab.Screen
                    name="SPACE OWNER"
                >
                    {() => <ParkingOrders />}
                </Tab.Screen>
                <Tab.Screen
                    name="DRIVER"
                >
                    {() => <View />}
                </Tab.Screen>
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

export default ParkingOrderRoles;