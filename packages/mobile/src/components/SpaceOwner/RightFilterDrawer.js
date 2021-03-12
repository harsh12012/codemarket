import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MaterialCheckbox from '../components/MaterialCheckbox';
import MaterialButtonPrimary from '../components/MaterialButtonPrimary';

function RightFilterDrawer(props) {
  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        <Text style={styles.filter}>Filter</Text>
        <Text style={styles.cancel}>Cancel</Text>
      </View>
      <Text style={styles.loremIpsum}>
        Kindly select specific Properties to view booking for only those Properties
      </Text>
      <View style={styles.materialCheckboxRow}>
        <MaterialCheckbox style={styles.materialCheckbox}></MaterialCheckbox>
        <Text style={styles.loremIpsum2}>906 Peg Shop St. Franklyn, NY 11209</Text>
      </View>
      <View style={styles.materialCheckbox1Row}>
        <MaterialCheckbox style={styles.materialCheckbox1}></MaterialCheckbox>
        <Text style={styles.loremIpsum3}>906 Peg Shop St. Franklyn, NY 11209</Text>
      </View>
      <View style={styles.materialCheckbox2Row}>
        <MaterialCheckbox style={styles.materialCheckbox2}></MaterialCheckbox>
        <Text style={styles.loremIpsum4}>906 Peg Shop St. Franklyn, NY 11209</Text>
      </View>
      <View style={styles.materialCheckbox3Row}>
        <MaterialCheckbox style={styles.materialCheckbox3}></MaterialCheckbox>
        <Text style={styles.loremIpsum5}>906 Peg Shop St. Franklyn, NY 11209</Text>
      </View>
      <View style={styles.materialCheckbox4Row}>
        <MaterialCheckbox style={styles.materialCheckbox4}></MaterialCheckbox>
        <Text style={styles.loremIpsum6}>906 Peg Shop St. Franklyn, NY 11209</Text>
      </View>
      <View style={styles.materialCheckbox5Row}>
        <MaterialCheckbox style={styles.materialCheckbox5}></MaterialCheckbox>
        <Text style={styles.loremIpsum7}>906 Peg Shop St. Franklyn, NY 11209</Text>
      </View>
      <MaterialButtonPrimary
        caption="SAVE"
        style={styles.materialButtonPrimary}></MaterialButtonPrimary>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  filter: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24
  },
  cancel: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    fontSize: 16,
    marginLeft: 149,
    marginTop: 4
  },
  filterRow: {
    height: 29,
    flexDirection: 'row',
    marginTop: 25,
    marginLeft: 24,
    marginRight: 23
  },
  loremIpsum: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 17,
    lineHeight: 24,
    marginTop: 35,
    marginLeft: 21
  },
  materialCheckbox: {
    width: 28,
    height: 25
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    marginLeft: 5,
    marginTop: 7
  },
  materialCheckboxRow: {
    height: 25,
    flexDirection: 'row',
    marginTop: 71,
    marginLeft: 19,
    marginRight: 19
  },
  materialCheckbox1: {
    width: 28,
    height: 25
  },
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    marginLeft: 5,
    marginTop: 7
  },
  materialCheckbox1Row: {
    height: 25,
    flexDirection: 'row',
    marginTop: 23,
    marginLeft: 19,
    marginRight: 19
  },
  materialCheckbox2: {
    width: 28,
    height: 25
  },
  loremIpsum4: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    marginLeft: 5,
    marginTop: 7
  },
  materialCheckbox2Row: {
    height: 25,
    flexDirection: 'row',
    marginTop: 21,
    marginLeft: 19,
    marginRight: 19
  },
  materialCheckbox3: {
    width: 28,
    height: 25
  },
  loremIpsum5: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    marginLeft: 5,
    marginTop: 7
  },
  materialCheckbox3Row: {
    height: 25,
    flexDirection: 'row',
    marginTop: 21,
    marginLeft: 19,
    marginRight: 19
  },
  materialCheckbox4: {
    width: 28,
    height: 25
  },
  loremIpsum6: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    marginLeft: 5,
    marginTop: 7
  },
  materialCheckbox4Row: {
    height: 25,
    flexDirection: 'row',
    marginTop: 21,
    marginLeft: 19,
    marginRight: 19
  },
  materialCheckbox5: {
    width: 28,
    height: 25
  },
  loremIpsum7: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    marginLeft: 5,
    marginTop: 7
  },
  materialCheckbox5Row: {
    height: 25,
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 19,
    marginRight: 19
  },
  materialButtonPrimary: {
    width: 100,
    height: 36,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 10,
      height: 10
    },
    elevation: 60,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    marginTop: 221,
    marginLeft: 94
  }
});

export default RightFilterDrawer;
