import React from 'react';
import { useBookingSubAdmin } from '@parkyourself-frontend/shared/hooks/bookings';
import AdminLayout from '../../src/app/components/other/AdminLayout';
import BookingTab from '../../src/app/components/booking/BookingTab';

export default function AdminPage() {
  return (
    <div>
      <AdminLayout>
        <AdminBookings />
      </AdminLayout>
    </div>
  );
}

const AdminBookings = () => {
  useBookingSubAdmin();
  return <BookingTab screen="adminBookings" />;
};
