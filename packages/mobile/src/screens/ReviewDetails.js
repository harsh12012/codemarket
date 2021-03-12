import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';

function ReviewDetails(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.reviews}>Reviews</Text>
      <Text style={styles.loremIpsum1}>906 Peg Shop St. Franklyn, NY 11209</Text>
      <View style={styles.rect1} />
      <View style={styles.rect2StackStack}>
        <View style={styles.rect2Stack}>
          <View style={styles.rect2}>
            <View style={styles.rect3Stack}>
              <View style={styles.rect3}>
                <View style={styles.iconRow}>
                  <FontAwesomeIcon name="user-circle" style={styles.icon} />
                  <Text style={styles.spaceOwner}>Space Owner</Text>
                  <View style={styles.rect4}>
                    <View style={styles.icon2Row}>
                      <EntypoIcon name="star" style={styles.icon2}></EntypoIcon>
                      <Text style={styles.loremIpsum2}>5</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Text style={styles.loremIpsum3}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </Text>
            </View>
            <Text style={styles.loremIpsum4}>2 weeks ago</Text>
          </View>
          <View style={styles.rect8} />
        </View>
        <View style={styles.rect7}>
          <View style={styles.rect6Stack}>
            <View style={styles.rect6}>
              <View style={styles.icon4Row}>
                <FontAwesomeIcon name="user-circle" style={styles.icon4} />
                <Text style={styles.driver}>Driver</Text>
                <View style={styles.loremIpsum7StackStack}>
                  <View style={styles.loremIpsum7Stack}>
                    <Text style={styles.loremIpsum7}>5</Text>
                    <View style={styles.rect5} />
                  </View>
                  <EntypoIcon name="star" style={styles.icon3} />
                </View>
              </View>
            </View>
            <Text style={styles.loremIpsum6}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>
          <Text style={styles.loremIpsum5}>2 weeks ago</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  reviews: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24,
    marginTop: 56,
    marginLeft: 24
  },
  loremIpsum1: {
    // fontFamily: 'roboto-300',
    color: 'rgba(11,64,148,1)',
    fontSize: 18,
    marginTop: 14,
    marginLeft: 24
  },
  rect1: {
    width: 321,
    height: 4,
    backgroundColor: '#E6E6E6',
    marginTop: 24,
    marginLeft: 26
  },
  rect2: {
    top: 0,
    left: 0,
    width: 321,
    height: 181,
    position: 'absolute'
  },
  rect3: {
    top: 0,
    left: 0,
    width: 321,
    height: 68,
    position: 'absolute',
    flexDirection: 'row'
  },
  icon: {
    color: 'rgba(128,128,128,1)',
    fontSize: 50,
    height: 50,
    width: 50
  },
  spaceOwner: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18,
    marginLeft: 12,
    marginTop: 11
  },
  rect4: {
    width: 46,
    height: 27,
    flexDirection: 'row',
    marginLeft: 18,
    marginTop: 8
  },
  icon2: {
    color: 'rgba(251,215,49,1)',
    fontSize: 24,
    height: 27,
    width: 24
  },
  loremIpsum2: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18,
    marginLeft: 4,
    marginTop: 3
  },
  icon2Row: {
    height: 27,
    flexDirection: 'row',
    flex: 1,
    marginRight: 8
  },
  iconRow: {
    height: 50,
    flexDirection: 'row',
    flex: 1,
    marginRight: 81,
    marginLeft: 8,
    marginTop: 13
  },
  loremIpsum3: {
    top: 60,
    left: 70,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 15,
    lineHeight: 18
  },
  rect3Stack: {
    width: 321,
    height: 150
  },
  loremIpsum4: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(155,155,155,1)',
    fontSize: 13,
    marginTop: 8,
    marginLeft: 72
  },
  rect8: {
    top: 63,
    left: 29,
    width: 6,
    height: 156,
    position: 'absolute',
    backgroundColor: '#E6E6E6'
  },
  rect2Stack: {
    top: 0,
    left: 0,
    width: 321,
    height: 219,
    position: 'absolute'
  },
  rect7: {
    top: 206,
    left: 1,
    width: 321,
    height: 181,
    position: 'absolute'
  },
  rect6: {
    top: 0,
    left: 0,
    width: 321,
    height: 68,
    position: 'absolute',
    flexDirection: 'row'
  },
  icon4: {
    color: 'rgba(128,128,128,1)',
    fontSize: 50,
    height: 50,
    width: 50
  },
  driver: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18,
    marginLeft: 11,
    marginTop: 11
  },
  loremIpsum7: {
    top: 3,
    left: 29,
    position: 'absolute',
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18
  },
  rect5: {
    top: 0,
    left: 0,
    width: 46,
    height: 27,
    position: 'absolute'
  },
  loremIpsum7Stack: {
    top: 0,
    left: 0,
    width: 46,
    height: 27,
    position: 'absolute'
  },
  icon3: {
    top: 0,
    left: 0,
    position: 'absolute',
    color: 'rgba(251,215,49,1)',
    fontSize: 24,
    height: 27,
    width: 24
  },
  loremIpsum7StackStack: {
    width: 46,
    height: 27,
    marginLeft: 78,
    marginTop: 8
  },
  icon4Row: {
    height: 50,
    flexDirection: 'row',
    flex: 1,
    marginRight: 81,
    marginLeft: 8,
    marginTop: 13
  },
  loremIpsum6: {
    top: 60,
    left: 71,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 15,
    lineHeight: 18
  },
  rect6Stack: {
    width: 321,
    height: 150
  },
  loremIpsum5: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(155,155,155,1)',
    fontSize: 13,
    marginTop: 8,
    marginLeft: 72
  },
  rect2StackStack: {
    width: 322,
    height: 387,
    marginTop: 16,
    marginLeft: 26
  }
});

export default ReviewDetails;
