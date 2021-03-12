import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '@parkyourself-frontend/shared/config/colors';

export default function MenuItem(props) {
  const [menu, setMenu] = useState(false);
  
  return (
    <View style={[styles.drop, { ...props.style }]}>
      <TouchableOpacity style={styles.item} onPress={() => setMenu(!menu)}>
        <View style={styles.row}>
          {props.children}
          <Text style={styles.label}>{props.label}</Text>
        </View>
        <MaterialCommunityIconsIcon
          name={menu ? 'chevron-down' : 'chevron-right'}
          style={styles.icon}
        />
      </TouchableOpacity>
      {menu && (
        <View style={styles.dropItem}>
          {props.options.map((o, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => (o.navigate ? props.navigation.navigate(o.navigate) : {})}>
              <Text style={styles.dropLabel}>{o.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  drop: {
    // backgroundColor: colors.white,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    // alignItems: 'center',
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
  dropItem: {
    // paddingRight: 80
    // marginRight: 50
  },
  item: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  row: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5
  },
  label: { fontSize: 17, marginLeft: 10 },
  dropLabel: { fontSize: 16, marginLeft: 40, paddingTop: 15 },
  icon: { fontSize: 34, color: colors.primary }
});
