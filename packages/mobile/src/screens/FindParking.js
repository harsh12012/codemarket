import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MapMarker from '../components/MapMarker';
import CardListItem from '../components/CardListItem';
import FindParkingForm from '../components/FindParkingForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function FindParking({ navigation, listings }) {
  const [markers, setMarkers] = useState([
    {
      id: '1',
      price: '$3.20',
      latlng: { latitude: 37.78825, longitude: -122.4324 },
      location: '906 Peg Shop St.Franklyn, NY'
    },
    {
      id: '2',
      price: '$2.90',
      latlng: { latitude: 37.795, longitude: -122.4424 },
      location: '88C Martin Road St.Franklyn, NY'
    },
    {
      id: '3',
      price: 'FREE',
      latlng: { latitude: 37.78925, longitude: -122.469 },
      location: '906 Amsterdam Avenue, NY'
    },
    {
      id: '4',
      price: '$1.30',
      latlng: { latitude: 37.765, longitude: -122.4614 },
      location: '711-2880 Nulla St. Mankato Mississippi'
    },
    {
      id: '5',
      price: '$0.90',
      latlng: { latitude: 37.772, longitude: -122.4214 },
      location: '3279 Viverra. Avenue Latrobe DE'
    }
  ]);

  // const [markers, setMarkers] = useState(
  //   listings.map((index, item) => ({
  //     id: item.id,
  //     price:
  //       item.pricingDetails.pricingType == 'Flat'
  //         ? item.pricingDetails.pricingRates.dailyMax
  //         : item.pricingDetails.pricingRates.perDayRate,
  //     latlng: item.locationDetails.latlng,
  //     location: `${item.locationDetails.address}, ${item.locationDetails.city}, ${item.locationDetails.state}, ${item.locationDetails.postalCode}`,
  //   })),
  // );

  const [showCardList, setShowCardList] = useState(false);
  const [cardList, setCardList] = useState(false);
  const [showMarkers, setShowMarkers] = useState(false);

  const showCardListHandler = () => {
    if (cardList.length > 1) {
      setShowCardList(false);
      setCardList([]);
      return;
    }
    setCardList(markers);
    setShowCardList(true);
  };

  const showSpecificCard = (id) => {
    if (cardList.length == 1) {
      setShowCardList(false);
      setCardList([]);
      return;
    }
    setCardList(markers.filter((item) => item.id == id));
    setShowCardList(true);
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.mapViewStack}> */}
      <MapView
        //provider={MapView.PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        customMapStyle={[
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
            latitude: 37.78825,
            longitude: -122.4324
          }}>
          <MapMarker title="$72" />
        </Marker>
        {/* {showMarkers &&
          markers.map((marker) => (
            <Marker
              coordinate={marker.latlng}
              key={marker.id}
              // title={marker.price}
              // description={marker.description}
              onPress={() => {
                showSpecificCard(marker.id);
              }}>
              <MapMarker title={marker.price} />
            </Marker>
          ))} */}
      </MapView>
      <FindParkingForm setShowMarkers={setShowMarkers} />
      {/* {true && ( */}
      <View style={styles.controlBtns}>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            if (markers.length > 0) {
              showSpecificCard(markers[0].id);
            }
          }}>
          <EntypoIcon name="location-pin" style={styles.icon5}></EntypoIcon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={showCardListHandler}>
          <FontAwesomeIcon name="th-list" style={styles.icon6}></FontAwesomeIcon>
        </TouchableOpacity>
      </View>
      {/* )} */}

      {showCardList && (
        <ScrollView
          contentContainerStyle={styles.cardList}
          // showsVerticalScrollIndicator={false}
        >
          {cardList.map((item) => (
            <CardListItem {...item} key={item.id} navigation={navigation} />
          ))}
        </ScrollView>
      )}
    </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
    // alignItems: 'center',
  },
  mapView: {
    position: 'absolute',
    // top: 46,
    height: 702,
    width: '100%',
    left: 0
  },
  controlBtns: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    zIndex: 10
  },
  button2: {
    // top: 184,
    // left: 288,
    width: 38,
    height: 35,
    // position: 'absolute',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    backgroundColor: 'rgba(255,255,255,1)',
    borderWidth: 1,
    borderColor: 'rgba(208,208,208,1)'
  },
  icon5: {
    color: 'rgba(39,170,225,1)',
    fontSize: 25,
    height: 27,
    width: 25,
    marginTop: 4,
    marginLeft: 8
  },
  button: {
    width: 39,
    height: 35,
    backgroundColor: 'rgba(252,252,252,1)',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(208,205,205,1)',
    borderLeftWidth: 1
  },
  icon6: {
    color: 'rgba(11,64,148,1)',
    fontSize: 20,
    height: 20,
    width: 20,
    marginTop: 8,
    marginLeft: 9
  },
  cardList: {
    minHeight: 300,
    width: '100%',
    zIndex: 100,
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});

// FindParkingForm.propTypes = {
//   listings: PropTypes.array.isRequired,
// };

const mapStateTopProps = (state) => ({
  listings: state.user.listings
});

export default connect(mapStateTopProps, null)(FindParking);
