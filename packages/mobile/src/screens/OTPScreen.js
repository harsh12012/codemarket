import React, {useState, Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AppLogo from '../components/AppLogo';

const OTP = '123456';

function OTPScreen({navigation}) {
  const [otp, setOtp] = useState('');

  const onSubmitHandler = () => {
    if (otp) {
      if (otp.length < 6) {
        Alert.alert('OTP length incorrect', 'Please input a 6 digit OTP');
      } else {
        if (otp === OTP) {
          navigation.navigate('Tabs');
        } else {
          Alert.alert('Incorrect OTP', 'Please input a valid OTP');
        }
      }
    } else {
      Alert.alert('Missing Input', 'Please input a 6 digit OTP');
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppLogo />
      <View style={styles.scrollArea}>
        <Text style={styles.loremIpsum3}>Enter your Temporary Code</Text>
        <View style={styles.rect}>
          <View style={styles.enterCodeRow}>
            <Text style={styles.enterCode}>ENTER CODE :</Text>
            <TextInput
              placeholder="XXXXXX"
              placeholderTextColor="rgba(237,235,235,0.62)"
              style={styles.xxxxxx}
              maxLength={6}
              value={otp}
              onChangeText={(input) => setOtp(input)}
              keyboardType="numeric"></TextInput>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.resendOtp}>Resend OTP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
          <Text style={styles.enter}>Enter</Text>
        </TouchableOpacity>
        <Text style={styles.loremIpsum2}>
          By creating or using an Account you agree to the {'\n'}ParkYourself
          Terms &amp; Conditions and Privacy Policy
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
  },
  scrollArea: {
    width: '100%',
    height: 470,
    backgroundColor: 'rgba(39,170,225,1)',
    marginTop: 49,
    alignItems: 'center',
  },
  loremIpsum3: {
    // fontFamily: 'roboto-500',
    color: 'rgba(246,246,246,1)',
    fontSize: 24,
    marginTop: 59,
    // marginLeft: 41,
  },
  rect: {
    width: 314,
    height: 86,
    borderWidth: 2,
    borderColor: 'rgba(252,252,252,1)',
    borderRadius: 7,
    flexDirection: 'row',
    marginTop: 38,
    // marginLeft: 30,
  },
  enterCode: {
    // fontFamily: 'roboto-500',
    color: 'rgba(237,235,235,1)',
    fontSize: 22,
    opacity: 0.62,
  },
  xxxxxx: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(250,248,248,1)',
    height: 26,
    width: 94,
    fontSize: 22,
    marginLeft: 13,
  },
  enterCodeRow: {
    height: 26,
    flexDirection: 'row',
    flex: 1,
    marginRight: 31,
    marginLeft: 36,
    marginTop: 30,
  },
  resendOtp: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(231,229,229,1)',
    textDecorationLine: 'underline',
    marginTop: 13,
    marginLeft: 230,
    // alignSelf: 'flex-end',
  },
  button: {
    width: 314,
    height: 56,
    backgroundColor: 'rgba(249,249,249,1)',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 150,
    shadowOpacity: 0.33,
    shadowRadius: 50,
    marginTop: 36,
    // marginLeft: 30,
  },
  enter: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 17,
    marginTop: 18,
    marginLeft: 138,
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(245,245,245,1)',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 34,
    // marginLeft: 14,
  },
});

export default OTPScreen;
