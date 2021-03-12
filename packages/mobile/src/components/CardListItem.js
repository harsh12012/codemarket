import React, {Component} from 'react';
import {
  Share,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialButtonPrimary from '../components/MaterialButtonPrimary';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

function CardListItem({id, price, location, navigation}) {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: '$3.20 | Car Park on 906 Peg Shop St.Franklyn, NY 11209 ',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rectStack}>
        <View style={styles.rect}>
          <View style={styles.rect2}>
            <View style={styles.imageRow}>
              <Image
                source={require('../assets/images/cars.jpg')}
                resizeMode="stretch"
                style={styles.image}></Image>
              <View style={styles.loremIpsumStack}>
                {/* <Text style={styles.loremIpsum}></Text> */}
                <View style={styles.rect3}>
                  <View style={styles.rect4Stack}>
                    <View style={styles.rect5}>
                      <View style={styles.loremIpsum2Row}>
                        <Text style={styles.loremIpsum2}>{price}</Text>
                        <Text style={styles.loremIpsum3}>/401 feet</Text>
                      </View>
                    </View>
                    <View style={styles.rect4}>
                      <View style={styles.iconRow}>
                        <TouchableOpacity onPress={onShare}>
                          <EntypoIcon
                            name="share"
                            style={styles.icon}></EntypoIcon>
                        </TouchableOpacity>
                        <View style={styles.rect6}>
                          <View style={styles.icon2Row}>
                            <IoniconsIcon
                              name="ios-walk"
                              style={styles.icon2}></IoniconsIcon>
                            <Text style={styles.loremIpsum4}>20 min</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.carParkRow}>
                    <Text style={styles.carPark}>Car Park</Text>
                    <Text style={styles.loremIpsum5}>on {location}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.rect7}>
            <View style={styles.rect8Row}>
              <View style={styles.rect8}>
                <Text style={styles.valet}>VALET</Text>
              </View>
              <View style={styles.rect9}>
                <Text style={styles.covered}>COVERED</Text>
              </View>
              <View style={styles.rect10}>
                <Text style={styles.onSiteStaff}>ON SITE STAFF</Text>
              </View>
              <View style={styles.rect11}>
                <Text style={styles.accessible}>ACCESSIBLE</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.rect12}>
          <View style={styles.materialButtonPrimaryRow}>
            <MaterialButtonPrimary
              caption="BOOK NOW"
              style={styles.materialButtonPrimary}
              onPress={() => {
                navigation.navigate('PayNow', {lId: id, price: price});
              }}></MaterialButtonPrimary>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MoreDetails', {id: id});
              }}>
              <Text style={styles.moreDetails}>More Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rect13}
              onPress={() => navigation.navigate('Reviews')}>
              <View style={styles.icon3Row}>
                <EntypoIcon name="star" style={styles.icon3}></EntypoIcon>
                <EntypoIcon name="star" style={styles.icon4}></EntypoIcon>
                <EntypoIcon name="star" style={styles.icon5}></EntypoIcon>
                <EntypoIcon name="star" style={styles.icon6}></EntypoIcon>
                <EntypoIcon name="star" style={styles.icon7}></EntypoIcon>
                <Text style={styles.loremIpsum6}>123</Text>
                <SimpleLineIcon
                  name="arrow-right"
                  size={9}
                  color="rgba(160,156,156,1)"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    // backgroundColor: 'red',
    // alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 15,
      height: 20,
    },
    elevation: 30,
    shadowOpacity: 0.12,
    shadowRadius: 20,
    marginVertical: 10,
    padding: 5,
  },
  rect: {
    top: 0,
    left: 0,
    width: '100%',
    // padding: 5,
    // height: 205,
    // position: 'absolute',
    // borderWidth: 1,
    // borderColor: '#000000',
    // backgroundColor: '#fff',
    // padding: 10,
  },
  rect2: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
  },
  image: {
    width: 49,
    height: 47,
    borderRadius: 100,
    marginTop: 11,
  },
  loremIpsum: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
  },
  rect3: {
    top: 0,
    left: 0,
    width: '100%',
    // height: 70,
    // position: 'absolute',
  },
  rect4: {
    top: 0,
    left: 1,
    width: '100%',
    height: 45,
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  icon: {
    color: 'rgba(128,128,128,1)',
    fontSize: 27,
    height: 29,
    width: 27,
    marginLeft: -1,
  },
  rect6: {
    width: 63,
    height: 29,
    backgroundColor: 'rgba(39,170,225,0.2)',
    flexDirection: 'row',
    marginLeft: 5,
  },
  icon2: {
    color: 'rgba(39,170,225,1)',
    fontSize: 25,
    height: 27,
    width: 12,
    marginLeft: -1,
  },
  loremIpsum4: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 12,
    marginLeft: 5,
    // marginTop: 8,
  },
  icon2Row: {
    height: 27,
    flexDirection: 'row',
    flex: 1,
    // marginRight: 4,
    marginLeft: 6,
    marginTop: 2,
    alignItems: 'center',
  },
  iconRow: {
    height: 29,
    flexDirection: 'row',
    flex: 1,
    // marginRight: 17,
    // marginLeft: 175,
    marginTop: 8,
    justifyContent: 'flex-end',
  },
  rect5: {
    // top: 0,
    // left: 0,
    // width: 175,
    height: 45,
    // position: 'absolute',
    flexDirection: 'row',
  },
  loremIpsum2: {
    // fontFamily: 'roboto-700',
    color: '#121212',
    fontSize: 26,
  },
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(171,170,170,1)',
    fontSize: 13,
    // marginLeft: 8,
    marginTop: 9,
  },
  loremIpsum2Row: {
    height: 31,
    flexDirection: 'row',
    flex: 1,
    marginRight: 36,
    // marginLeft: 11,
    marginTop: 7,
  },
  rect4Stack: {
    // width: 288,
    height: 45,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  carPark: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
  },
  loremIpsum5: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 13,
    marginLeft: 3,
  },
  carParkRow: {
    height: 17,
    flexDirection: 'row',
    marginTop: 4,
    marginLeft: 8,
    // marginRight: 30,
  },
  loremIpsumStack: {
    // width: 288,
    height: 70,
    marginLeft: 6,
  },
  imageRow: {
    height: 70,
    flexDirection: 'row',
    flex: 1,
    marginLeft: 8,
  },
  rect7: {
    width: '100%',
    height: 62,
    flexDirection: 'row',
  },
  rect8: {
    width: 56,
    height: 28,
    borderWidth: 1,
    borderColor: 'rgba(196,195,195,1)',
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valet: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(196,195,195,1)',
    fontSize: 10,
    // marginTop: 6,
    // marginLeft: 10,
  },
  rect9: {
    width: 76,
    height: 28,
    borderWidth: 1,
    borderColor: 'rgba(196,195,195,1)',
    borderRadius: 42,
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  covered: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(196,195,195,1)',
    fontSize: 10,
    // marginTop: 6,
    // marginLeft: 13,
  },
  rect10: {
    width: 104,
    height: 28,
    borderWidth: 1,
    borderColor: 'rgba(196,195,195,1)',
    borderRadius: 42,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onSiteStaff: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(196,195,195,1)',
    fontSize: 10,
    // marginTop: 7,
    // marginLeft: 11,
  },
  rect11: {
    width: 89,
    height: 28,
    borderWidth: 1,
    borderColor: 'rgba(196,195,195,1)',
    borderRadius: 42,
    marginLeft: 5,
    marginTop: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accessible: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(196,195,195,1)',
    fontSize: 10,
    // marginTop: 7,
    // marginLeft: 11,
  },
  rect8Row: {
    height: 29,
    flexDirection: 'row',
    flex: 1,
    marginRight: 5,
    marginLeft: 6,
    marginTop: 20,
  },
  rect12: {
    // top: 132,
    left: 0,
    width: '100%',
    // height: 74,
    // position: 'absolute',
    marginVertical: 10,
    flexDirection: 'row',
  },
  materialButtonPrimary: {
    height: 36,
    width: 100,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.37,
    shadowRadius: 10,
  },
  moreDetails: {
    // fontFamily: 'roboto-500',
    color: 'rgba(32,133,175,1)',
    textDecorationLine: 'underline',
    fontSize: 13,
    marginLeft: 10,
    marginTop: 10,
  },
  rect13: {
    width: 140,
    height: 36,
    flexDirection: 'row',
    marginLeft: 11,
  },
  icon3: {
    color: 'rgba(248,231,28,1)',
    fontSize: 20,
    height: 22,
    width: 20,
    marginLeft: -1,
  },
  icon4: {
    color: 'rgba(248,231,28,1)',
    fontSize: 20,
    height: 22,
    width: 20,
    marginLeft: 2,
  },
  icon5: {
    color: 'rgba(248,231,28,1)',
    fontSize: 20,
    height: 22,
    width: 20,
    marginLeft: 1,
  },
  icon6: {
    color: 'rgba(248,231,28,1)',
    fontSize: 20,
    height: 22,
    width: 20,
    marginLeft: 1,
  },
  icon7: {
    color: 'rgba(210,210,207,1)',
    fontSize: 20,
    height: 22,
    width: 20,
    marginLeft: 2,
  },
  loremIpsum6: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(160,156,156,1)',
    fontSize: 13,
    marginLeft: 4,
    // marginTop: 4,
    marginRight: 5,
  },
  icon3Row: {
    height: 22,
    flexDirection: 'row',
    flex: 1,
    marginRight: 6,
    marginLeft: 3,
    marginTop: 8,
    alignItems: 'center',
  },
  materialButtonPrimaryRow: {
    // width: '100%',
    height: 36,
    flexDirection: 'row',
    flex: 1,
    marginRight: 5,
    marginLeft: 12,
    // marginTop: 19,
  },
  rectStack: {
    width: '100%',
    // height: 206,
    // marginVertical: 10,
    // marginLeft: 24,
  },
});

export default CardListItem;
