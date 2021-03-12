import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialButtonPrimary from '../components/MaterialButtonPrimary';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MoreDetailsThree({
  locationDetails,
  spaceDetails,
  pricingDetails,
  navigation,
  isSpaceOwner
}) {
  const {
    vehicleHeightLimit,
    // vehicleSizes: {motorcycle, compact, midsized, large, oversized},
    motorcycle,
    compact,
    midsized,
    large,
    oversized,
    aboutSpace,
    accessInstructions,
    parkingSpaceType,
    sameSizeSpaces,
    largestSize
  } = spaceDetails;
  const { listingType } = locationDetails;
  const { pricingType, pricingRates } = pricingDetails;
  return (
    <Fragment>
      <View style={styles.rect}>
        <View style={styles.loremIpsumRow}>
          <Text style={styles.loremIpsum}>Vehicle Sizes Accepted</Text>
          <TouchableOpacity>
            <Text style={styles.loremIpsum2}>Vehicle size description</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rect2Row}>
          {sameSizeSpaces ? (
            largestSize == 'Motorcycle' ? (
              <View style={styles.rect2}>
                <FontAwesomeIcon name="automobile" style={styles.icon} />
                <Text style={styles.compact}>Motorcycle</Text>
              </View>
            ) : largestSize == 'Compact' ? (
              <>
                <View style={styles.rect2}>
                  <FontAwesomeIcon name="automobile" style={styles.icon} />
                  <Text style={styles.compact}>Motorcycle</Text>
                </View>
                <View style={styles.rect2}>
                  <FontAwesomeIcon name="automobile" style={styles.icon} />
                  <Text style={styles.compact}>Compact</Text>
                </View>
              </>
            ) : largestSize == 'Mid Sized' ? (
              <>
                <View style={styles.rect2}>
                  <FontAwesomeIcon name="automobile" style={styles.icon} />
                  <Text style={styles.compact}>Motorcycle</Text>
                </View>
                <View style={styles.rect2}>
                  <FontAwesomeIcon name="automobile" style={styles.icon} />
                  <Text style={styles.compact}>Compact</Text>
                </View>
                <View style={styles.rect2}>
                  <FontAwesomeIcon name="automobile" style={styles.icon} />
                  <Text style={styles.compact}>Mid Sized</Text>
                </View>
              </>
            ) : largestSize == 'Large' ? (
              <>
                <View style={styles.rect2}>
                  <FontAwesomeIcon name="automobile" style={styles.icon} />
                  <Text style={styles.compact}>Motorcycle</Text>
                </View>
                <View style={styles.rect2}>
                  <FontAwesomeIcon name="automobile" style={styles.icon} />
                  <Text style={styles.compact}>Compact</Text>
                </View>
                <View style={styles.rect2}>
                  <FontAwesomeIcon name="automobile" style={styles.icon} />
                  <Text style={styles.compact}>Mid Sized</Text>
                </View>
                <View style={styles.rect2}>
                  <FontAwesomeIcon name="automobile" style={styles.icon} />
                  <Text style={styles.compact}>Large</Text>
                </View>
              </>
            ) : (
              <>
                <View style={styles.rect2}>
                  <FontAwesomeIcon name="automobile" style={styles.icon} />
                  <Text style={styles.compact}>Motorcycle</Text>
                </View>
                <View style={styles.rect2}>
                  <FontAwesomeIcon name="automobile" style={styles.icon} />
                  <Text style={styles.compact}>Compact</Text>
                </View>
                <View style={styles.rect2}>
                  <FontAwesomeIcon name="automobile" style={styles.icon} />
                  <Text style={styles.compact}>Mid Sized</Text>
                </View>
                <View style={styles.rect2}>
                  <FontAwesomeIcon name="automobile" style={styles.icon} />
                  <Text style={styles.compact}>Large</Text>
                </View>
                <View style={styles.rect2}>
                  <FontAwesomeIcon name="automobile" style={styles.icon} />
                  <Text style={styles.compact}>Oversized</Text>
                </View>
              </>
            )
          ) : (
            <>
              {motorcycle && (
                <View style={styles.rect2}>
                  <FontAwesomeIcon name="automobile" style={styles.icon} />
                  <Text style={styles.compact}>Motorcycle</Text>
                </View>
              )}
              {compact && (
                <View style={styles.rect2}>
                  <FontAwesomeIcon name="automobile" style={styles.icon} />
                  <Text style={styles.compact}>Compact</Text>
                </View>
              )}
              {midsized && (
                <View style={styles.rect2}>
                  <FontAwesomeIcon name="automobile" style={styles.icon} />
                  <Text style={styles.compact}>Mid Sized</Text>
                </View>
              )}
              {large && (
                <View style={styles.rect2}>
                  <FontAwesomeIcon name="automobile" style={styles.icon} />
                  <Text style={styles.compact}>Large</Text>
                </View>
              )}
              {oversized && (
                <View style={styles.rect2}>
                  <FontAwesomeIcon name="automobile" style={styles.icon} />
                  <Text style={styles.compact}>Oversized</Text>
                </View>
              )}
            </>
          )}
        </View>
        <Text style={styles.loremIpsum3}>
          This parking space is a {listingType} and {parkingSpaceType} parking type.
        </Text>
        <Text style={styles.loremIpsum4}>
          This parking has a {vehicleHeightLimit ? vehicleHeightLimit : 'no'} height limit.
        </Text>
      </View>
      <View style={styles.rect4}>
        <Text style={styles.loremIpsum5}>Things you should know</Text>
        <Text style={styles.loremIpsum6}>
          {/* In/out Privileges are only allowed for overnight guests at this
          location */}
          {aboutSpace}
        </Text>
        {/* <Text style={styles.loremIpsum7}>
          ParkYouself reservation are not accepted for guests of the Loews hotel
        </Text> */}
      </View>
      <View style={styles.rect5}>
        <Text style={styles.gettingHere}>Getting here</Text>
        <Text style={styles.loremIpsum8}>
          {/* Enter this location at 1755 N Highland Ave you must pull up to the
          front of the hotel to valet your vehicle. This is Loews Hotel valet
          garage, operated by Towne Park. */}
          {accessInstructions}
        </Text>
      </View>
      <View style={styles.rect6}>
        <View style={styles.rect7StackRow}>
          <View style={styles.rect7Stack}>
            <View style={styles.rect7}>
              <Text style={styles.loremIpsum9}>
                {/* $ {pricingType == 'Flat' ? pricingRates.dailyMax : pricingRates.perHourRate} */}
                $ {pricingRates.perHourRate}
              </Text>
            </View>
            <Text style={styles.perHour}>{pricingType == 'Flat' ? 'per day' : 'per hour'}</Text>
          </View>
          <MaterialButtonPrimary
            // caption='BUTTON'
            onPress={() => {
              if (isSpaceOwner) {
                navigation.goBack();
              } else {
                // navigation.navigate('PayNow');
              }
            }}
            caption={isSpaceOwner ? 'CLOSE' : 'SCHEDULE BOOKING'}
            style={styles.materialButtonPrimary1}
          />
        </View>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  rect: {
    width: '100%',
    // height: 279,
    paddingVertical: 20,
    backgroundColor: 'rgba(255,255,255,1)',
    marginTop: 20
    // marginLeft: 16,
  },
  loremIpsum: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 17
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 12,
    textDecorationLine: 'underline',
    marginLeft: 20,
    marginTop: 4
  },
  loremIpsumRow: {
    height: 20,
    flexDirection: 'row',
    // marginTop: 18,
    marginLeft: 15,
    marginRight: 9
  },
  rect2: {
    width: 89,
    height: 81,
    backgroundColor: 'rgba(39,170,225,0.2)',
    marginRight: 10,
    marginBottom: 10
  },
  icon: {
    color: 'rgba(39,170,225,1)',
    fontSize: 30,
    height: 30,
    width: 34,
    marginTop: 15,
    marginLeft: 27
  },
  compact: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    marginTop: 10,
    marginLeft: 15
  },
  rect3: {
    width: 89,
    height: 81,
    backgroundColor: 'rgba(39,170,225,0.2)',
    marginLeft: 9
  },
  icon1: {
    color: 'rgba(39,170,225,1)',
    fontSize: 30,
    height: 30,
    width: 34,
    marginTop: 15,
    marginLeft: 28
  },
  midSized: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    marginTop: 10,
    marginLeft: 15
  },
  rect2Row: {
    width: '100%',
    // height: 81,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginLeft: 15
  },
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 17,
    marginTop: 26,
    marginLeft: 15,
    marginRight: 15
  },
  loremIpsum4: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 17,
    marginTop: 11,
    marginLeft: 14
  },
  rect4: {
    width: '100%',
    // height: 180,
    backgroundColor: 'rgba(255,255,255,1)',
    // marginLeft: 16,
    marginTop: 20,
    paddingVertical: 20
  },
  loremIpsum5: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 17,
    // marginTop: 17,
    marginLeft: 18
  },
  loremIpsum6: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 17,
    lineHeight: 21,
    marginTop: 16,
    marginLeft: 18,
    marginRight: 8
  },
  loremIpsum7: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 17,
    lineHeight: 21,
    marginTop: 17,
    marginLeft: 18,
    marginRight: 8
  },
  rect5: {
    width: '100%',
    // height: 170,
    backgroundColor: 'rgba(255,255,255,1)',
    // marginLeft: 16,
    marginTop: 20,
    paddingVertical: 20
  },
  gettingHere: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 17,
    // marginTop: 18,
    marginLeft: 17
  },
  loremIpsum8: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 17,
    lineHeight: 22,
    marginTop: 17,
    marginLeft: 16,
    marginRight: 10
  },
  rect6: {
    width: '100%',
    height: 63,
    backgroundColor: 'rgba(255,255,255,1)',
    flexDirection: 'row',
    marginTop: 20
    // marginLeft: 16,
  },
  rect7: {
    // top: 0,
    // left: 0,
    // width: 126,
    height: 42
    // position: 'absolute',
  },
  loremIpsum9: {
    // fontFamily: 'roboto-900',
    color: 'rgba(11,64,148,1)',
    fontSize: 26,
    marginTop: 6,
    marginLeft: 4
  },
  perHour: {
    top: 5,
    left: 5,
    // position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    opacity: 0.53
  },
  rect7Stack: {
    // width: 131,
    flexDirection: 'row',
    alignItems: 'center',
    height: 42
  },
  materialButtonPrimary1: {
    height: 36,
    width: 163
    // marginLeft: 23,
    // marginTop: 2,
  },
  rect7StackRow: {
    padding: 10,
    // height: 42,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
    // marginRight: 15,
    // marginLeft: 14,
    // marginTop: 11,
  }
});
