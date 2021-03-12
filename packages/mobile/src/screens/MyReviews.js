import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import ScreenTittle from '../components/common/ScreenTittle';

function MyReviews({ navigation }) {
  return (
    <View style={styles.container}>
      <ScreenTittle title="Reviews" />
      <Text style={styles.loremIpsum}>906 Peg Shop St. Franklyn, NY 11209</Text>
      <View style={styles.rect8Stack}>
        <View style={styles.rect8}>
          <View style={styles.loremIpsum2StackStack}>
            <View style={styles.loremIpsum2Stack}>
              <Text style={styles.loremIpsum2}>July 1 2019, 9:00pm to July 2 2019, 6:00am</Text>
              <View style={styles.rect7} />
            </View>
            <View style={styles.rebook1Stack}>
              <Text style={styles.rebook1}>Rebook</Text>
              <View style={styles.rect5} />
              <Text style={styles.loremIpsum3}>906 Peg Shop St. Franklyn, NY, 11209</Text>
            </View>
            <View style={styles.image1Stack}>
              <Image
                source={require('../assets/images/cars.jpg')}
                resizeMode="stretch"
                style={styles.image1}></Image>
              <View style={styles.rect6} />
            </View>
          </View>
          <View style={styles.visa1StackStackRow}>
            <View style={styles.visa1StackStack}>
              <View style={styles.visa1Stack}>
                <Text style={styles.visa1}>VISA *6094 | $3.20</Text>
                <TouchableOpacity style={styles.button1}></TouchableOpacity>
              </View>
              <FontAwesomeIcon name="cc-visa" style={styles.icon6}></FontAwesomeIcon>
            </View>
            <Text style={styles.moreDetails1}>More Details</Text>
            <View style={styles.loremIpsum1StackStack}>
              <View style={styles.loremIpsum1Stack}>
                <Text style={styles.loremIpsum1}>123</Text>
                <View style={styles.rect3} />
              </View>
              <IoniconsIcon name="ios-star" style={styles.icon2} />
              <IoniconsIcon name="ios-star" style={styles.icon3} />
              <IoniconsIcon name="ios-star" style={styles.icon4} />
              <IoniconsIcon name="ios-star" style={styles.icon5} />
            </View>
          </View>
          <TouchableOpacity style={styles.rect2}>
            <Text
              style={styles.seeDetailReview}
              onPress={() => navigation.navigate('ReviewDetails')}>
              SEE DETAIL REVIEW
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rect4} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  reviews: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24
    // marginTop: 53,
    // marginLeft: 20
  },
  loremIpsum: {
    // fontFamily: 'roboto-300',
    color: 'rgba(11,64,148,1)',
    fontSize: 18,
    marginTop: 10
  },
  rect8: {
    top: 0,
    left: 1,
    width: '100%',
    height: 233,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(197,196,196,1)',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10
    },
    elevation: 30,
    shadowOpacity: 0.17,
    shadowRadius: 20,
    backgroundColor: '#fff'
  },
  loremIpsum2: {
    top: 59,
    left: 86,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 12
  },
  rect7: {
    top: 0,
    left: 0,
    width: 330,
    height: 85,
    position: 'absolute'
  },
  loremIpsum2Stack: {
    top: 0,
    left: 0,
    width: 330,
    height: 85,
    position: 'absolute'
  },
  rebook1: {
    top: 4,
    left: 193,
    position: 'absolute',
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 11
  },
  rect5: {
    top: 0,
    left: 186,
    width: 50,
    height: 20,
    position: 'absolute',
    backgroundColor: 'rgba(39,170,225,0.2)'
  },
  loremIpsum3: {
    top: 1,
    left: 0,
    position: 'absolute',
    // fontFamily: 'roboto-700',
    color: '#121212',
    fontSize: 15
  },
  rebook1Stack: {
    top: 14,
    left: 88,
    width: 236,
    height: 37,
    position: 'absolute'
  },
  image1: {
    top: 12,
    left: 12,
    width: 60,
    height: 60,
    position: 'absolute',
    borderRadius: 100
  },
  rect6: {
    top: 0,
    left: 0,
    width: 82,
    height: 85,
    position: 'absolute'
  },
  image1Stack: {
    top: 0,
    left: 0,
    width: 82,
    height: 85,
    position: 'absolute'
  },
  loremIpsum2StackStack: {
    width: 330,
    height: 85
  },
  visa1: {
    top: 11,
    left: 44,
    position: 'absolute',
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 10
  },
  button1: {
    top: 0,
    left: 0,
    width: 138,
    height: 32,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(187,186,186,1)'
  },
  visa1Stack: {
    top: 0,
    left: 0,
    width: 138,
    height: 32,
    position: 'absolute'
  },
  icon6: {
    top: 5,
    left: 8,
    position: 'absolute',
    color: 'rgba(11,64,148,1)',
    fontSize: 20,
    height: 20,
    width: 26
  },
  visa1StackStack: {
    width: 138,
    height: 32
  },
  moreDetails1: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    fontSize: 10,
    textDecorationLine: 'underline',
    marginLeft: 10,
    marginTop: 11
  },
  loremIpsum1: {
    top: 12,
    left: 77,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(114,113,113,1)',
    fontSize: 10
  },
  rect3: {
    top: 0,
    left: 0,
    width: 100,
    height: 30,
    position: 'absolute'
  },
  loremIpsum1Stack: {
    top: 0,
    left: 0,
    width: 100,
    height: 30,
    position: 'absolute'
  },
  icon2: {
    top: 7,
    left: 53,
    position: 'absolute',
    color: 'rgba(248,201,28,1)',
    fontSize: 18,
    height: 19,
    width: 16
  },
  icon3: {
    top: 7,
    left: 36,
    position: 'absolute',
    color: 'rgba(248,201,28,1)',
    fontSize: 18,
    height: 19,
    width: 15
  },
  icon4: {
    top: 7,
    left: 18,
    position: 'absolute',
    color: 'rgba(248,201,28,1)',
    fontSize: 18,
    height: 19,
    width: 15
  },
  icon5: {
    top: 6,
    left: 0,
    position: 'absolute',
    color: 'rgba(248,201,28,1)',
    fontSize: 18,
    height: 19,
    width: 15
  },
  loremIpsum1StackStack: {
    width: 100,
    height: 30,
    marginLeft: 9,
    marginTop: 1
  },
  visa1StackStackRow: {
    height: 32,
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 12,
    marginRight: 7
  },
  rect2: {
    width: 300,
    height: 43,
    borderWidth: 2,
    borderColor: 'rgba(39,170,225,1)',
    marginTop: 31,
    marginLeft: 18
  },
  seeDetailReview: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    marginTop: 13,
    marginLeft: 88
  },
  rect4: {
    top: 97,
    left: 0,
    width: 332,
    height: 65,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(223,220,220,1)'
  },
  rect8Stack: {
    width: 333,
    height: 233,
    marginTop: 46,
    marginLeft: 22
  }
});

export default MyReviews;
