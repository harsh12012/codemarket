import { useRouter } from 'next/router';
import UserLayout from '../../../src/app/components/other/UserLayout';
import dynamic from 'next/dynamic';
import { useBookingSubListing } from '@parkyourself-frontend/shared/hooks/bookings';
const ListingParkingOrders = dynamic(() => import('../../../src/pages/ListingParkingOrders'), {
  ssr: false
});

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  return <UserLayout authRequired={true} >
        <ParkingOrders id={id}/>
    </UserLayout>;

}


const ParkingOrders = ({id}) =>{
  
  return <ListingParkingOrders id={id} screen="staffOrders" ownerId={null} driverId={null}/>

}