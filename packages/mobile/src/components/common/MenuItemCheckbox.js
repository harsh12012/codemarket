import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '@parkyourself-frontend/shared/config/colors';
import { color } from 'react-native-reanimated';

export default function MenuItemCheckbox(props) {
  return (
    <TouchableOpacity style={[styles.item, { ...props.style }]} onPress={props.onPress}>
      <View style={styles.row}>
        {props.children}
        <Text style={styles.label}>{props.label}</Text>
      </View>
      {
          props.checked ?

        <View style={styles.checkedBox}>
            <MaterialCommunityIconsIcon name="check" style={styles.checkedIcon} />
        </View>
        :
        <View style={styles.checkbox}>
            
        </View>
      }
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
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    elevation: 5,
    shadowOpacity: 0.26,
    shadowRadius: 3,
    backgroundColor: '#fff',
    marginBottom:15,
  },
  row: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5
  },
  label: { fontSize: 17, marginLeft: 10 },
  checkbox:{
      width:32,
      height:32,
      borderWidth:1,
      borderColor:'#CECECE'
  },
  checkedBox:{
    width:32,
    height:32,
    borderWidth:1,
    borderColor:colors.primary,
    backgroundColor:colors.primary,
    justifyContent:'center',
    alignItems:'center'

  },
  checkedIcon: { fontSize: 30, color: colors.white },
});
