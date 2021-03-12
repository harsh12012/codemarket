import React from 'react';
import { useBookingSubAdmin } from '@parkyourself-frontend/shared/hooks/bookings';
import BookingTabs from '../../components/booking/BookingTabs';

export default function AdminBooking() {
  useBookingSubAdmin();
  return <BookingTabs screen="adminBookings" />;
}
