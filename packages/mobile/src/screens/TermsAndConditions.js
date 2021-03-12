import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LoadingSpinner from '../components/common/LoadingSpinner';
import HTMLView from 'react-native-htmlview';
import { useAppTermCondition } from '@parkyourself-frontend/shared/hooks/adminSettings';

function TermsAndConditions(props) {
  const { loading, error: error2, data: data2 } = useAppTermCondition();
  const [oneData, setOneData] = useState('');
  useEffect(() => {
    if (!error2 && data2) {
      setOneData(data2.getOneTermCondition.terms);
    }
  }, [data2]);
  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingSpinner style={{ marginTop: 40 }} />
      ) : (
        <View style={styles.container}>
          <Text style={styles.termsConditions}>Terms &amp; Conditions</Text>
          <View style={styles.rect}>
            <HTMLView value={oneData} style={styles.termsConditions} />
          </View>
          <Text style={styles.loremIpsum6}>Last Updated : June 15, 2019</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  termsConditions: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24,
    marginTop: 24,
    marginLeft: 17
  },
  rect: {
    width: 375,
    height: 1255,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: 10
    },
    elevation: 210,
    shadowOpacity: 0.1,
    shadowRadius: 70,
    marginTop: 44
  },
  overview: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18,
    marginTop: 16,
    marginLeft: 17
  },
  loremIpsum: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    lineHeight: 21,
    marginTop: 18,
    marginLeft: 17
  },
  loremIpsum1: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    lineHeight: 21,
    marginTop: 17,
    marginLeft: 17
  },
  section1: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18,
    marginTop: 42,
    marginLeft: 17
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    lineHeight: 21,
    marginTop: 9,
    marginLeft: 17
  },
  section2: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18,
    marginTop: 40,
    marginLeft: 16
  },
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    lineHeight: 21,
    marginTop: 11,
    marginLeft: 17
  },
  section3: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18,
    marginTop: 42,
    marginLeft: 16
  },
  loremIpsum4: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    lineHeight: 21,
    marginTop: 12,
    marginLeft: 16
  }
});

export default TermsAndConditions;
