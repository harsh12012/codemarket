import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MaterialButtonPrimary from './MaterialButtonPrimary';

function AdditionTimeAddedModal(props) {
  return (
    <View style={styles.rect}>
      <Text style={styles.additionTimeAdded}>Addition Time Added</Text>
      <Text style={styles.loremIpsum}>
        Your Booked time for parking location 906 Peg Shop St. Franklyn, NY
        11209 on Today, 09:00AM to Tommorow 09:00PM has been successfully
        included with 2 More hours. You can view your updated booking details by
        clicking below button.
      </Text>
      <MaterialButtonPrimary
        caption="VIEW DETAILS"
        style={styles.materialButtonPrimary}></MaterialButtonPrimary>
    </View>
  );
}

const styles = StyleSheet.create({
  rect: {
    width: 339,
    height: 359,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 6,
    marginTop: 182,
    marginLeft: 18,
  },
  additionTimeAdded: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 22,
    marginTop: 16,
    marginLeft: 18,
  },
  loremIpsum: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 17,
    lineHeight: 26,
    marginTop: 28,
    marginLeft: 18,
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
    marginTop: 34,
    marginLeft: 105,
  },
});

export default AdditionTimeAddedModal;
