import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import Analytics from '@aws-amplify/analytics';
import AsyncStorage from '@react-native-community/async-storage';
import colors from '@parkyourself-frontend/shared/config/colors';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { useSignin } from '@parkyourself-frontend/shared/hooks/auth';
import * as yup from 'yup';
import { Formik } from 'formik';
import AppLogo from '../../components/AppLogo';
// import { useAddUserEndpoint } from '@parkyourself-frontend/shared/hooks/users';

const onAlert = (title, message) => {
  Alert.alert(title, message);
};

const getEndpoint = async () => {
  const deviceToken = await AsyncStorage.getItem('deviceToken');
  // console.log('deviceToken', deviceToken);
  if (deviceToken) {
    Alert.alert('Device Push Notification token', deviceToken);
    const endpoint = Analytics.getPluggable('AWSPinpoint')._config.endpointId;
    Analytics.updateEndpoint({
      address: deviceToken
    });
    if (endpoint) {
      await AsyncStorage.setItem('endpoint', endpoint);
      return endpoint;
    }
  }
  return null;
};

export default function SignInForm(props) {
  const { state, setState, onSubmit } = useSignin({ mobile: true, onAlert, getEndpoint });

  // const addUserEndpoint = useAddUserEndpoint();

  // const onSubmit = async () => {
  //   try {
  //     await addUserEndpoint({
  //       username: 'ac7e598c-86dc-4668-9eef-8f21b0b6b3ed',
  //       endpoint: 'sample'
  //     });
  //     onAlert('addUserEndpoint', 'Success');
  //   } catch (error) {
  //     onAlert('Error', error.message);
  //   }
  // };

  return (
    <ScrollView style={styles.container}>
      <View style={{ backgroundColor: colors.white }}>
        <AppLogo />
      </View>
      <View style={styles.scrollArea}>
        {!state.verify ? (
          <>
            <Text style={styles.signUp}>Sign In</Text>
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              onSubmit={onSubmit}
              validationSchema={yup.object().shape({
                email: yup.string().email().required('Email is required'),
                password: yup.string().min(8).required('Password is required')
              })}>
              {({
                values,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                isValid,
                handleSubmit
              }) => (
                <>
                  <View style={styles.inputList}>
                    <Input
                      icon={() => <IoniconsIcon name="md-mail-open" style={styles.icon} />}
                      placeholder="Email"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={() => setFieldTouched('email')}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.error}>{errors.email}</Text>
                    )}
                    <Input
                      icon={() => <IoniconsIcon name="ios-lock-closed" style={styles.icon} />}
                      placeholder="Password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={() => setFieldTouched('password')}
                      secureTextEntry={true}
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="password"
                    />
                    {touched.password && errors.password && (
                      <Text style={styles.error}>{errors.password}</Text>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('ForgotPassword')}
                    style={{ width: '100%' }}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    {state.disabled ? (
                      <ActivityIndicator color="#27aae1" size="large" />
                    ) : (
                      <Text style={styles.createAccount}>Sign In</Text>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </>
        ) : (
          <>
            <Text style={styles.signUp}>Verify OTP</Text>
            <Text style={styles.codeMessage}>
              Verification code has been sent to {'\n'}
              {state.email}
            </Text>
            <Formik
              initialValues={{
                code: '199'
              }}
              onSubmit={onSubmit}
              validationSchema={yup.object().shape({
                code: yup.string().required('Verification code is required')
              })}>
              {({
                values,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                isValid,
                handleSubmit
              }) => (
                <>
                  <View style={styles.inputList}>
                    <Input
                      icon={() => <IoniconsIcon name="ios-lock-closed" style={styles.icon} />}
                      placeholder="Code"
                      value={values.code}
                      onChangeText={handleChange('code')}
                      onBlur={() => setFieldTouched('code')}
                      keyboardType="numeric"
                    />
                    {touched.code && errors.code && <Text style={styles.error}>{errors.code}</Text>}
                  </View>
                  <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    {state.disabled ? (
                      <ActivityIndicator color="blue" size="large" />
                    ) : (
                      <Text style={styles.createAccount}>Verify OTP</Text>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </>
        )}

        <Text style={styles.loremIpsum2}>
          By creating or using an Account you agree to the {'\n'}ParkYourself{' '}
          <Text style={{ textDecorationLine: 'underline' }}>Terms &amp; Conditions</Text> and{' '}
          <Text style={{ textDecorationLine: 'underline' }}>Privacy Policy</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const Input = ({ icon: Icon, placeholder, ...rest }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconContainer}>
        <Icon />
      </View>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="rgba(217,217,217,1)"
        style={styles.textInput}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  codeMessage: {
    color: colors.white,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary
  },
  forgotPassword: {
    color: colors.lightGrey,
    fontSize: 14,
    marginTop: 13,
    textAlign: 'right',
    paddingRight: '5%'
  },
  scrollArea: {
    flex: 1,
    backgroundColor: colors.primary,
    marginTop: 17,
    alignItems: 'center'
  },
  signUp: {
    color: 'rgba(252,250,250,1)',
    fontSize: 26,
    marginTop: 20,
    marginBottom: 5
  },
  inputList: {
    display: 'flex',
    width: '90%'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    borderBottomColor: 'rgba(217,217,217,1)',
    borderBottomWidth: 1,
    paddingVertical: 10,
    width: '100%'
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b4094',
    borderRadius: 50,
    marginRight: 15,
    width: 36,
    height: 36
  },
  icon: {
    fontSize: 25,
    color: colors.white
  },
  textInput: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    fontSize: 20,
    color: colors.white
  },
  error: { fontSize: 12, color: 'red', textAlign: 'right' },
  button: {
    borderRadius: 5,
    minHeight: 60,
    marginTop: 20,
    width: '90%',
    backgroundColor: colors.white,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 10,
      height: 10
    },
    elevation: 150,
    shadowOpacity: 0.33,
    shadowRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  createAccount: {
    color: 'rgba(39,170,225,1)',
    fontSize: 20
  },
  loremIpsum2: {
    color: 'rgba(245,245,245,1)',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 23,
    marginTop: 22
  }
});
