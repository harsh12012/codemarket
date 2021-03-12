import colors from '@parkyourself-frontend/shared/config/colors';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { extendMoment } from 'moment-range';
import ParkingTicketModal from './ParkingTicketModal';

const placeholderImage = require('../../assets/images/cars.jpg');

const moment2 = extendMoment(moment);

export default function BookingCard({ booking, index }) {
  const [disabled, setDisabled] = useState(false);
  const [showParkingTicketModal, setShowParkingTicketModal] = useState(false);
  const start = new Date(booking.start);
  const end = new Date(booking.end);
  const range = moment2.range(start, end);
  const monthDiff = range.diff('months');
  const dayDiff = range.diff('days');
  const hourDiff = range.diff('hours');

  // console.log('/n n ', booking._id);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.imageRow}>
          <Image
            source={booking.images.length > 0 ? { uri: booking.images[0] } : placeholderImage}
            style={styles.image}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.topRow}>
            <View style={styles.nameRow}>
              <Text style={styles.title}>{booking.address}</Text>
            </View>
            <View>
              <View style={styles.durationView}>
                <Text style={styles.durationText}>
                  {monthDiff <= 0 ? (dayDiff <= 0 ? hourDiff : dayDiff) : monthDiff}
                  {monthDiff <= 0 ? (dayDiff <= 0 ? ' hours' : ' day') : ' month'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.nameRow}>
            <Text style={styles.textDate}>
              {moment(new Date(booking.start)).format('lll')} to{' '}
              {moment(new Date(booking.end)).format('lll')}
            </Text>
            <Text style={styles.subTitle}>
              Booked by: <Text style={styles.ownerName}>{booking.driverName}</Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.button,
            booking.status === 'cancelled' ? { backgroundColor: colors.lightGrey } : {}
          ]}>
          <Text
            style={[
              styles.buttonText,
              booking.status === 'cancelled' ? { color: colors.grey } : {}
            ]}>{`$${booking.payment.toFixed(2)} ${
            booking.status === 'cancelled' ? 'Refunded' : ''
          }`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
          <Text style={styles.buttonText2}>More Details</Text>
        </TouchableOpacity>
      </View>
      <ParkingTicketModal
        visible={showParkingTicketModal}
        onHide={() => setShowParkingTicketModal(false)}
        booking={booking}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'grey',
    backgroundColor: colors.white,
    marginBottom: 10,
    borderRadius: 1
  },
  topRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imageRow: { flexDirection: 'row' },
  image: { width: 50, height: 50, borderRadius: 25 },
  nameRow: {
    marginLeft: 10,
    flex: 1
  },
  title: {
    fontWeight: 'bold'
  },
  ownerName: {
    textDecorationLine: 'underline'
  },
  iconRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5
  },
  icon: {
    color: '#FFD700',
    fontSize: 16
  },
  durationView: {
    backgroundColor: colors.lightBlue,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3
  },
  durationText: {
    color: colors.secondary,
    fontSize: 13
  },
  textDate: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 13,
    marginVertical: 5
  },
  buttonRow: {
    flexDirection: 'row',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    marginTop: 10,
    borderTopWidth: 0.3
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 2,
    flex: 0.4,
    alignItems: 'center'
  },
  button2: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 2,
    flex: 0.4,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.primary
  },
  buttonText: { color: colors.white, fontSize: 13, textAlign: 'center', fontWeight: 'bold' },
  buttonText2: { color: colors.primary, fontSize: 13, textAlign: 'center', fontWeight: 'bold' }
});
