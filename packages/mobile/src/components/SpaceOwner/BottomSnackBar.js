import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

function BottomSnackBar({title}) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => {}}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    padding: 20,
    backgroundColor: '#888',
    zIndex: 10000000,
  },
});
export default BottomSnackBar;
