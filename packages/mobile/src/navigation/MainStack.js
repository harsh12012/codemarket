/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import UserStack from './UserStack';
import AuthStack from './AuthStack';

const Stack = createStackNavigator();

function MainStack({ authenticated, admin, adminMode }) {
  return (
    <Stack.Navigator>
      {authenticated ? (
        <Stack.Screen name="UserStack" component={UserStack} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}

const mapStateToProps = ({ auth, user }) => {
  return {
    authenticated: auth.authenticated,
    admin: auth.data.admin,
    initial: auth.initial,
    adminMode: user.adminMode
  };
};

export default connect(mapStateToProps)(MainStack);
