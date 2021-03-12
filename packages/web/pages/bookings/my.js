import { useSelector } from 'react-redux';
import { useBookingSubDriver } from '@parkyourself-frontend/shared/hooks/bookings';
import UserLayout from '../../src/app/components/other/UserLayout';
import BookingTab from '../../src/app/components/booking/BookingTab';

export default function Page() {
  return (
    <UserLayout authRequired={true}>
      <MyBookings />
    </UserLayout>
  );
}

const MyBookings = () => {
  const driverId = useSelector(({ auth }) =>
    auth.authenticated ? auth.data.attributes.sub : null
  );
  useBookingSubDriver(driverId);

  return <BookingTab driverId={driverId} screen="myBookings" />;
};
