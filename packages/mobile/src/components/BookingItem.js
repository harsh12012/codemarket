import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialButtonPrimary from './MaterialButtonPrimary';

export default function BookingItem({ item, navigation }) {
  const { location, card, startDate, endDate, listingId, price } = item;
  return (
    <View style={styles.bookingItem}>
      <View style={styles.rect3}>
        <View style={styles.rect4Row}>
          <View style={styles.rect4}>
            <Image
              source={require('../assets/images/cars.jpg')}
              resizeMode="stretch"
              style={styles.image}
            />
          </View>
          <View style={styles.loremIpsumRowColumn}>
            <View style={styles.loremIpsumRow}>
              <Text style={styles.loremIpsum}>{location}</Text>
              <View style={styles.rect5}>
                <Text style={styles.rebook}>Rebook</Text>
              </View>
            </View>
            <Text style={styles.loremIpsum2}>
              {moment(startDate).format('lll')} to {moment(endDate).format('lll')}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.rect6}>
        <View style={styles.buttonRow}>
          <View style={styles.button}>
            <View style={styles.iconRow}>
              <FontAwesomeIcon name="cc-visa" style={styles.icon} />
              <Text style={styles.visa6094320}>
                VISA
                {price}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MoreDetails', { id: listingId });
            }}>
            <Text style={styles.moreDetails}>More Details</Text>
          </TouchableOpacity>
          <View style={styles.rect8}>
            <TouchableOpacity
              style={styles.icon2Row}
              onPress={() => {
                navigation.navigate('Reviews');
              }}>
              <IoniconsIcon name="ios-star" style={styles.icon2}></IoniconsIcon>
              <IoniconsIcon name="ios-star" style={styles.icon3}></IoniconsIcon>
              <IoniconsIcon name="ios-star" style={styles.icon4}></IoniconsIcon>
              <IoniconsIcon name="ios-star" style={styles.icon5}></IoniconsIcon>
              <Text style={styles.loremIpsum3}>123</Text>
              <SimpleLineIcon name="arrow-right" size={9} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.materialButtonPrimary2Row}>
        <MaterialButtonPrimary caption="EARLY CHECK-IN" style={styles.materialButtonPrimary2} />
        <TouchableOpacity style={styles.rect9}>
          <Text style={styles.cancelBooking}>CANCEL BOOKING</Text>
        </TouchableOpacity>
        <View style={styles.rect10Stack}>
          <View style={styles.rect10}></View>
          <MaterialCommunityIconsIcon name="qrcode" style={styles.icon6} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bookingItem: {
    borderWidth: 1,
    borderColor: 'rgba(197,196,196,1)',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10
    },
    elevation: 20,
    shadowOpacity: 0.17,
    shadowRadius: 20,
    backgroundColor: '#fff',
    width: '100%',
    marginVertical: 10,
    // padding: 10,
    overflow: 'hidden'
  },
  rect3: {
    width: '100%',
    height: 85
  },
  rect4: {
    width: 82,
    height: 85
  },
  image: {
    width: 49,
    height: 49,
    borderRadius: 100,
    marginTop: 12,
    marginLeft: 12
  },
  loremIpsum: {
    // fontFamily: 'roboto-700',
    color: '#121212',
    fontSize: 15,
    marginTop: 1
  },
  rect5: {
    width: 50,
    height: 20,
    backgroundColor: 'rgba(39,170,225,0.2)',
    marginLeft: -12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rebook: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 10
    // marginTop: 5,
    // marginLeft: 10,
  },
  loremIpsumRow: {
    height: 37,
    flexDirection: 'row',
    marginLeft: 1
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 12,
    marginTop: 8
  },
  loremIpsumRowColumn: {
    width: 242,
    marginTop: 14,
    marginBottom: 11
  },
  rect4Row: {
    height: 85,
    flexDirection: 'row',
    marginRight: 6
  },
  materialButtonPrimary2: {
    height: 36,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rect9: {
    width: 140,
    height: 36,
    borderWidth: 1,
    borderColor: 'rgba(39,170,225,1)',
    marginLeft: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelBooking: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 12
    // marginTop: 11,
    // marginLeft: 7,
  },
  rect10: {
    top: 0,
    left: 0,
    width: 38,
    height: 36,
    position: 'absolute',
    backgroundColor: 'rgba(39,170,225,0.2)'
  },
  icon6: {
    top: 0,
    left: 2,
    position: 'absolute',
    color: 'rgba(39,170,225,1)',
    fontSize: 34,
    height: 37,
    width: 34
  },
  rect10Stack: {
    width: 38,
    height: 37,
    marginLeft: 11
  },
  materialButtonPrimary2Row: {
    width: '100%',
    height: 47,
    flexDirection: 'row',
    marginTop: 92,
    marginLeft: 13,
    marginRight: 13
  },
  rect6: {
    top: 97,
    left: 0,
    width: '100%',
    height: 65,
    position: 'absolute',
    // borderWidth: 1,
    borderColor: 'rgba(223,220,220,1)',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flexDirection: 'row'
    // justifyContent: 'space-between',
  },
  button: {
    width: 138,
    height: 32,
    borderWidth: 1,
    borderColor: 'rgba(187,186,186,1)',
    flexDirection: 'row'
  },
  icon: {
    color: 'rgba(11,64,148,1)',
    fontSize: 20,
    height: 20,
    width: 26
  },
  visa6094320: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 10,
    marginLeft: 10,
    marginTop: 3
  },
  iconRow: {
    height: 20,
    flexDirection: 'row',
    flex: 1,
    marginRight: 9,
    marginLeft: 8,
    marginTop: 5
  },
  moreDetails: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    fontSize: 10,
    textDecorationLine: 'underline'
    // marginHorizontal: 10,
    // marginTop: 10,
  },
  rect8: {
    width: 120,
    height: 30,
    flexDirection: 'row'
    // marginLeft: 9,
  },
  icon2: {
    color: 'rgba(248,201,28,1)',
    fontSize: 15,
    height: 17,
    width: 13
  },
  icon3: {
    color: 'rgba(248,201,28,1)',
    fontSize: 15,
    height: 17,
    width: 13,
    marginLeft: 5,
    marginTop: 1
  },
  icon4: {
    color: 'rgba(248,201,28,1)',
    fontSize: 15,
    height: 17,
    width: 13,
    marginLeft: 6,
    marginTop: 1
  },
  icon5: {
    color: 'rgba(248,201,28,1)',
    fontSize: 15,
    height: 17,
    width: 13,
    marginLeft: 5,
    marginTop: 1
  },
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(114,113,113,1)',
    fontSize: 10,
    marginLeft: 9,
    // marginTop: 4,
    marginRight: 7
  },
  icon2Row: {
    height: 18,
    flexDirection: 'row',
    flex: 1,
    // marginRight: 6,
    marginTop: 7,
    alignItems: 'center'
  },
  buttonRow: {
    height: 32,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 6,
    marginLeft: 13,
    marginTop: 19
  }
});
