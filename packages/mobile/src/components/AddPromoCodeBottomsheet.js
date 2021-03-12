import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import MaterialButtonPrimary from '../components/MaterialButtonPrimary';

function AddPromoCode(props) {
  return (
    <View style={styles.rect}>
      <Text style={styles.addPromoCode}>Add Promo Code</Text>
      <TextInput
        placeholder="Enter your Promo Code"
        placeholderTextColor="rgba(214,214,214,1)"
        style={styles.textInput}></TextInput>
      <View style={styles.rect2Row}>
        <View style={styles.rect2}>
          <Text style={styles.cancel}>CANCEL</Text>
        </View>
        <MaterialButtonPrimary
          caption="ADD CODE"
          style={styles.materialButtonPrimary}></MaterialButtonPrimary>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rect: {
    width: 375,
    height: 200,
    borderWidth: 1,
    borderColor: '#000000',
    marginTop: 323
  },
  addPromoCode: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 22,
    marginTop: 18,
    marginLeft: 22
  },
  textInput: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 50,
    width: 331,
    fontSize: 20,
    marginTop: 16,
    marginLeft: 24
  },
  rect2: {
    width: 140,
    height: 40,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 60,
    shadowOpacity: 0.3,
    shadowRadius: 20
  },
  cancel: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    marginTop: 12,
    marginLeft: 44
  },
  materialButtonPrimary: {
    width: 140,
    height: 40,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 60,
    shadowOpacity: 0.3,
    shadowRadius: 20,
    marginLeft: 26,
    marginTop: 1
  },
  rect2Row: {
    height: 41,
    flexDirection: 'row',
    marginTop: 17,
    marginLeft: 26,
    marginRight: 43
  }
});

export default AddPromoCode;
