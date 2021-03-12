import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

export default function LocationHeader({location}) {
  return (
    <View>
      <Text style={styles.loremIpsum}>{location}</Text>
      <View style={styles.rectStack}>
        <View style={styles.rect}>
          <View style={styles.icon1Row}>
            <IoniconsIcon name="ios-star" style={styles.icon1}></IoniconsIcon>
            <IoniconsIcon name="ios-star" style={styles.icon2}></IoniconsIcon>
            <IoniconsIcon name="ios-star" style={styles.icon3}></IoniconsIcon>
            <IoniconsIcon
              name="ios-star-half"
              style={styles.icon4}></IoniconsIcon>
            <Text style={styles.loremIpsum2}>656</Text>
          </View>
        </View>
        <IoniconsIcon name="ios-star" style={styles.icon}></IoniconsIcon>
      </View>
      <Image
        source={require('../assets/images/parking.jpg')}
        resizeMode="stretch"
        style={styles.image}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  loremIpsum: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 28,
  },
  rect: {
    top: 0,
    left: 1,
    width: 170,
    height: 32,
    position: 'absolute',
    flexDirection: 'row',
  },
  icon1: {
    color: 'rgba(248,231,28,1)',
    fontSize: 22,
    height: 24,
    width: 19,
  },
  icon2: {
    color: 'rgba(248,231,28,1)',
    fontSize: 22,
    height: 24,
    width: 19,
    marginLeft: 5,
  },
  icon3: {
    color: 'rgba(248,231,28,1)',
    fontSize: 22,
    height: 24,
    width: 19,
    marginLeft: 5,
  },
  icon4: {
    color: 'rgba(248,231,28,1)',
    fontSize: 22,
    height: 24,
    width: 19,
    marginLeft: 5,
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(130,130,130,1)',
    marginLeft: 10,
    marginTop: 5,
  },
  icon1Row: {
    height: 24,
    flexDirection: 'row',
    flex: 1,
    marginRight: 22,
    marginLeft: 24,
    marginTop: 3,
  },
  icon: {
    top: 3,
    left: 0,
    position: 'absolute',
    color: 'rgba(248,231,28,1)',
    fontSize: 22,
  },
  rectStack: {
    width: 171,
    height: 32,
    marginTop: 12,
    // marginLeft: 17,
  },
  image: {
    width: '100%',
    height: 154,
    marginTop: 9,
    // marginLeft: 16,
  },
});
