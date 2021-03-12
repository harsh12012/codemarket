import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Entypo';

function MapMarker({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.rectStack} onPress={onPress}>
      <View style={styles.rect}>
        <View style={styles.ellipseStack}>
          <Svg viewBox="0 0 45.63 42.12" style={styles.ellipse}>
            <Ellipse
              stroke="rgba(230, 230, 230,1)"
              strokeWidth={0}
              cx={23}
              cy={21}
              rx={23}
              ry={21}
              fill="rgba(251,251,251,1)"></Ellipse>
          </Svg>
          <Text style={styles.loremIpsum}>{title}</Text>
        </View>
      </View>
      <Icon name="location-pin" style={styles.icon}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rect: {
    width: 100,
    height: 95,
    position: 'absolute',
    left: 0,
    top: 4
  },
  ellipse: {
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    position: 'absolute',
    backgroundColor: '#fff',
    // zIndex: 100,
    borderRadius: 50
  },
  loremIpsum: {
    top: 12,
    left: 3,
    position: 'absolute',
    // fontFamily: 'roboto-900',
    color: '#121212',
    fontSize: 12
  },
  ellipseStack: {
    width: 40,
    height: 41,
    marginTop: 10,
    marginLeft: 31,
    zIndex: 100,
    borderRadius: 50,
    backgroundColor: '#fff'
  },
  icon: {
    top: 0,
    left: 5,
    position: 'absolute',
    color: 'rgba(11,64,148,1)',
    fontSize: 90
  },
  rectStack: {
    width: 100,
    height: 105,
    marginTop: 355,
    marginLeft: 137
    // backgroundColor: '#fff',
  }
});

export default MapMarker;
