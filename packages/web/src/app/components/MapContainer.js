import React, { useEffect, useState } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';
import MarkerItem from './MarkerItem';
import moment from 'moment';
import { connect } from 'react-redux';
// import { GoogleMap, Marker } from "react-google-maps"
// const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

const MapContainer = ({
  google,
  onMapClick,
  coordinates,
  onMarkerClick = () => {},
  parkings = [],
  findParking
}) => {
  const { start, end } = findParking;
  console.log('coordinates:', coordinates);
  console.log('parkings:', parkings);
  const [bounds, setBounds] = useState(new google.maps.LatLngBounds());
  // const triangleCoords = [
  //   { lat: 25.774, lng: -80.19 },
  //   { lat: 18.466, lng: -66.118 },
  //   { lat: 32.321, lng: -64.757 },
  //   { lat: 25.774, lng: -80.19 },
  // ];

  const adjustMap = (mapProps, map) => {
    console.log('in adjust map');
    const { google, markers } = mapProps;
    console.log(google, markers);
    const bounds = new google.maps.LatLngBounds();
    if (markers) {
      markers.forEach((marker) => {
        const { lat, lng } = marker.position;

        bounds.extend(new google.maps.LatLng(lat, lng));
      });
    }
  };

  // useEffect(()=>{
  // var bounds = new google.maps.LatLngBounds();
  useEffect(() => {
    console.log('use effect : ', bounds, parkings);
    if (parkings) {
      for (var i = 0; i < parkings.length; i++) {
        setBounds(
          bounds.extend({
            lat: parkings[i].location.coordinates[1],
            lng: parkings[i].location.coordinates[1]
          })
        );
      }
    }
  }, [parkings]);

  // },[])

  return (
    <Map
      google={google}
      zoom={14}
      initialCenter={{ lng: coordinates[0], lat: coordinates[1] }}
      center={{ lng: coordinates[0], lat: coordinates[1] }}
      className="map-view"
      onClick={onMapClick}
      // onReady={adjustMap}
      bounds={bounds}

      // containerStyle={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {/* <Marker position={marker} onClick={() => {}} name={'Current location'} /> */}
      <Marker
        position={{ lng: coordinates[0], lat: coordinates[1] }}
        onClick={() => {}}
        name={'Current location'}
        // icon={{
        //   url:
        //     'https://www.pinclipart.com/picdir/big/2-29504_eye-clip-google-blue-marker-google-maps-png.png',
        //   anchor: new google.maps.Point(32, 32),
        //   scaledSize: new google.maps.Size(64, 64),
        // }}
        // icon='../../assets1/images/marker.png'
      >
        {/* <MarkerItem /> */}
      </Marker>

      {parkings.length > 0 &&
        parkings.map((item) => {
          let qty = item.spaceDetails.qtyOfSpaces;
          let res = item.bookingCount;
          let status = res.length > 0 ? qty - res[0].total > 0 : true;
          return (
            <Marker
              icon={{
                url:
                  'https://parkyourselfbucket154227-dev.s3.amazonaws.com/public/images/marker1.png',
                // 'https://www.pinclipart.com/picdir/big/2-29504_eye-clip-google-blue-marker-google-maps-png.png',
                anchor: new google.maps.Point(32, 32),
                scaledSize: new google.maps.Size(64, 64)
              }}
              position={{
                lng: item.location.coordinates[0],
                lat: item.location.coordinates[1]
              }}
              onClick={() => {
                onMarkerClick(item);
              }}
              label={{
                text: status
                  ? `$${(
                      moment.duration(moment(end).diff(moment(start))).asHours() *
                      item.pricingDetails.pricingRates.perHourRate
                    ).toFixed(1)}`
                  : 'Full',
                fontFamily: 'Arial',
                fontSize: '13px',
                color: '#fff'
              }}
            />
          );
        })}

      {/* {parkings.length > 0 &&
        parkings.map((item) => (
          <Polyline
            path={[
              { lat: coordinates[1], lng: coordinates[0] },
              {
                lat: item.location.coordinates[1],
                lng: item.location.coordinates[0],
              },
            ]}
            strokeColor='#0000FF'
            strokeOpacity={0.8}
            strokeWeight={2}
          />
        ))} */}

      {/* <Polyline
        path={triangleCoords}
        strokeColor='#0000FF'
        strokeOpacity={0.8}
        strokeWeight={2}
      /> */}

      {/* <InfoWindow onClose={() => {}}>
        <div>
          <h1>Delhi</h1>
        </div>
      </InfoWindow> */}
    </Map>
  );
};

const mapStateToProps = ({ findParking }) => ({
  findParking
});

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDF0pzALjYYanPshuclFzq_2F24xZWZjOg'
})(connect(mapStateToProps)(MapContainer));
// export default connect(mapStateToProps)(MapContainer);

//==================================

// import { compose } from "recompose";
// const {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
// } = require("react-google-maps");
// const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

// const MapWithAMarkerWithLabel = compose(
//   withScriptjs,
//   withGoogleMap
// )(({parkings,coordinates,onMapClick,onMarkerClick}) =>
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: coordinates[1], lng: coordinates[0] }}
//     onClick={onMapClick}
//   >
//     <MarkerWithLabel
//     onClick={onMarkerClick}
//       position={{ lat: coordinates[1], lng: coordinates[0] }}
//       labelAnchor={new window.google.maps.Point(0, 0)}
//       labelStyle={{backgroundColor: "yellow", fontSize: "32px", padding: "16px"}}
//     >
//       <div>Hello There!</div>
//     </MarkerWithLabel>
//   </GoogleMap>
// );

// const MapContainer = ({
//     onMapClick,
//     coordinates,
//     onMarkerClick = () => {},
//     parkings = [],
//   })=>{
//     console.log(coordinates);
// return <MapWithAMarkerWithLabel
//   googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDF0pzALjYYanPshuclFzq_2F24xZWZjOg&v=3.exp&libraries=geometry,drawing,places"
//   loadingElement={<div style={{ height: `100%` }} />}
//   containerElement={<div style={{ height: `400px` }} />}
//   mapElement={<div style={{ height: `100%` }} />}
//    onMapClick={onMapClick}
//    coordinates={coordinates}
//    onMarkerClick={onMarkerClick}
//    parkings={parkings}
// />

// }

// export default MapContainer;
