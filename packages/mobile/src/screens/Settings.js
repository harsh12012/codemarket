import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

function Settings({navigation}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.settings}>Settings</Text>
      <View style={styles.rect}>
        <Text style={styles.pushNotifications}>Push Notifications</Text>
        <Switch
          value={true}
          trackColor={{true: 'rgba(39,170,225,1)'}}
          style={styles.switch}></Switch>
      </View>
      <View style={styles.rect1}>
        <Text style={styles.dataPreferences}>Data Preferences</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('TermsAndConditions');
        }}>
        <View style={styles.termsConditionsRow}>
          <Text style={styles.termsConditions}>Terms &amp; Conditions</Text>
          <IoniconsIcon
            name="ios-arrow-forward"
            style={styles.icon3}></IoniconsIcon>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => {
          navigation.navigate('PrivacyPolicy');
        }}>
        <View style={styles.privacyPolicyRow}>
          <Text style={styles.privacyPolicy}>Privacy Policy</Text>
          <IoniconsIcon
            name="ios-arrow-forward"
            style={styles.icon4}></IoniconsIcon>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button3}>
        <View style={styles.iconRow}>
          <EntypoIcon name="star" style={styles.icon}></EntypoIcon>
          <Text style={styles.loremIpsum}>RATE US IN THE APP STORE</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button4}>
        <View style={styles.icon2Row}>
          <IoniconsIcon name="ios-log-out" style={styles.icon2}></IoniconsIcon>
          <Text style={styles.logout}>LOGOUT</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button5}>
        <Text style={styles.deactivateAccount}>DEACTIVATE ACCOUNT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  settings: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24,
  },
  rect: {
    width: '100%',
    height: 65,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 20,
    shadowOpacity: 0.07,
    shadowRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    flexDirection: 'row',
    marginTop: 26,
    backgroundColor: '#fff',
  },
  pushNotifications: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginLeft: 15,
    marginTop: 23,
  },
  switch: {
    marginLeft: 133,
    marginTop: 21,
  },
  rect1: {
    width: '100%',
    height: 65,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 20,
    shadowOpacity: 0.07,
    shadowRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    marginTop: 17,
    backgroundColor: '#fff',
  },
  dataPreferences: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginTop: 23,
    marginLeft: 15,
  },
  button: {
    width: '100%',
    height: 65,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 20,
    shadowOpacity: 0.07,
    shadowRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    flexDirection: 'row',
    marginTop: 18,
    // marginLeft: 18,
    backgroundColor: '#fff',
  },
  termsConditions: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
  },
  icon3: {
    color: 'rgba(39,170,225,1)',
    fontSize: 20,
    height: 22,
    width: 7,
    marginLeft: 162,
  },
  termsConditionsRow: {
    height: 22,
    flexDirection: 'row',
    flex: 1,
    marginRight: 16,
    marginLeft: 15,
    marginTop: 23,
  },
  button2: {
    width: '100%',
    height: 65,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 20,
    shadowOpacity: 0.07,
    shadowRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  privacyPolicy: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
  },
  icon4: {
    color: 'rgba(39,170,225,1)',
    fontSize: 20,
    height: 22,
    width: 7,
    marginLeft: 202,
  },
  privacyPolicyRow: {
    height: 22,
    flexDirection: 'row',
    flex: 1,
    marginRight: 16,
    marginLeft: 15,
    marginTop: 23,
  },
  button3: {
    width: 209,
    height: 39,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 20,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(232,231,231,1)',
    flexDirection: 'row',
    marginTop: 96,
    // marginLeft: 83,
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  icon: {
    color: 'rgba(248,231,28,1)',
    fontSize: 20,
    height: 22,
    width: 20,
  },
  loremIpsum: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 11,
    marginLeft: 5,
    marginTop: 5,
  },
  iconRow: {
    height: 22,
    flexDirection: 'row',
    flex: 1,
    marginRight: 26,
    marginLeft: 18,
    marginTop: 8,
  },
  button4: {
    width: 209,
    height: 39,
    backgroundColor: 'rgba(39,170,225,1)',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10,
    },
    elevation: 60,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    flexDirection: 'row',
    marginTop: 12,
    // marginLeft: 83,
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  icon2: {
    color: 'rgba(255,255,255,1)',
    fontSize: 20,
    height: 22,
    width: 16,
  },
  logout: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 11,
    marginLeft: 10,
    marginTop: 5,
  },
  icon2Row: {
    height: 22,
    flexDirection: 'row',
    flex: 1,
    marginRight: 73,
    marginLeft: 68,
    marginTop: 8,
  },
  button5: {
    width: 209,
    height: 39,
    backgroundColor: 'rgba(245,73,73,1)',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10,
    },
    elevation: 60,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginTop: 12,
    // marginLeft: 83,
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  deactivateAccount: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 11,
    marginTop: 13,
    marginLeft: 47,
  },
});

export default Settings;
