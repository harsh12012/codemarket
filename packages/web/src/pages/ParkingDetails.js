import React from 'react';
import { useRouter } from 'next/router';
// import DriverContainer from '../app/components/DriverContainer';
import ListingDetail from '../app/components/listings/addListing/ListingDetail';

const ParkingDetails = ({ match }) => {
  const router = useRouter();
  const { id } = router.query;

  return id ? <ListingDetail id={id} /> : null;
  // return <DriverContainer>{id && <MoreDetails id={id} />}</DriverContainer>;
};

export default ParkingDetails;
