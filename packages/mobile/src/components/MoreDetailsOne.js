import React, { Fragment } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

export default function MoreDetailsOne({
  locationDetails,
  scheduleType,
  startTime,
  endTime,
  isSpaceOwner
}) {
  const {
    propertyName,
    features,
    address,
    city,
    state,
    postalCode,
    streetViewImages
  } = locationDetails;

  return (
    <Fragment>
      <Text style={styles.loremIpsum}>
        {address}, {city}, {state}, {postalCode}
      </Text>
      <Text style={styles.ownerBusinessName}>{propertyName}</Text>
      <View style={styles.rectStack}>
        <View style={styles.rect}>
          <View style={styles.icon1Row}>
            <IoniconsIcon name="ios-star" style={styles.icon1} />
            <IoniconsIcon name="ios-star" style={styles.icon2} />
            <IoniconsIcon name="ios-star" style={styles.icon3} />
            <IoniconsIcon name="ios-star-half" style={styles.icon4} />
            <Text style={styles.loremIpsum2}>656</Text>
          </View>
        </View>
        <IoniconsIcon name="ios-star" style={styles.icon} />
      </View>
      <Image
        source={
          streetViewImages.length > 0
            ? { uri: streetViewImages[0] }
            : require('../assets/images/parking.jpg')
        }
        resizeMode="stretch"
        style={styles.image}
      />
      <View style={styles.rect2}>
        <Text style={styles.loremIpsum3}>
          {scheduleType == 'daily'
            ? `${moment(startTime).format('lll')} to ${moment(endTime).format('lll')}`
            : '24 Hours a day'}
        </Text>
        {!isSpaceOwner && (
          <View style={styles.loremIpsum4Row}>
            <Text style={styles.loremIpsum4}>My time has been Extended for free</Text>
            <TouchableOpacity>
              <Text style={styles.why}>Why?</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.rect3Row}>
          {features &&
            features.map((item) => (
              <View style={styles.rect3} key={item}>
                <Text style={styles.valet}>{item}</Text>
              </View>
            ))}
        </View>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  loremIpsum: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 28
  },
  ownerBusinessName: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(155,155,155,1)',
    marginTop: 10
  },
  rect: {
    top: 0,
    left: 1,
    width: 170,
    height: 32,
    position: 'absolute',
    flexDirection: 'row'
  },
  icon1: {
    color: 'rgba(248,231,28,1)',
    fontSize: 22,
    height: 24,
    width: 19
  },
  icon2: {
    color: 'rgba(248,231,28,1)',
    fontSize: 22,
    height: 24,
    width: 19,
    marginLeft: 5
  },
  icon3: {
    color: 'rgba(248,231,28,1)',
    fontSize: 22,
    height: 24,
    width: 19,
    marginLeft: 5
  },
  icon4: {
    color: 'rgba(248,231,28,1)',
    fontSize: 22,
    height: 24,
    width: 19,
    marginLeft: 5
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(130,130,130,1)',
    marginLeft: 10,
    marginTop: 5
  },
  icon1Row: {
    height: 24,
    flexDirection: 'row',
    flex: 1,
    marginRight: 22,
    marginLeft: 24,
    marginTop: 3
  },
  icon: {
    top: 3,
    left: 0,
    position: 'absolute',
    color: 'rgba(248,231,28,1)',
    fontSize: 22
  },
  rectStack: {
    width: '100%',
    height: 32,
    marginTop: 9
  },
  image: {
    // width: '100%',
    // height: 161,
    // marginTop: 9,
    resizeMode: 'contain',
    flex: 1,
    aspectRatio: 1
  },
  rect2: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,1)',
    marginTop: 25,
    paddingHorizontal: 7,
    paddingVertical: 10
  },
  loremIpsum3: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 16,
    // marginTop: 16,
    marginLeft: 8
  },
  loremIpsum4: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 17
  },
  why: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 17,
    marginLeft: 6,
    marginTop: 1
  },
  loremIpsum4Row: {
    height: 21,
    flexDirection: 'row',
    marginTop: 14,
    marginLeft: 11,
    marginRight: 21
  },
  rect3: {
    borderRadius: 19,
    borderWidth: 1,
    borderColor: 'rgba(196,195,195,1)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5
  },
  valet: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(196,195,195,1)'
  },
  rect4: {
    width: 91,
    height: 31,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: 'rgba(196,195,195,1)',
    marginLeft: 12
  },
  covered: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(196,195,195,1)',
    marginTop: 5,
    marginLeft: 15
  },
  rect5: {
    width: 127,
    height: 31,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: 'rgba(196,195,195,1)',
    marginLeft: 12
  },
  onSiteStaff: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(196,195,195,1)',
    marginTop: 5,
    marginLeft: 16
  },
  rect3Row: {
    width: '100%',
    // height: 31,
    flexDirection: 'row',
    marginTop: 21,
    marginLeft: 11,
    marginRight: 17,
    flexWrap: 'wrap'
  },
  rect6: {
    width: 117,
    height: 31,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: 'rgba(196,195,195,1)',
    marginTop: 10,
    marginLeft: 11
  },
  accessible: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(196,195,195,1)',
    marginTop: 5,
    marginLeft: 20
  }
});
