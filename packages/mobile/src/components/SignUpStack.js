import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../screens/SignUp';
import SignUpForm from '../screens/SignUpForm';

const Stack = createStackNavigator();

export default function SignUpStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpForm"
        component={SignUpForm}
        options={{title: ''}}
      />
      {/* <Stack.Screen
        name='OTPScreen'
        component={OTPScreen}
        options={{ title: '' }}
      /> */}
    </Stack.Navigator>
  );
}
