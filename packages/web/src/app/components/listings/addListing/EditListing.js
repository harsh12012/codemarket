import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import { useGetOneListing } from '@parkyourself-frontend/shared/hooks/listings';
import omitTypename from '@parkyourself-frontend/shared/utils/omitTypename';
import { addTempListing } from '@parkyourself-frontend/shared/redux/actions/tempListing';
import NotFound from '../../other/NotFound';
import Loading from '../../other/Loading';

const AddListing = dynamic(() => import('./AddListing'), {
  ssr: false
});

export default function EditListing({ id }) {
  const { data, error, loading } = useGetOneListing(id);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && data.getListing) {
      const item = data.getListing;
      dispatch(
        addTempListing({
          ...item,
          validated: true,
          edit: true,
          locationDetails: JSON.parse(JSON.stringify(item.locationDetails), omitTypename),
          spaceDetails: JSON.parse(JSON.stringify(item.spaceDetails), omitTypename),
          spaceAvailable: JSON.parse(JSON.stringify(item.spaceAvailable), omitTypename),
          pricingDetails: JSON.parse(JSON.stringify(item.pricingDetails), omitTypename),
          location: JSON.parse(JSON.stringify(item.location), omitTypename)
        })
      );
    }
  }, [data]);
  if (loading) {
    return <Loading />;
  }
  return <>{error ? <NotFound /> : <AddListing edit />}</>;
}
