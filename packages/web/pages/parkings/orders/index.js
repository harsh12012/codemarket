import { useBookingSubOwner } from '@parkyourself-frontend/shared/hooks/bookings';
import { useSelector } from 'react-redux';
import UserLayout from '../../../src/app/components/other/UserLayout';
import BookingTab from '../../../src/app/components/booking/BookingTab';

export default function Page() {
  return (
    <UserLayout authRequired={true}>
      <ParkingOrders />
    </UserLayout>
  );
}

const ParkingOrders = () => {
  const ownerId = useSelector(({ auth }) => (auth.authenticated ? auth.data.attributes.sub : null));
  useBookingSubOwner(ownerId);

  return (
    <BookingTab
      ownerId={ownerId}
      parkingOrder={true}
      screen="parkingOrders"
      title="Parking Orders"
    />
  );
};
