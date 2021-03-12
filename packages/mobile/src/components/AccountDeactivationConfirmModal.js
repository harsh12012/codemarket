import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

function AccountDeactivationConfirmModal(props) {
  return (
    <View style={styles.container}>
      <Icon name="exclamation" style={styles.icon}></Icon>
      <Text style={styles.accountDeactivation}>Account Deactivation</Text>
      <View style={styles.rect}></View>
      <Text style={styles.loremIpsum}>
        You have chosen the option to deactivate your account. You will not be
        able to regain this account and its details.
      </Text>
      <Text style={styles.loremIpsum2}>
        Are you sure you want to deactivate this Account?
      </Text>
      <View style={styles.rect2Row}>
        <View style={styles.rect2}>
          <Text style={styles.yes}>YES</Text>
        </View>
        <View style={styles.rect3}>
          <Text style={styles.no}>NO</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    color: 'rgba(229,84,84,1)',
    fontSize: 141,
    marginTop: 10,
    alignSelf: 'center',
  },
  accountDeactivation: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 18,
    marginTop: 6,
    marginLeft: 83,
  },
  rect: {
    width: 282,
    height: 2,
    backgroundColor: '#E6E6E6',
    marginTop: 28,
    marginLeft: 29,
  },
  loremIpsum: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 49,
    marginLeft: 34,
  },
  loremIpsum2: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 36,
    marginLeft: 34,
  },
  rect2: {
    width: 125,
    height: 41,
    backgroundColor: 'rgba(251,89,89,1)',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 90,
    shadowOpacity: 0.15,
    shadowRadius: 30,
  },
  yes: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    marginTop: 12,
    marginLeft: 49,
  },
  rect3: {
    width: 125,
    height: 41,
    backgroundColor: 'rgba(39,170,225,1)',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10,
    },
    elevation: 90,
    shadowOpacity: 0.15,
    shadowRadius: 30,
    marginLeft: 21,
  },
  no: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    marginTop: 12,
    marginLeft: 52,
  },
  rect2Row: {
    height: 41,
    flexDirection: 'row',
    marginTop: 43,
    marginLeft: 34,
    marginRight: 35,
  },
});

export default AccountDeactivationConfirmModal;
