import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import SignInForm from '../screens/SignInForm';
import ForgotPassword from '../screens/ForgotPassword';

const Stack = createStackNavigator();

export default function SignInStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
          title: '',
        }}
      />
      <Stack.Screen
        name="SignInForm"
        component={SignInForm}
        options={{title: ''}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
}
