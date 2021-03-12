import colors from '@parkyourself-frontend/shared/config/colors';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useBookingSubDriver } from '@parkyourself-frontend/shared/hooks/bookings';
import BookingTabs from '../../components/booking/BookingTabs';

export default function MyBookings() {
  const driverId = useSelector(({ auth }) =>
    auth.authenticated ? auth.data.attributes.sub : 'null'
  );

  useBookingSubDriver(driverId);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <BookingTabs driverId={driverId} showHeader={false} screen="myBookings" showHeader={true} />
    </View>
  );
}
