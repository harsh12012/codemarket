import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const InitialLoadingScreen = (props) => (
  <View style={styles.container}>
    <ActivityIndicator color="#27aae1" size="large" />
  </View>
);

const styles = StyleSheet.create({
  container: { paddingTop: 50, textAlign: 'center' }
});
export default InitialLoadingScreen;
