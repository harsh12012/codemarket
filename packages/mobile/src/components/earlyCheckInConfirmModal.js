import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MaterialButtonPrimary from './MaterialButtonPrimary';

function EarlyCheckInConfirmModal(props) {
  return (
    <View style={styles.rect}>
      <Text style={styles.loremIpsum}>Early Check-In Confirmation</Text>
      <Text style={styles.loremIpsum2}>
        Your early check-in for parking location 906 Peg Shop St. Franklyn, NY
        11209 has been successfully confirmed. Updated timings are as below:
      </Text>
      <Text style={styles.details}>Details :</Text>
      <Text style={styles.loremIpsum3}>Start: Jan-01 2019, 04:30 PM</Text>
      <Text style={styles.loremIpsum4}>End: Jan-02 2019, 03:00 PM</Text>
      <View style={styles.materialButtonPrimaryRow}>
        <MaterialButtonPrimary
          caption="VIEW DETAILS"
          style={styles.materialButtonPrimary}></MaterialButtonPrimary>
        <MaterialButtonPrimary
          caption="OK"
          style={styles.materialButtonPrimary2}></MaterialButtonPrimary>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rect: {
    width: 335,
    height: 390,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    marginTop: 188,
    marginLeft: 21,
  },
  loremIpsum: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 22,
    marginTop: 18,
    marginLeft: 18,
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 17,
    lineHeight: 24,
    marginTop: 31,
    marginLeft: 20,
  },
  details: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 17,
    marginTop: 60,
    marginLeft: 18,
  },
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginTop: 10,
    marginLeft: 18,
  },
  loremIpsum4: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginTop: 5,
    marginLeft: 18,
  },
  materialButtonPrimary: {
    width: 135,
    height: 36,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 60,
    shadowOpacity: 0.32,
    shadowRadius: 20,
  },
  materialButtonPrimary2: {
    width: 135,
    height: 36,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 60,
    shadowOpacity: 0.32,
    shadowRadius: 20,
    marginLeft: 19,
  },
  materialButtonPrimaryRow: {
    height: 36,
    flexDirection: 'row',
    marginTop: 22,
    marginLeft: 23,
    marginRight: 23,
  },
});

export default EarlyCheckInConfirmModal;
