import React, { Fragment, Component } from 'react';
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
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import * as yup from 'yup';
import { Formik } from 'formik';
import AppLogo from '../../components/AppLogo';
import authServices from '../../app/services/auth.service';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      verify: false,
      code: '',
      disabled: false,
      auth: false,
      forgetPassword: false
    };
  }

  forgotPassword = async (payload) => {
    const { email } = payload;

    // const onSuccess = () => {
    //   this.setState({
    //     ...this.state,
    //     email: email,
    //     verify: true,
    //     disabled: false,
    //   });
    // };

    // const onFailure = (error) => {
    //   this.setState({...this.state, disabled: false});
    //   if (error.code === 'UserNotConfirmedException') {
    //     this.sendVerificationCode(email);
    //   } else {
    //     Alert.alert('Error', error.message);
    //   }
    // };

    // authServices.forgetPasswordService(onSuccess, onFailure, email)
    try {
      await authServices.forgetPasswordService(email);
      this.setState({
        ...this.state,
        email: email,
        verify: true,
        disabled: false
      });
    } catch (error) {
      this.setState({ ...this.state, disabled: false });
      if (error.code === 'UserNotConfirmedException') {
        this.sendVerificationCode(email);
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  resetPassword = async (payload) => {
    const { email } = this.state;
    const { code, password } = payload;

    try {
      await authServices.resetPasswordService(email, code, password);
      this.setState({
        code: '',
        email: '',
        disabled: false,
        verify: false
      });
      Alert.alert(
        'Password changed Successfully',
        'Please Sign In now with your email and password'
      );
      this.props.navigation.navigate('SignInForm');
    } catch (error) {
      this.setState({ ...this.state, disabled: false });
      Alert.alert('Error', error.message);
    }
  };

  handleSubmit = (payload) => {
    const { verify } = this.state;
    this.setState({ ...this.state, disabled: true });
    if (verify) {
      this.resetPassword(payload);
    } else {
      this.forgotPassword(payload);
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <AppLogo />
        <View style={styles.scrollArea}>
          {!this.state.verify ? (
            <Fragment>
              <Text style={styles.signUp}>Reset Password</Text>
              <Formik
                initialValues={{
                  email: ''
                }}
                onSubmit={this.handleSubmit}
                validationSchema={yup.object().shape({
                  email: yup.string().email().required('Email is required')
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
                  <Fragment>
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
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                      {this.state.disabled ? (
                        <ActivityIndicator color="#27aae1" size="large" />
                      ) : (
                        <Text style={styles.createAccount}>Reset Password</Text>
                      )}
                    </TouchableOpacity>
                  </Fragment>
                )}
              </Formik>
            </Fragment>
          ) : (
            <Fragment>
              <Text style={styles.signUp}>Verify OTP</Text>
              <Text style={styles.codeMessage}>
                Verification code has been sent to {'\n'}
                {this.state.email}
              </Text>
              <Formik
                initialValues={{
                  code: '',
                  password: '',
                  confirmPassword: ''
                }}
                onSubmit={this.handleSubmit}
                validationSchema={yup.object().shape({
                  code: yup.string().required('Verification code is required'),
                  password: yup.string().min(8).required('Password is required'),
                  confirmPassword: yup
                    .string()
                    .min(8)
                    .required('Password is required')
                    .test('passwords-match', 'Passwords must match', function (value) {
                      return this.parent.password === value;
                    })
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
                  <Fragment>
                    <View style={styles.inputList}>
                      <Input
                        icon={() => <IoniconsIcon name="ios-lock-closed" style={styles.icon} />}
                        placeholder="Code"
                        value={values.code}
                        onChangeText={handleChange('code')}
                        onBlur={() => setFieldTouched('code')}
                        keyboardType="numeric"
                      />
                      {touched.code && errors.code && (
                        <Text style={styles.error}>{errors.code}</Text>
                      )}
                      <Input
                        icon={() => <IoniconsIcon name="ios-lock-closed" style={styles.icon} />}
                        placeholder="New Password"
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
                      <Input
                        icon={() => <IoniconsIcon name="ios-lock-closed" style={styles.icon} />}
                        placeholder="Confirm New Password"
                        value={values.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={() => setFieldTouched('confirmPassword')}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        textContentType="password"
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <Text style={styles.error}>{errors.confirmPassword}</Text>
                      )}
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                      {this.state.disabled ? (
                        <ActivityIndicator color="blue" size="large" />
                      ) : (
                        <Text style={styles.createAccount}>Verify OTP</Text>
                      )}
                    </TouchableOpacity>
                  </Fragment>
                )}
              </Formik>
            </Fragment>
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
    color: '#fff',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  forgotPassword: {
    //fontFamily: 'roboto-regular',
    color: 'rgba(227,221,221,1)',
    fontSize: 14,
    marginTop: 13,
    marginLeft: 200
  },
  scrollArea: {
    width: '100%',
    height: 670,
    backgroundColor: 'rgba(39,170,225,1)',
    marginTop: 17,
    // display: 'flex',
    alignItems: 'center'
    // flexDirection: 'column',
  },
  signUp: {
    color: 'rgba(252,250,250,1)',
    fontSize: 26,
    marginTop: 20,
    marginBottom: 5
  },
  inputList: {
    display: 'flex',
    // flexDirection: 'row',
    // alignItems: 'center',
    width: '80%'
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
    color: '#fff'
  },
  textInput: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 20,
    color: '#fff'
  },
  error: { fontSize: 12, color: 'red', textAlign: 'right' },
  button: {
    marginTop: 20,
    width: '80%',
    height: 56,
    backgroundColor: 'rgba(249,249,249,1)',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 10,
      height: 10
    },
    elevation: 150,
    shadowOpacity: 0.33,
    shadowRadius: 50,

    display: 'flex',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  createAccount: {
    //fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 20
  },
  loremIpsum2: {
    //fontFamily: 'roboto-regular',
    color: 'rgba(245,245,245,1)',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 23,
    marginTop: 22
    // marginLeft: 14,
  }
});

export default ForgotPassword;
