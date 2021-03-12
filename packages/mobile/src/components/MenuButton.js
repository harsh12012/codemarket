import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MenuButton({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.toggleDrawer();
      }}
      style={styles.container}
    >
      <Icon name='menu' size={30} color='#999' />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
});
