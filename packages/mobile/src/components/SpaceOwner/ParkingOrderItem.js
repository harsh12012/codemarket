import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import MaterialButtonPrimary from '../MaterialButtonPrimary';

function ParkingOrderItem({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.rect6Stack}>
        <View style={styles.rect6}>
          <Text style={styles.loremIpsum4}>Booked by : John Baritsow</Text>
          <View style={styles.materialButtonPrimary1Row}>
            <MaterialButtonPrimary
              caption="$90 RECIEVED"
              style={styles.materialButtonPrimary1}></MaterialButtonPrimary>
            <View style={styles.rect5}>
              <Text style={styles.moreDetails}>MORE DETAILS</Text>
            </View>
          </View>
        </View>
        <View style={styles.rect4}>
          <View style={styles.rect3Stack}>
            <View style={styles.rect3}>
              <Text style={styles.manager1}>Manager</Text>
            </View>
            <Text style={styles.loremIpsum2}>
              906 Peg Shop St. Franklyn, NY, 11209
            </Text>
          </View>
          <Text style={styles.loremIpsum3}>
            aug-1,2019 1:00PM to Aug-1,2019 4:00PM
          </Text>
        </View>
        <View style={styles.rect2}>
          <Image
            source={require('../assets/images/cars1.jpg')}
            resizeMode="stretch"
            style={styles.image1}></Image>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rect6: {
    top: 2,
    left: 0,
    width: 340,
    height: 180,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(197,196,196,1)',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10,
    },
    elevation: 60,
    shadowOpacity: 0.17,
    shadowRadius: 20,
  },
  loremIpsum4: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    marginTop: 84,
    marginLeft: 89,
  },
  materialButtonPrimary1: {
    height: 36,
    width: 170,
  },
  rect5: {
    width: 130,
    height: 36,
    borderWidth: 1,
    borderColor: 'rgba(39,170,225,1)',
    marginLeft: 11,
    marginTop: 1,
  },
  moreDetails: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 12,
    marginTop: 13,
    marginLeft: 25,
  },
  materialButtonPrimary1Row: {
    height: 37,
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 17,
    marginRight: 12,
  },
  rect4: {
    top: 0,
    left: 1,
    width: 340,
    height: 85,
    position: 'absolute',
  },
  rect3: {
    top: 0,
    left: 186,
    width: 50,
    height: 20,
    position: 'absolute',
    backgroundColor: 'rgba(39,170,225,0.2)',
  },
  manager1: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 9,
    marginTop: 5,
    marginLeft: 7,
  },
  loremIpsum2: {
    top: 1,
    left: 0,
    position: 'absolute',
    // fontFamily: 'roboto-700',
    color: '#121212',
    fontSize: 15,
  },
  rect3Stack: {
    width: 236,
    height: 37,
    marginTop: 15,
    marginLeft: 88,
  },
  loremIpsum3: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 12,
    marginTop: 9,
    marginLeft: 89,
  },
  rect2: {
    top: 1,
    left: 1,
    width: 82,
    height: 85,
    position: 'absolute',
  },
  image1: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginTop: 12,
    marginLeft: 12,
  },
  rect6Stack: {
    width: 341,
    height: 182,
  },
});

export default ParkingOrderItem;
