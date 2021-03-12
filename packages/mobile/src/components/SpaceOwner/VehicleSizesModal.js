import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

function VehicleSizesModal({onPress}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>How do I determine my space size?</Text>
        <TouchableOpacity onPress={onPress}>
          <EntypoIcon name="cross" style={styles.cross}></EntypoIcon>
        </TouchableOpacity>
      </View>

      <View style={styles.vehicle}>
        <FontAwesomeIcon
          name="motorcycle"
          style={styles.icon}></FontAwesomeIcon>
        <Text style={styles.title}>Motorcycle</Text>

        <Text style={styles.description}>
          Motorcycle and Motorbike spaces are a minimum size of 3 by 6 feet.
          Each bicycle space shall be a minimum of 2 by 6 feet.
        </Text>
      </View>
      <View style={styles.vehicle}>
        <MaterialCommunityIconsIcon
          name="car-sports"
          style={styles.icon}></MaterialCommunityIconsIcon>
        <Text style={styles.title}>Compact</Text>

        <Text style={styles.description}>
          Compact cars are roughly 5-6 feet wide and 11-14 feet long. Comon
          vehicles that should be able to fit in compact spaces are Mini Cooper,
          Honda Civic, Toyota Corolla, and Toyota Pruis.
        </Text>
      </View>
      <View style={styles.vehicle}>
        <MaterialCommunityIconsIcon
          name="car-side"
          style={styles.icon}></MaterialCommunityIconsIcon>
        <Text style={styles.title}>Mid Sized</Text>

        <Text style={styles.description}>
          Mid size cars are roughly 5-6 feet wide and 14-16.5 feet long. Common
          vehicles that should be able to fit in mid size spaces are Nissan
          altima, Toyota Camry, Honda Accord
        </Text>
      </View>
      <View style={styles.vehicle}>
        <MaterialCommunityIconsIcon
          name="car-estate"
          style={styles.icon}></MaterialCommunityIconsIcon>
        <Text style={styles.title}>Large</Text>

        <Text style={styles.description}>
          Large cars are 6-6.5 feet wide and 16-18 feet long. Common vehicles
          that should be able to fit in large spaces are Toyota Highlander,
          Toyota Tacoma, Mercedes E-Classs, Tesla Model S.
        </Text>
      </View>
      <View style={styles.vehicle}>
        <FontAwesomeIcon name="truck" style={styles.icon}></FontAwesomeIcon>
        <Text style={styles.title}>Oversized</Text>

        <Text style={styles.description}>
          Oversized cars are 6-7 feet wide and 17-20 feet long. Common vehicles
          that should be able to fit in oversized spaces are Chevy Suburban,
          Ford F-150, Chevy Silverado, Most Cargo Vans.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    padding: 30,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  vehicle: {
    alignItems: 'center',
    marginVertical: 20,
  },
  icon: {
    color: 'rgba(39,170,225,1)',
    fontSize: 80,
  },
  title: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    fontSize: 16,
    lineHeight: 22,
  },
  loremIpsum: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 15,
    // marginLeft: 26,
  },
  heading: {
    color: 'rgba(11,64,148,1)',
    color: '#27aae1',
    fontSize: 30,
    fontWeight: '700',
    // marginTop: 30,
    // marginVertical: 20,
    width: '80%',
  },
  cross: {
    color: 'rgba(182,182,182,1)',
    fontSize: 40,
    // marginTop: -58,
    // marginLeft: 266,
  },
});

export default VehicleSizesModal;
