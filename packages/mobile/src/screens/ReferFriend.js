import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import MaterialButtonPrimary from '../components/MaterialButtonPrimary';

function ReferFriend({navigation}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.referAFriend}>Refer a Friend</Text>
      <Image
        source={require('../assets/images/referfriend.jpg')}
        resizeMode="contain"
        style={styles.image}></Image>
      <Text style={styles.loremIpsum}>Get your USD 30 free credits!</Text>
      <Text style={styles.loremIpsum2}>
        Send your friend this Promotional Code &amp; get USD 30 when they Sign
        Up!
      </Text>
      <Text style={styles.promotionalCode}>Promotional Code</Text>
      <View style={styles.rect}>
        <View style={styles.absaw56Row}>
          <Text style={styles.absaw56}>ABSAW56</Text>
          <Text style={styles.copy}>Copy</Text>
        </View>
      </View>
      <MaterialButtonPrimary
        caption="INVITE FRIENDS"
        style={styles.materialButtonPrimary}></MaterialButtonPrimary>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  referAFriend: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24,
    // marginTop: 59,
    // marginLeft: 21,
  },
  image: {
    height: 286,
    width: 285,
    alignSelf: 'center',
  },
  loremIpsum: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 22,
    marginTop: 6,
    marginLeft: 46,
  },
  loremIpsum2: {
    // fontFamily: 'roboto-300',
    color: 'rgba(11,64,148,1)',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 26,
    marginTop: 20,
    alignSelf: 'center',
  },
  promotionalCode: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginTop: 66,
    marginLeft: 45,
  },
  rect: {
    width: 284,
    height: 47,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 60,
    shadowOpacity: 0.2,
    shadowRadius: 20,
    flexDirection: 'row',
    marginTop: 18,
    marginLeft: 46,
  },
  absaw56: {
    // fontFamily: 'roboto-700',
    color: '#121212',
    fontSize: 20,
  },
  copy: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 16,
    marginLeft: 124,
    marginTop: 3,
  },
  absaw56Row: {
    height: 25,
    flexDirection: 'row',
    flex: 1,
    marginRight: 14,
    marginLeft: 17,
    marginTop: 12,
  },
  materialButtonPrimary: {
    width: 284,
    height: 41,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 60,
    shadowOpacity: 0.2,
    shadowRadius: 20,
    marginTop: 18,
    marginLeft: 46,
  },
});

export default ReferFriend;
