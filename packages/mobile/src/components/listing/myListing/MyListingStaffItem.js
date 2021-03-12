import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from '@parkyourself-frontend/shared/config/colors';
import moment from 'moment';

const MyListingStaffItem = ({ name, email, role, createdAt, onEdit, onDelete }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.itemViewName}>
        <TouchableOpacity>
          <Text style={styles.itemNameText}>{name}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemViewEmail}>
        <Text style={styles.itemText}>{email}</Text>
      </View>
      <View style={styles.itemViewRole}>
        <Text style={styles.itemText}>{role}</Text>
      </View>
      <View style={styles.itemViewRole}>
        <Text style={styles.itemText}>{moment(createdAt).format('DD/MM/YYYY')}</Text>
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

export default MyListingStaffItem;

const styles = StyleSheet.create({
  itemViewName: {
    width: 130,
    borderWidth: 1,
    borderColor: '#cecece',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center'
  },
  itemViewEmail: {
    width: 200,
    borderWidth: 1,
    borderColor: '#cecece',
    paddingTop: 10,
    paddingBottom: 10
  },
  itemViewRole: {
    width: 109,
    borderWidth: 1,
    borderColor: '#cecece',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center'
  },
  itemViewOp: {
    width: 109,
    borderWidth: 1,
    borderColor: '#cecece',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingRight: 5,
    textDecorationLine: 'underline'
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
