import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MapView, { Marker } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import colors from '@parkyourself-frontend/shared/config/colors';
import { useFindParking } from '@parkyourself-frontend/shared/hooks/listings';
import Geolocation from '@react-native-community/geolocation';
import { updateFindParkingData } from '@parkyourself-frontend/shared/redux/actions/findParking';
import Form from './Form';
import Card from './Card';
import MapMarker from './MapMarker';
import ScreenTittle from '../../common/ScreenTittle';
import FilterButton from '../../common/FilterButton';
import ParkingFilter from './ParkingFilter';

export default function Map() {
  const { start, end, coordinates, parkings } = useSelector(({ findParking }) => findParking);
  useFindParking();
  const [showList, setShowList] = useState({
    showList: false,
    showSingle: false,
    selectedItem: {}
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('');
  const [range, setRange] = useState({
    startDate: null,
    endDate: null,
    displayedDate: moment()
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (pos) => {
        // console.log('getCurrentPosition pos', pos);
        dispatch(
          updateFindParkingData({
            coordinates: [pos.coords.longitude, pos.coords.latitude]
          })
        );
      },
      (e) => {
        // console.log('getCurrentPosition error', e);
        // Alert.alert(e.message);
      }
    );
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.headerView}>
          <ScreenTittle title="FIND PARKING" />
          <FilterButton modalVisible={modalVisible}>
          <ParkingFilter
              range={range}
              setRange={setRange}
              setModalVisible={setModalVisible}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          </FilterButton>
        </View>
      <Form />
      <View
        style={{
          flex: 1,
          marginTop: 2
        }}>
        {parkings && parkings.length > 0 && (
          <View style={styles.controlBtns}>
            <TouchableOpacity
              style={styles.button2}
              onPress={() =>
                setShowList({
                  ...showList,
                  showList: showList.showSingle ? false : showList.showList
                })
              }>
              <EntypoIcon name="location-pin" style={styles.icon5} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                setShowList({
                  ...showList,
                  showList: showList.showSingle ? true : !showList.showList,
                  showSingle: false
                })
              }>
              <FontAwesomeIcon
                name={showList.showList && !showList.showSingle ? 'close' : 'th-list'}
                style={styles.icon6}
              />
            </TouchableOpacity>
          </View>
        )}
        {showList.showList && (
          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              top: 45,
              width: '100%',
              flex: 1,
              flexDirection: 'column',
              paddingHorizontal: 10,
              height: Dimensions.get('window').height - 300
            }}>
            <ScrollView>
              {showList.showSingle ? (
                <Card
                  parking={showList.selectedItem}
                  navigation={navigation}
                  price={(
                    moment.duration(moment(end).diff(moment(start))).asHours() *
                    showList.selectedItem.pricingDetails.pricingRates.perHourRate
                  ).toFixed()}
                />
              ) : (
                parkings.map((parking, key) => (
                  <Card
                    key={parking._id}
                    parking={parking}
                    navigation={navigation}
                    price={(
                      moment.duration(moment(end).diff(moment(start))).asHours() *
                      parking.pricingDetails.pricingRates.perHourRate
                    ).toFixed()}
                  />
                ))
              )}
              <View style={{ marginBottom: 100 }} />
            </ScrollView>
          </View>
        )}
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: coordinates[1],
            longitude: coordinates[0],
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}>
          {parkings.map((parking) => (
            <Marker
              key={parking._id}
              coordinate={{
                longitude: parking.location.coordinates[0],
                latitude: parking.location.coordinates[1]
              }}
              onPress={() =>
                setShowList({
                  ...showList,
                  showList: true,
                  showSingle: true,
                  selectedItem: parking
                })
              }>
              <MapMarker
                price={(
                  moment.duration(moment(end).diff(moment(start))).asHours() *
                  parking.pricingDetails.pricingRates.perHourRate
                ).toFixed()}
              />
            </Marker>
          ))}
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  controlBtns: {
    right: 0,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
    paddingRight: 10,
    zIndex: 10
  },
  button2: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGrey
  },
  icon5: {
    color: colors.primary,
    fontSize: 25,
    paddingTop: 2
    // height: 27,
    // width: 25,
    // marginTop: 4,
    // marginLeft: 8
  },
  button: {
    backgroundColor: colors.white,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderLeftWidth: 1
  },
  icon6: {
    color: colors.secondary,
    fontSize: 20,
    padding: 6
    // height: 20,
    // width: 20,
    // marginTop: 8,
    // marginLeft: 9
  },
  cardList: {
    position: 'absolute',
    // height: 600,
    width: '100%',
    zIndex: 100,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  headerView: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
