import React, {Component} from 'react';
import {StyleSheet, View, Text, Modal} from 'react-native';
import MaterialButtonPrimary from '../MaterialButtonPrimary';

function TipsSettingRatesModal({onPress, visible}) {
  return (
    <Modal style={styles.modal} animationType="slide" visible={visible}>
      <View style={styles.container}>
        {/* <View styles={styles.modalView}> */}
        <Text style={styles.heading}>Tips for setting Rates</Text>
        <Text style={styles.loremIpsum2}>
          Take a minute to consider average parking meter and parking lot rates
          in your area and try to keep your rates competitive. This will help
          you to get more reservations and earn more!
        </Text>
        <MaterialButtonPrimary
          onPress={onPress}
          caption="OK"
          style={styles.materialButtonPrimary}></MaterialButtonPrimary>
        {/* </View> */}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    padding: 25,
  },
  modalView: {
    width: '80%',
    elevation: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: '#27aae1',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 30,
    marginVertical: 10,
    textAlign: 'center',
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 20,
    lineHeight: 22,
    marginTop: 21,
    textAlign: 'center',
    alignSelf: 'center',
  },
  materialButtonPrimary: {
    width: 120,
    height: 40,
    backgroundColor: 'rgba(39,170,225,1)',
    marginTop: 50,
    // marginLeft: 106,
    alignSelf: 'center',
  },
});

export default TipsSettingRatesModal;
