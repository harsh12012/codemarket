import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import colors from '@parkyourself-frontend/shared/config/colors';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppLogo from '../../components/AppLogo';

function SignIn({ navigation }) {
  const [signinMode, setSigninMode] = useState(true);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppLogo />
      <View style={styles.rect}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => Auth.federatedSignIn({ provider: 'Facebook' })}>
          <View style={styles.socialIconRow}>
            <EntypoIcon name="facebook" style={styles.socialIcon} />
            <Text style={styles.socialLabel}>Sign in with Facebook</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialButton, { backgroundColor: 'rgba(234,66,53,1)' }]}
          onPress={() => Auth.federatedSignIn({ provider: 'Google' })}>
          <View style={styles.socialIconRow}>
            <MaterialCommunityIconsIcon name="google" style={styles.socialIcon} />
            <Text style={styles.socialLabel}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialButton, { backgroundColor: colors.white }]}
          onPress={() => navigation.navigate(signinMode ? 'SignInForm' : 'SignUpForm')}>
          <View style={styles.socialIconRow}>
            <Text style={[styles.socialLabel, { color: colors.primary }]}>{`${
              signinMode ? 'Sign in' : 'Sign up'
            } with Email & Mobile Number`}</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.loremIpsum3}>If you are New user, Please Sign Up Below</Text>
        <TouchableOpacity
          style={[
            styles.socialButton,
            {
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: colors.white,
              elevation: 0,
              shadowRadius: 0,
              shadowOpacity: 0
            }
          ]}
          onPress={() => setSigninMode(!signinMode)}>
          <View style={styles.socialIconRow}>
            <Text style={styles.socialLabel}>{`SIGN ${signinMode ? 'UP' : 'IN'}`}</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.loremIpsum4}>By creating or using an Account you agree to the</Text>
        <Text style={styles.loremIpsum5}>
          ParkYouself Terms &amp; Conditions and Privacy Policy
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 50
  },
  rect: {
    paddingHorizontal: '5%',
    backgroundColor: colors.primary,
    marginTop: 45,
    alignItems: 'center',
    flex: 1,
    paddingTop: 20
  },
  socialButton: {
    marginVertical: 10,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(51,88,158,1)',
    justifyContent: 'center',
    borderRadius: 5,
    shadowColor: 'rgba(39,39,39,0.4)',
    shadowOffset: {
      width: 10,
      height: 10
    },
    elevation: 30,
    shadowOpacity: 0.72,
    shadowRadius: 50
  },
  socialIconRow: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    minHeight: 60
    // paddingVertical: 15,
  },
  socialIcon: {
    color: colors.white,
    fontSize: 25,
    marginRight: 10
  },
  socialLabel: {
    color: colors.white,
    fontSize: 18
  },
  loremIpsum3: {
    color: colors.white,
    opacity: 0.66,
    letterSpacing: 0,
    fontSize: 15,
    marginTop: 30
    // marginLeft: 60,
  },
  loremIpsum4: {
    color: colors.white,
    marginTop: 20
  },
  loremIpsum5: {
    color: colors.white,
    marginTop: 4
  }
});

export default SignIn;
