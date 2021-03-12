import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import MaterialButtonPrimary from './MaterialButtonPrimary';
import Svg, {Ellipse} from 'react-native-svg';

function AddMoreTimeModal(props) {
  return (
    <View style={styles.rect}>
      <Text style={styles.addMoreTime}>Add More Time</Text>
      <Text style={styles.loremIpsum}>
        For your current booking for location
      </Text>
      <Text style={styles.loremIpsum2}>
        906 Peg Shop St. Franklyn, NY 11209
      </Text>
      <Text style={styles.loremIpsum3}>
        on Today, 09:00AM to Tommorow, 09:00PM is going to be include with more
        additional time by below chosen time option
      </Text>
      <Text style={styles.loremIpsum4}>
        Choose below time you need to Add More
      </Text>
      <Text style={styles.additionalTime}>Additional Time</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.loremIpsum5}>30 minutes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
          <Text style={styles.loremIpsum6}>1 hour</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button3}>
          <Text style={styles.loremIpsum7}>2 hours</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rect2}>
        <Text style={styles.selectCustomHour}>Select custom hour</Text>
      </View>
      <MaterialButtonPrimary
        caption="ADD MORE TIME"
        style={styles.materialButtonPrimary}></MaterialButtonPrimary>
      <Svg viewBox="0 0 100 100" style={styles.ellipse}>
        <Ellipse
          stroke="rgba(230, 230, 230,1)"
          strokeWidth={0}
          fill="rgba(230, 230, 230,1)"
          cx={50}
          cy={50}
          rx={50}
          ry={50}></Ellipse>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  rect: {
    width: 344,
    height: 440,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 9,
    marginTop: 161,
    marginLeft: 16,
  },
  addMoreTime: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 22,
    marginTop: 15,
    marginLeft: 96,
  },
  loremIpsum: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginTop: 32,
    marginLeft: 18,
  },
  loremIpsum2: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 16,
    marginTop: 6,
    marginLeft: 17,
  },
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    lineHeight: 22,
    marginTop: 3,
    marginLeft: 18,
    marginRight: 16,
  },
  loremIpsum4: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginTop: 17,
    marginLeft: 19,
  },
  additionalTime: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 16,
    marginTop: 2,
    marginLeft: 20,
  },
  button: {
    width: 92,
    height: 34,
    shadowColor: 'rgba(196,193,193,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
  },
  loremIpsum5: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 13,
    marginTop: 10,
    marginLeft: 12,
  },
  button2: {
    width: 92,
    height: 34,
    shadowColor: 'rgba(196,193,193,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    marginLeft: 15,
  },
  loremIpsum6: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 13,
    marginTop: 10,
    marginLeft: 27,
  },
  button3: {
    width: 92,
    height: 34,
    shadowColor: 'rgba(196,193,193,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    marginLeft: 15,
  },
  loremIpsum7: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 13,
    marginTop: 10,
    marginLeft: 23,
  },
  buttonRow: {
    height: 34,
    flexDirection: 'row',
    marginTop: 17,
    marginLeft: 20,
    marginRight: 18,
  },
  rect2: {
    width: 309,
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    marginTop: 14,
    marginLeft: 19,
  },
  selectCustomHour: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginTop: 12,
    marginLeft: 13,
  },
  materialButtonPrimary: {
    width: 140,
    height: 36,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 60,
    shadowOpacity: 0.3,
    shadowRadius: 20,
    marginTop: 29,
    marginLeft: 100,
  },
  ellipse: {
    width: 100,
    height: 100,
    marginTop: 21,
    marginLeft: 739,
  },
});

export default AddMoreTimeModal;
