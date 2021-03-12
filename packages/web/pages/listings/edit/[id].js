import React from 'react';
import { useRouter } from 'next/router';
import scriptLoader from 'react-async-script-loader';
import UserLayout from '../../../src/app/components/other/UserLayout';
import EditListing from '../../../src/app/components/listings/addListing/EditListing';

function Page(props) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <UserLayout authRequired={true}>
      {props.isScriptLoaded && props.isScriptLoadSucceed && id ? <EditListing id={id} /> : null}
    </UserLayout>
  );
}

export default scriptLoader([
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyDF0pzALjYYanPshuclFzq_2F24xZWZjOg&libraries=geometry,drawing,places'
])(Page);
