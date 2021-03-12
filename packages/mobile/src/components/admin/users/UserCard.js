/* eslint-disable react/prop-types */
import colors from '@parkyourself-frontend/shared/config/colors';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export default function UserCard({ user, index, toggleUser, showTime }) {
  const navigation = useNavigation();
  const [disabled, setDisabled] = useState(false);
  const toggle = async () => {
    setDisabled(true);
    await toggleUser(user.username, !user.active);
    setDisabled(false);
  };

  const start = new Date(user.createdAt);
  const end = new Date();
  const range = moment.range(start, end);
  const monthDiff = range.diff('months');
  const dayDiff = range.diff('days');
  const hourDiff = range.diff('hours');

  return (
    <View style={[styles.container, { borderTopWidth: index === 0 ? 0.5 : 0 }]}>
      <View style={styles.imageRow}>
        <Image
          source={{
            uri: user.picture
          }}
          style={styles.image}
        />
        <View style={styles.nameRow}>
          <TouchableOpacity
            onPress={() => (!showTime ? navigation.navigate('AdminUserProfile', { user }) : null)}>
            <Text style={styles.title}>{user.name}</Text>
          </TouchableOpacity>
          <Text style={styles.subTitle}>bookings {user.bookings}</Text>
          <Text style={styles.subTitle}>spaces {user.listings}</Text>
        </View>
      </View>
      {!showTime ? (
        <View>
          <View style={styles.iconRow}>
            <MaterialCommunityIconsIcon name="star" style={styles.icon} />
            <Text>4.8(17)</Text>
          </View>
          <TouchableOpacity
            disabled={disabled}
            style={[styles.button, { backgroundColor: user.active ? 'black' : '#FFD700' }]}
            onPress={toggle}>
            {disabled ? (
              <ActivityIndicator color={user.active ? 'white' : 'black'} size="small" />
            ) : (
              <Text style={[styles.buttonText, { color: user.active ? 'white' : 'black' }]}>
                {user.active ? 'Block' : 'Unblock'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.iconRow}>
          <MaterialCommunityIconsIcon
            name="clock-outline"
            style={[styles.icon, { marginRight: 2, color: 'grey' }]}
          />
          <Text>
            {monthDiff <= 0 ? (dayDiff <= 0 ? hourDiff : dayDiff) : monthDiff}
            {monthDiff <= 0 ? (dayDiff <= 0 ? ' hours ago' : ' day ago') : ' month ago'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: 'grey'
  },
  imageRow: { flexDirection: 'row' },
  image: { width: 50, height: 50, borderRadius: 25 },
  nameRow: { marginLeft: 10 },
  title: {
    fontWeight: 'bold'
  },

  button: {
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 2
  },
  buttonText: { color: colors.white, fontSize: 13, textAlign: 'center' },
  iconRow: {
    alignItems: 'center',
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5
  },
  icon: {
    color: '#FFD700',
    fontSize: 16
  }
});
