import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MaterialButtonPrimary from './MaterialButtonPrimary';

function CancelBookingModal(props) {
  return (
    <View style={styles.rect}>
      <Text style={styles.bookingCancellation}>Booking Cancellation</Text>
      <Text style={styles.loremIpsum}>
        Your booking for parking location 906 Peg Shop St. Franklyn, Ny 11209
        has been successfully cancelled.
      </Text>
      <Text style={styles.details}>Details :</Text>
      <Text style={styles.loremIpsum2}>Start : Jan-01 2019, 04:30 PM</Text>
      <Text style={styles.loremIpsum3}>End : Jan-02 2019, 03:00 PM</Text>
      <MaterialButtonPrimary
        caption="VIEW DETAILS"
        style={styles.materialButtonPrimary}></MaterialButtonPrimary>
    </View>
  );
}

const styles = StyleSheet.create({
  rect: {
    width: 348,
    height: 390,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 6,
    marginTop: 168,
    marginLeft: 13,
  },
  bookingCancellation: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 22,
    marginTop: 16,
    marginLeft: 17,
  },
  loremIpsum: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 17,
    lineHeight: 26,
    marginTop: 25,
    marginLeft: 17,
  },
  details: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 17,
    marginTop: 57,
    marginLeft: 17,
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 17,
    marginTop: 16,
    marginLeft: 17,
  },
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 17,
    marginTop: 10,
    marginLeft: 17,
  },
  materialButtonPrimary: {
    width: 130,
    height: 36,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 60,
    shadowOpacity: 0.32,
    shadowRadius: 20,
    marginTop: 32,
    marginLeft: 103,
  },
});

export default CancelBookingModal;
