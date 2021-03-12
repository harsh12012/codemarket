import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

function AccountDeactivatedModal(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rect3}></View>
      <Icon name="exclamation" style={styles.icon1}></Icon>
      <Text style={styles.accountDeactivated}>Account Deactivated</Text>
      <Text style={styles.loremIpsum}>
        We are sad to inform you that your account has been successfully
        deactivated and all its data has been deleted as well.
      </Text>
      <Text style={styles.loremIpsum2}>Hope to see you soon again</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rect3: {
    width: 282,
    height: 2,
    backgroundColor: '#E6E6E6',
    marginTop: 219,
    marginLeft: 29,
  },
  icon1: {
    color: 'rgba(229,84,84,1)',
    fontSize: 141,
    marginTop: -211,
    alignSelf: 'center',
  },
  accountDeactivated: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 18,
    marginTop: 8,
    marginLeft: 87,
  },
  loremIpsum: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    textAlign: 'center',
    lineHeight: 21,
    fontSize: 15,
    marginTop: 69,
    marginLeft: 24,
  },
  loremIpsum2: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 16,
    marginTop: 38,
    marginLeft: 70,
  },
});

export default AccountDeactivatedModal;
