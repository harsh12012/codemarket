import colors from '@parkyourself-frontend/shared/config/colors';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function UserProfileCard({ user }) {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: user.picture
        }}
        style={styles.image}
      />
      <Text style={styles.name}>{user.name}</Text>
      <View style={styles.row}>
        <View>
          <Text style={styles.name}>{user.bookings}</Text>
          <Text style={styles.namde}>Bookings</Text>
        </View>
        <View>
          <Text style={styles.name}>$750</Text>
          <Text style={styles.namde}>Money Spent</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.name}>{user.listings}</Text>
          <Text style={styles.namde}>Listings</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.name}>
            <MaterialCommunityIconsIcon name="star" style={styles.icon} />
            4.8(17)
          </Text>
          <Text style={styles.namde}>Rating</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.name}>$3503</Text>
          <Text style={styles.namde}>Cashout</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white
  },
  image: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center' },
  name: { fontWeight: 'bold', alignSelf: 'center', marginTop: 10 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  box: {
    alignItems: 'center'
  },
  icon: {
    color: '#FFD700',
    fontSize: 16
  }
});
