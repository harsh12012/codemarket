import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function HeaderLogo() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/headerlogo.jpg')}
        style={styles.img}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 45,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
