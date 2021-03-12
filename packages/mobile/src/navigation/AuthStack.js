import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from '../screens/auth/Auth';
import SignInForm from '../screens/auth/SignInForm';
import SignUpForm from '../screens/auth/SignUpForm';
import ForgotPassword from '../screens/auth/ForgotPassword';

const Stack = createStackNavigator();

export default function SignInStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0
        }
      }}>
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{
          headerShown: false,
          title: ''
        }}
      />
      <Stack.Screen name="SignUpForm" component={SignUpForm} options={{ title: '' }} />
      <Stack.Screen name="SignInForm" component={SignInForm} options={{ title: '' }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: '' }} />
    </Stack.Navigator>
  );
}
