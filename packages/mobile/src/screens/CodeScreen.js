import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialButtonPrimary from '../components/MaterialButtonPrimary';
import moment from 'moment';

function CodeScreen({ navigation, bookingData }) {
  const startDate = new Date();
  const endDate = new Date();
  const location = 'vwfwvwv';
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.parkingTicket}>Parking Ticket</Text>
      <View style={styles.rect}>
        <Text style={styles.loremIpsum}>{location}</Text>
        <Text style={styles.loremIpsum2}>
          {/* Car: {vehicle.model} {vehicle.year} - License Plate: {vehicle.licensePlate} */}
        </Text>
        <View style={styles.rect2Row}>
          <View style={styles.rect2}>
            <Text style={styles.arriveAfter}>Arrive After</Text>
            <Text style={styles.loremIpsum3}>{moment(startDate).format('LT')}</Text>
            <Text style={styles.tueJuly1}>{moment(startDate).format('MMM Do YY')}</Text>
          </View>
          <FeatherIcon name="arrow-right" style={styles.icon} />
          <View style={styles.rect3}>
            <Text style={styles.exitBefore}>Exit Before</Text>
            <Text style={styles.loremIpsum4}>{moment(endDate).format('LT')}</Text>
            <Text style={styles.wedJuly2}>{moment(endDate).format('MMM Do YY')}</Text>
          </View>
        </View>
      </View>
      <View style={styles.rect4}>
        <Text style={styles.loremIpsum5}>Show this QR code to enter the Parking area</Text>
        <MaterialCommunityIconsIcon name="qrcode" style={styles.icon2}></MaterialCommunityIconsIcon>
      </View>
      <MaterialButtonPrimary
        caption="DONE"
        style={styles.materialButtonPrimary5}
        onPress={() => {
          navigation.navigate('FindParkingScreen');
        }}></MaterialButtonPrimary>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  parkingTicket: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 26
    // marginTop: 69,
    // marginLeft: 21,
  },
  rect: {
    width: '100%',
    height: 212,
    borderWidth: 1,
    borderColor: 'rgba(39,170,225,1)',
    shadowColor: 'rgba(39,170,225,1)',
    shadowOffset: {
      width: 5,
      height: 5
    },
    backgroundColor: '#fff',
    elevation: 10,
    shadowOpacity: 0.16,
    shadowRadius: 20,
    marginTop: 18
    // marginLeft: 15,
  },
  loremIpsum: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 17,
    marginTop: 19,
    marginLeft: 18
  },
  loremIpsum2: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 13,
    marginTop: 16,
    marginLeft: 18
  },
  rect2: {
    width: 89,
    height: 78
  },
  arriveAfter: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 13,
    marginTop: 7,
    marginLeft: 15
  },
  loremIpsum3: {
    // fontFamily: 'roboto-700',
    color: 'rgba(11,64,148,1)',
    fontSize: 17,
    marginTop: 6,
    marginLeft: 14
  },
  tueJuly1: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 11,
    marginTop: 5,
    marginLeft: 21
  },
  icon: {
    color: 'rgba(128,128,128,1)',
    fontSize: 30,
    height: 30,
    width: 30,
    marginLeft: 15,
    marginTop: 22
  },
  rect3: {
    width: 83,
    height: 78,
    marginLeft: 11
  },
  exitBefore: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 13,
    marginTop: 6,
    marginLeft: 14
  },
  loremIpsum4: {
    // fontFamily: 'roboto-700',
    color: 'rgba(11,64,148,1)',
    fontSize: 17,
    marginTop: 6,
    marginLeft: 13
  },
  wedJuly2: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 11,
    marginTop: 7,
    marginLeft: 17
  },
  rect2Row: {
    height: 78,
    flexDirection: 'row',
    marginTop: 34,
    marginLeft: 58,
    marginRight: 60
  },
  rect4: {
    width: '100%',
    // height: 252,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 7,
      width: 7
    },
    elevation: 30,
    backgroundColor: '#fff',
    shadowOpacity: 0.16,
    shadowRadius: 70,
    marginTop: 23,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  loremIpsum5: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    alignSelf: 'center'
  },
  icon2: {
    color: 'rgba(0,0,0,1)',
    fontSize: 250,
    opacity: 0.68,
    // height: 218,
    // width: 200,
    alignSelf: 'center'
  },
  materialButtonPrimary5: {
    height: 38,
    width: 108,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 10,
      height: 10
    },
    elevation: 60,
    shadowOpacity: 0.18,
    shadowRadius: 20,
    marginVertical: 30,
    // marginLeft: 134,
    alignSelf: 'center'
  }
});

export default CodeScreen;
