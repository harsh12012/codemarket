import colors from '@parkyourself-frontend/shared/config/colors';
import React from 'react';
import { View } from 'react-native';
import { useBookingSubListing } from '@parkyourself-frontend/shared/hooks/bookings';
import ScreenTittle from '../../components/common/ScreenTittle';
import StaffOrderTabs from '../../components/listing/staffOrder/StaffOrderTabs';

export default function MyBookings({ route }) {
  const { listingId } = route.params;
  useBookingSubListing(listingId);
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={{ padding: 10 }}>
        <ScreenTittle title="Parking Orders" />
      </View>
      <StaffOrderTabs showHeader={false} screen="staffOrders" listingId={listingId} />
    </View>
  );
}
