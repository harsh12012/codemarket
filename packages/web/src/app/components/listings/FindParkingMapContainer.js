import React from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { FaMapMarker } from 'react-icons/fa';
import moment from 'moment';

const MapWithAMarker = withGoogleMap(
  ({ coordinates, parkings = [], onMarkerClick = () => {}, start, end }) => (
    <GoogleMap defaultZoom={14} center={{ lng: coordinates[0], lat: coordinates[1] }}>
      {parkings.map((p, key) => (
        <MarkerWithLabel
          key={key}
          position={{ lng: p.location.coordinates[0], lat: p.location.coordinates[1] }}
          labelAnchor={new google.maps.Point(75, 90)}
          onClick={() => onMarkerClick(p)}>
          <Marker
            price={(
              moment.duration(moment(end).diff(moment(start))).asHours() *
              p.pricingDetails.pricingRates.perHourRate
            ).toFixed(1)}
          />
        </MarkerWithLabel>
      ))}
    </GoogleMap>
  )
);
const Marker = ({ price }) => (
  <div
    style={{
      textAlign: 'center'
      // backgroundColor: 'red',
      // width: '80px',
      // height: '80px'
    }}
    className="d-flexr">
    <p
      style={{
        position: 'absolute',
        left: '0px',
        right: '0px',
        marginLeft: 'auto',
        marginRight: 'auto',
        color: 'white',
        top: '17px',
        fontSize: '17px'
      }}>
      ${price}
    </p>
    <FaMapMarker className="map-marker-icon" style={{ zIndex: 0, fontSize: '70px' }} />
  </div>
);

export default (props) => (
  <MapWithAMarker
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `500px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    {...props}
  />
);
