import React from 'react';
import { useRouter } from 'next/router';
import SpaceOwnerContainer from '../app/components/SpaceOwnerContainer';
import MoreDetails from './MoreDetails';

const ListingDetails = ({ match }) => {
  const router = useRouter();
  const { id } = router.query;
  return <SpaceOwnerContainer>{id && <MoreDetails id={id} />}</SpaceOwnerContainer>;
};

export default ListingDetails;
