import React, {Component} from 'react';
import {StyleSheet, View, Text, Modal, ScrollView} from 'react-native';
import MaterialButtonPrimary from '../MaterialButtonPrimary';

function VariableVsFlatModal({visible, onPress}) {
  return (
    <Modal animationType="slide" visible={visible}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Variable Rates Vs Flat Rates</Text>
        <Text style={styles.description}>
          Charging a flat rate means Guests will pay a fixed price per day
          regardless of how many hours they reserve. Variable rate means they
          will be charged based on the exact time they reserve.
        </Text>
        <Text style={styles.heading}>Which one should I use?</Text>
        <Text style={styles.description}>
          If your listing is in an area where drivers need short term parking
          throughtout the day we recommend charging a variable rate to encourage
          more reservations. If your listing is near a venue and will be mostly
          be used by drivers during events we recommend charging a flat rate so
          you get exactly what your space is worth. You can change your rate
          type for specific dates at any time using the calendar feature.
        </Text>
        <MaterialButtonPrimary
          onPress={onPress}
          caption="OK"
          style={styles.materialButtonPrimary1}></MaterialButtonPrimary>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 25,
  },
  heading: {
    color: '#27aae1',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 30,
    marginVertical: 10,
    // textAlign: 'center',
  },
  subHeading: {
    color: '#27aae1',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20,
  },
  loremIpsum: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 17,
    marginTop: 28,
    alignSelf: 'center',
    fontWeight: '700',
  },
  description: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 20,
    lineHeight: 22,
    marginTop: 21,
    // textAlign: 'center',
    alignSelf: 'center',
    // marginHorizontal: 30,
  },
  loremIpsum3: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 17,
    marginTop: 41,
    alignSelf: 'center',
    fontWeight: '700',
  },
  loremIpsum4: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    lineHeight: 18,
    marginTop: 24,
    textAlign: 'center',
    alignSelf: 'center',
    marginHorizontal: 30,
  },
  materialButtonPrimary1: {
    width: 120,
    height: 40,
    backgroundColor: 'rgba(39,170,225,1)',
    marginVertical: 45,
    alignSelf: 'center',
  },
});

export default VariableVsFlatModal;
