import colors from '@parkyourself-frontend/shared/config/colors';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useBookingSubOwner } from '@parkyourself-frontend/shared/hooks/bookings';
import BookingTabs from '../../components/booking/BookingTabs';
// import ScreenTittle from '../../components/common/ScreenTittle';

export default function MyBookings() {
  const ownerId = useSelector(({ auth }) => (auth.authenticated ? auth.data.attributes.sub : null));
  useBookingSubOwner(ownerId);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {/* <View style={{ padding: 10 }}>
        <ScreenTittle title="Parking Orders" /> 
      </View> */}

      <BookingTabs
        ownerId={ownerId}
        showHeader={false}
        parkingOrder={true}
        screen="parkingOrders"
        showHeader={true}
        title="Parking Orders"
      />
    </View>
  );
}
