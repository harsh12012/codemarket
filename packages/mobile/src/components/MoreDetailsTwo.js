import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import moment from 'moment';

export default function MoreDetailsTwo({ locationDetails, spaceAvailable }) {
  const { address, city, state, postalCode, marker } = locationDetails;
  const {
    scheduleType,
    startTime,
    endTime,
    activeDays,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
  } = spaceAvailable;
  // const {
  //   monday,
  //   tuesday,
  //   wednesday,
  //   thursday,
  //   friday,
  //   saturday,
  //   sunday,
  // } = activeDays;
  return (
    <Fragment>
      <View style={styles.rect}>
        <View style={styles.locationOnMapRow}>
          <Text style={styles.locationOnMap}>Location on map</Text>
          <TouchableOpacity>
            <Text style={styles.viewInGoogleApp}>View in google app</Text>
          </TouchableOpacity>
        </View>
        <MapView
          // provider={MapView.PROVIDER_GOOGLE}
          initialRegion={{
            latitude: marker.coordinates[1],
            longitude: marker.coordinates[0],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          customMapStylee={[
            {
              elementType: 'geometry',
              stylers: [
                {
                  color: '#f5f5f5'
                }
              ]
            },
            {
              elementType: 'labels.icon',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            },
            {
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#616161'
                }
              ]
            },
            {
              elementType: 'labels.text.stroke',
              stylers: [
                {
                  color: '#f5f5f5'
                }
              ]
            },
            {
              featureType: 'administrative.land_parcel',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#bdbdbd'
                }
              ]
            },
            {
              featureType: 'poi',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#eeeeee'
                }
              ]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#757575'
                }
              ]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#e5e5e5'
                }
              ]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#9e9e9e'
                }
              ]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#ffffff'
                }
              ]
            },
            {
              featureType: 'road.arterial',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#757575'
                }
              ]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#dadada'
                }
              ]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#616161'
                }
              ]
            },
            {
              featureType: 'road.local',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#9e9e9e'
                }
              ]
            },
            {
              featureType: 'transit.line',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#e5e5e5'
                }
              ]
            },
            {
              featureType: 'transit.station',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#eeeeee'
                }
              ]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#c9c9c9'
                }
              ]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#9e9e9e'
                }
              ]
            }
          ]}
          style={styles.mapView}>
          <Marker
            coordinate={{
              latitude: marker.coordinates[1],
              longitude: marker.coordinates[0]
            }}
          />
        </MapView>
        <Text style={styles.loremIpsum}>
          {address}, {city}, {state}, {postalCode}
        </Text>
      </View>
      <View style={styles.rect2}>
        <Text style={styles.hours}>Hours</Text>
        <Text style={styles.loremIpsum2}>
          This facility is open{' '}
          {scheduleType == 'daily'
            ? `from ${moment(startTime).format('lll')} to ${moment(endTime).format('lll')}`
            : '24/7'}{' '}
          on {monday && 'Monday'}
          {tuesday && ', Tuesday'}
          {wednesday && ', Wednesday'}
          {thursday && ', Thursday'}
          {friday && ', Friday'}
          {saturday && ', Saturday'}
          {sunday && ', Sunday'}.
        </Text>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  rect: {
    width: '100%',
    backgroundColor: 'rgba(255,252,252,1)',
    marginTop: 20,
    padding: 10
  },
  locationOnMap: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 18
  },
  viewInGoogleApp: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    textDecorationLine: 'underline',
    marginLeft: 67,
    marginTop: 3
  },
  locationOnMapRow: {
    // height: 22,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  mapView: {
    height: 300,
    width: '100%',
    marginTop: 13
    // marginLeft: 14,
  },
  loremIpsum: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(0,0,0,1)',
    fontSize: 16,
    marginTop: 19,
    marginLeft: 10
  },
  rect2: {
    width: '100%',
    paddingBottom: 10,
    // height: 88,
    backgroundColor: 'rgba(255,255,255,1)',
    marginTop: 20
    // marginLeft: 15,
  },
  hours: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 17,
    marginTop: 15,
    marginLeft: 15
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginTop: 14,
    marginLeft: 15
  }
});
