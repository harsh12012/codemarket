import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import { deleteTempListing } from '@parkyourself-frontend/shared/redux/actions/tempListing';
import scriptLoader from 'react-async-script-loader';
import UserLayout from '../../src/app/components/other/UserLayout';
const AddListing = dynamic(
  () => import('../../src/app/components/listings/addListing/AddListing'),
  {
    ssr: false
  }
);

function Page(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(deleteTempListing());
  }, []);

  return (
    <UserLayout authRequired={true}>
      {props.isScriptLoaded && props.isScriptLoadSucceed ? <AddListing /> : null}
    </UserLayout>
  );
}

export default scriptLoader([
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyDF0pzALjYYanPshuclFzq_2F24xZWZjOg&libraries=geometry,drawing,places'
])(Page);
