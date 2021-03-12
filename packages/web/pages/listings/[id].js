import React from 'react';
import scriptLoader from 'react-async-script-loader';
import UserLayout from '../../src/app/components/other/UserLayout';
import ListingDetails from '../../src/pages/ListingDetails';

function Page(props) {
  return (
    <UserLayout authRequired={true}>
      {props.isScriptLoaded && props.isScriptLoadSucceed ? <ListingDetails /> : null}
    </UserLayout>
  );
}

export default scriptLoader([
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyDF0pzALjYYanPshuclFzq_2F24xZWZjOg&libraries=geometry,drawing,places'
])(Page);
