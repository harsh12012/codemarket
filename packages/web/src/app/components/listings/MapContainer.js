import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MapWithAMarker = withGoogleMap(({ coordinates }) => (
  <GoogleMap defaultZoom={15} center={{ lng: coordinates[0], lat: coordinates[1] }}>
    <Marker position={{ lng: coordinates[0], lat: coordinates[1] }} />
  </GoogleMap>
));
export default ({ coordinates }) => (
  <MapWithAMarker
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    coordinates={coordinates}
  />
);
