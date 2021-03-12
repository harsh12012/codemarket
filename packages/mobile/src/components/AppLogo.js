import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

export default function AppLogo() {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require('../assets/images/logo1.png')}
        resizeMode="contain"
        style={styles.image}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: 293,
    height: 202,
    marginTop: 10,
    // marginLeft: 41,
  },
});
