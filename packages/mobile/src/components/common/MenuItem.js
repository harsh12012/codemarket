import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '@parkyourself-frontend/shared/config/colors';

export default function MenuItem(props) {
  return (
    <TouchableOpacity style={[styles.item, { ...props.style }]} onPress={props.onPress}>
      <View style={styles.row}>
        {props.children}
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <MaterialCommunityIconsIcon name="chevron-right" style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    elevation: 3,
    shadowOpacity: 0.26,
    shadowRadius: 3,
    backgroundColor: '#fff'
  },
  row: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5
  },
  label: { fontSize: 17, marginLeft: 10 },
  icon: { fontSize: 34, color: colors.primary }
});
