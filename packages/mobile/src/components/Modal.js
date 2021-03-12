import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Svg, {Ellipse} from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';

const Modal = ({title, subtitle}) => {
  return (
    <View style={styles.rect}>
      <View style={styles.ellipseStack}>
        <Svg viewBox="0 0 165.5 157.58" style={styles.ellipse}>
          <Ellipse
            stroke="rgba(39,170,225,0.47)"
            strokeWidth={20}
            fill="rgba(39,170,225,1)"
            cx={83}
            cy={79}
            rx={73}
            ry={69}></Ellipse>
        </Svg>
        <Icon name="thumbs-up" style={styles.icon}></Icon>
      </View>
      <Text style={styles.wellDone}>{title}</Text>
      <Text style={styles.loremIpsum}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rect: {
    width: '100%',
    height: 444,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  ellipse: {
    width: 181,
    height: 168,
    opacity: 0.82,
    alignSelf: 'center',
  },
  icon: {
    // top: 26,
    position: 'absolute',
    color: 'rgba(249,246,246,1)',
    fontSize: 116,
    // left: 37,
    height: 116,
    width: 108,
  },
  ellipseStack: {
    width: '100%',
    height: 168,
    marginTop: 40,
    // marginLeft: 72,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  wellDone: {
    // fontFamily: 'roboto-500',
    color: 'rgba(14,67,149,1)',
    fontSize: 28,
    marginTop: 50,
    // marginLeft: 93,
    alignSelf: 'center',
  },
  loremIpsum: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 20,
    textAlign: 'center',
    opacity: 0.57,
    marginTop: 35,
    alignSelf: 'center',
    paddingHorizontal: 20,
    // marginLeft: 44,
  },
});

export default Modal;
