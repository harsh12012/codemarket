import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from '@parkyourself-frontend/shared/config/colors';
import moment from 'moment';

const PromoCodeItem = ({
  code,
  discount,
  startDate,
  endDate,
  quantity,
  remaining,
  onEdit,
  onDelete
}) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.itemViewName}>
        <Text style={styles.itemNameText}>{code}</Text>
      </View>
      <View style={styles.itemViewName}>
        <Text style={styles.itemNameText}>{discount*100}</Text>
      </View>
      <View style={styles.itemViewName}>
        <Text style={styles.itemText}>{moment(startDate).format('llll')}</Text>
      </View>
      <View style={styles.itemViewName}>
        <Text style={styles.itemText}>{moment(endDate).format('llll')}</Text>
      </View>
      <View style={styles.itemViewName}>
        <Text style={styles.itemNameText}>{quantity}</Text>
      </View>
      <View style={styles.itemViewName}>
        <Text style={styles.itemNameText}>{remaining}</Text>
      </View>
      <View style={styles.itemViewOp}>
        <TouchableOpacity style={{ marginRight: 10 }} onPress={onEdit}>
          <FeatherIcon name="edit" style={styles.featherIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <MaterialCommunityIconsIcon name="delete" style={styles.materialCIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PromoCodeItem;

const styles = StyleSheet.create({
  itemViewName: {
    width: 130,
    borderWidth: 1,
    borderColor: '#cecece',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center'
  },
  itemText: {
    fontSize: 16,
    paddingLeft: 5,
    paddingRight: 5
  },
  itemNameText: {
    fontSize: 16,
    paddingLeft: 5,
    paddingRight: 5
  },
  itemViewOp:{
    width: 130,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    borderWidth: 1,
    borderColor: '#cecece',
    paddingTop: 10,
    paddingBottom: 10,
  },
  materialCIcon: {
    fontSize: 28,
    color: colors.secondary
  },
  featherIcon: {
    fontSize: 25,
    color: colors.secondary
  }
});
