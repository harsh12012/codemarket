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
import colors from '@parkyourself-frontend/shared/config/colors';
import Svg, { Ellipse } from 'react-native-svg';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import AppLogo from '../../components/AppLogo';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Auth } from 'aws-amplify';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      verify: false,
      code: '',
      disabled: false,
      auth: false
    };
  }

  signUp = async (payload) => {
    const { password, email, name } = payload;
    try {
      const res = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
          name: name,
          picture:
            'https://parkyourselfbucket154227-dev.s3.amazonaws.com/public/default/default.jpg'
        }
      });
      this.setState({
        ...this.state,
        email: email,
        verify: true,
        disabled: false
      });
    } catch (error) {
      this.setState({ ...this.state, disabled: false });
      Alert.alert('Error', error.message);
    }
  };

  confirmSignUp = async (payload) => {
    const { email } = this.state;
    const { code } = payload;
    try {
      const res = await Auth.confirmSignUp(email, code);
      this.setState({
        code: '',
        email: '',
        disabled: false,
        auth: true,
        verify: false
      });
      Alert.alert('Email Verified Successfully', 'Please Sign In now with your email and password');
      this.props.navigation.navigate('SignInForm');
    } catch (error) {
      this.setState({ ...this.state, disabled: false });
      Alert.alert('Error', error.message);
    }
  };

  handleSubmit = (payload) => {
    console.log('payload', payload);
    const { verify } = this.state;
    this.setState({ ...this.state, disabled: true });
    if (verify) {
      this.confirmSignUp(payload);
    } else {
      this.signUp(payload);
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <AppLogo />
        <View style={styles.scrollArea}>
          {!this.state.verify ? (
            <Fragment>
              <Text style={styles.signUp}>Sign Up</Text>
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  password: ''
                }}
                onSubmit={this.handleSubmit}
                validationSchema={yup.object().shape({
                  name: yup.string().required('Name is required'),
                  email: yup.string().email().required('Email is required'),
                  password: yup.string().min(6).required('Password is required')
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
                        icon={() => <EntypoIcon name="user" style={styles.icon} />}
                        placeholder="Name"
                        value={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={() => setFieldTouched('name')}
                      />
                      {touched.name && errors.name && (
                        <Text style={styles.error}>{errors.name}</Text>
                      )}
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
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                      {this.state.disabled ? (
                        <ActivityIndicator color="#27aae1" size="large" />
                      ) : (
                        <Text style={styles.createAccount}>Create Account</Text>
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
                  code: '199'
                }}
                onSubmit={this.handleSubmit}
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
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                      {this.state.disabled ? (
                        <ActivityIndicator color="#27aae1" size="large" />
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
    color: colors.white,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  scrollArea: {
    width: '100%',
    height: 670,
    backgroundColor: 'rgba(39,170,225,1)',
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
    marginTop: 20,
    width: '90%',
    minHeight: 60,
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  createAccount: {
    color: colors.primary,
    fontSize: 20
  },
  loremIpsum2: {
    color: colors.lightGrey,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 23,
    marginTop: 22
  }
});

export default SignUpForm;
