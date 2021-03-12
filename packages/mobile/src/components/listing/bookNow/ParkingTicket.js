import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import colors from '@parkyourself-frontend/shared/config/colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
import ScreenTittle from '../../common/ScreenTittle';

export default function ParkingTicket({ onPress, booking, vehicle = null }) {
  const viewRef = useRef();
  const shareImage = async () => {
    try {
      // capture component
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1
      });

      await Share.open({ url: uri });
    } catch (error) {
      // console.log('error', error);
    }
  };

  console.log(booking._id);

  return (
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <View style={styles.savedComponent} ref={viewRef}>
        <ScreenTittle title="Parking Ticket" textAlign="center" />
        <View>
          <View style={styles.ticketBox}>
            <Text style={styles.label}>{booking.address}</Text>
            {vehicle && (
              <View style={styles.vehicleBox}>
                <Text
                  style={
                    styles.carLabel
                  }>{`Car ${vehicle.make} ${vehicle.model} ${vehicle.year}`}</Text>
                <Text style={styles.carLabel}>{`License Plate - ${vehicle.licensePlate}`}</Text>
              </View>
            )}
            <View style={styles.timeRow}>
              <View style={styles.timeBox}>
                <Text style={styles.arriveAfter}>Arrive After</Text>
                <Text style={styles.time}>{moment(booking.start).format('LT')}</Text>
                <Text style={styles.tueJuly1}>{moment(booking.start).format('MMM Do YY')}</Text>
              </View>
              <FeatherIcon name="arrow-right" style={styles.arrow} />
              <View style={styles.timeBox}>
                <Text style={styles.arriveAfter}>Arrive After</Text>
                <Text style={styles.time}>{moment(booking.end).format('LT')}</Text>
                <Text style={styles.tueJuly1}>{moment(booking.end).format('MMM Do YY')}</Text>
              </View>
            </View>
          </View>
          <View style={styles.qrcodeBox}>
            <Text style={styles.labelText}>Show this OR code to enter the Parking area</Text>
            <QRCode value={booking._id} size={200} />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={shareImage}
          style={[styles.button, { backgroundColor: colors.primary }]}>
          <Text style={[styles.buttonText, { color: colors.white }]}>SEND AS GIFT</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>DONE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  savedComponent: {
    backgroundColor: 'white',
    padding: 10
  },
  ticketBox: { borderWidth: 1, borderColor: colors.primary, padding: 15, marginVertical: 20 },
  label: {
    color: colors.primary,
    fontSize: 18,
    textAlign: 'center'
  },
  timeRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  timeBox: { alignItems: 'center' },
  time: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 17
  },
  arrow: { marginHorizontal: 15, fontSize: 20 },
  vehicleBox: {
    marginVertical: 10
  },
  carLabel: {
    color: colors.black,
    fontSize: 15,
    textAlign: 'center'
    // marginTop: 5
  },
  qrcodeBox: {
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightGrey,
    padding: 10,
    paddingBottom: 20
  },
  labelText: { textAlign: 'center', marginBottom: 20, fontSize: 18, color: colors.grey },
  button: {
    backgroundColor: colors.primary,
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.primary
  },
  buttonText: { textAlign: 'center', color: colors.white, fontWeight: 'bold', fontSize: 17 }
});
