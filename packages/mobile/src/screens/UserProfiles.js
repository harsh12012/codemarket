/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
import React from 'react';
import { connect } from 'react-redux';
import colors from '@parkyourself-frontend/shared/config/colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet, Dimensions } from 'react-native';
import { toggleProfileType } from '@parkyourself-frontend/shared/redux/actions/user';
import PersonalProfile from './driver/PersonalProfile';
import BusinessProfile from './driver/BusinessProfile';

const Tab = createMaterialTopTabNavigator(); 
const ScreenWidth = Dimensions.get('window').width;

function UserProfiles({profileType, toggleProfileType, navigation}) {
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
                tabStyle: styles.tabStyle
            }}
            lazy
            initialRouteName={profileType === 'personal' ? "PERSONAL" : "BUSINESS"} 
        >
            <Tab.Screen 
                name="PERSONAL"
                listeners={{
                    tabPress : e => {
                        // e.preventDefault();
                        if(profileType === 'business') toggleProfileType();
                    }
                }}
            >
                {() => ( 
                    <PersonalProfile navigation={navigation} />
                )}
            </Tab.Screen>
            <Tab.Screen 
             name="BUSINESS"
             listeners={{
                tabPress : e => {
                    // e.preventDefault();
                    if(profileType === 'personal') toggleProfileType();
                }
            }}
            >
                {() => ( 
                    <BusinessProfile navigation={navigation} />
                )}
            </Tab.Screen>
        </Tab.Navigator>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 0,
        minHeight: '100%'
    },
    labelStyle: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 13,
      letterSpacing: 0.4
    },
    tabStyle: {
        width: ScreenWidth/2
    },
});

export default connect(null, { toggleProfileType })(UserProfiles);