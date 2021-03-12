import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { updateFindParkingData } from '@parkyourself-frontend/shared/redux/actions/findParking';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import colors from '@parkyourself-frontend/shared/config/colors';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import OutlineButton from '../../common/OutlineButton';
import AddressModal from '../addListing/AddressModal';
import DatePicker from './DatePicker';
import { changeToNewRoundOfDateTime } from '@parkyourself-frontend/shared/utils/time';


function FindParkingForm() {
  const { start, end, duration, search } = useSelector(({ findParking }) => findParking);
  const dispatch = useDispatch();

  const [picker, setPicker] = useState({
    showPicker: false,
    mode: 'date',
    type: 'start',
    date: new Date(),
    minimumDate: new Date()
  });
  const [showAddressModal, setShowAddressModal] = useState(false);
  const sheetRef = useRef(null);

  const handlePickerChange = (selectedDate) => {
    if (picker.type === 'start') {
      if (picker.mode === 'date' && new Date(selectedDate) > new Date(end)) {
        const tempEndDate = new Date(new Date(selectedDate).setHours(selectedDate.getHours() + 3));
        dispatch(updateFindParkingData({ start: selectedDate, end: tempEndDate }));
      } else {
        dispatch(updateFindParkingData({ start: changeToNewRoundOfDateTime(selectedDate) }));
      }
    } else {
      if(selectedDate <= start){
        dispatch(updateFindParkingData({ end: new Date(new Date(selectedDate).setDate(new Date(start).getDate()+1)) }));
      }else{
        dispatch(updateFindParkingData({ end: selectedDate }));
      }
      
    }
    
  };

  const showPicker = (date, type = 'start', mode = 'date') => {
    setPicker({
      ...picker,
      date: new Date(date),
      type,
      mode,
      minimumDate: type === 'start' ? new Date() : new Date(start)
      // showPicker: true
    });
    sheetRef.current.snapTo(0);
  };



  return (
    <>
      <View>
    
        <View style={styles.durationRow}>
          <View style={[styles.durationBox, { opacity: duration === 'hourly' ? 1 : 0.5 }]}>
            <TouchableOpacity
              style={[styles.durationBox]}
              onPress={() => dispatch(updateFindParkingData({ duration: 'hourly' }))}>
              <FontAwesomeIcon name="clock-o" style={styles.icon} />
              <Text style={styles.daily}>HOURLY</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.durationBox, { opacity: duration === 'monthly' ? 1 : 0.5 }]}>
            <TouchableOpacity
              style={[styles.durationBox]}
              onPress={() => dispatch(updateFindParkingData({ duration: 'monthly' }))}>
              <FontAwesomeIcon name="calendar" style={styles.icon} />
              <Text style={styles.daily}>MONTHLY</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{ height: 50, paddingHorizontal: 10, paddingTop: Platform.OS === 'ios' ? 5 : 0 }}>
          {Platform.OS === 'ios' ? (
            <>
              <OutlineButton
                label={search || 'Search your address'}
                onPress={() => setShowAddressModal(true)}
              />
              <AddressModal
                visible={showAddressModal}
                onHide={() => setShowAddressModal(false)}
                onSelect={(data, details) => {
                  dispatch(
                    updateFindParkingData({
                      coordinates: [details.geometry.location.lng, details.geometry.location.lat],
                      search: data.structured_formatting.main_text
                    })
                  );
                  setShowAddressModal(false);
                }}
              />
            </>
          ) : (
            <GooglePlacesAutocomplete
              clearSearch
              clearTextOnFocus
              onPress={(data, details = null) => {
                dispatch(
                  updateFindParkingData({
                    coordinates: [details.geometry.location.lng, details.geometry.location.lat]
                  })
                );
              }}
              placeholder="Search Location"
              poweredContainer={false}
              listViewDisplayed={false}
              fetchDetails
              nearbyPlacesAPI="GooglePlacesSearch"
              GooglePlacesSearchQuery={{
                rankby: 'distance',
                type: ['cities']
              }}
              GooglePlacesDetailsQuery={{
                fields: ['geometry']
              }}
              debounce={200}
              isRowScrollable
              filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
              enablePoweredByContainer={false}
              query={{
                key: 'AIzaSyDF0pzALjYYanPshuclFzq_2F24xZWZjOg',
                language: 'en',
                location: '30.36214,78.26541',
                radius: 100
              }}
              styles={{
                textInputContainer: {
                  width: '100%',
                  padding: 0,
                  backgroundColor: '#fff',
                  borderWidth: 2,
                  borderRadius: 5,
                  borderColor: '#d6d6d6',
                  marginTop: 5,
                  marginBottom: 0,
                  elevation: 0
                },
                listView: {
                  backgroundColor: 'red',
                  position: 'absolute',
                  zIndex: 99999,
                  top: 50
                },
                row: {
                  backgroundColor: 'rgb(255,255,255)'
                },
                textInput: {
                  height: '100%',
                  marginTop: 0,
                  marginBottom: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  fontSize: 15,
                  paddingVertical: 0
                }
              }}
            />
          )}
        </View>
        <View style={styles.rect5Row}>
          <TouchableOpacity style={styles.rect5} onPress={() => showPicker(start, 'start', 'date')}>
            <Text style={styles.startDateTime}>Start Date</Text>
            <Text style={styles.dateText} numberOfLines={1}>
              {moment(start).format('ll')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rect5} onPress={() => showPicker(end, 'end', 'date')}>
            <Text style={styles.endDateTime}>End Date</Text>
            <Text style={styles.dateText} numberOfLines={1}>
              {moment(end).format('ll')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rect5Row}>
          <TouchableOpacity style={styles.rect5} onPress={() => showPicker(start, 'start', 'time')}>
            <Text style={styles.startDateTime}>Start Time</Text>
            <Text style={styles.dateText} numberOfLines={1}>
              {moment(start).format('LT')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rect5} onPress={() => showPicker(end, 'end', 'time')}>
            <Text style={styles.endDateTime}>End Time</Text>
            <Text style={styles.dateText} numberOfLines={1}>
              {moment(end).format('LT')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet
        ref={sheetRef}
        initialSnap={1}
        snapPoints={[300, 0]}
        borderRadius={20}
        renderContent={(props) => (
          <DatePicker
            {...props}
            minimumDate={picker.minimumDate}
            type={picker.type}
            mode={picker.mode}
            date={picker.type === 'start' ? start : end}
            onChange={handlePickerChange}
            onClose={() => sheetRef.current.snapTo(1)}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  durationRow: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20 },
  durationBox: { flexDirection: 'row' },
  active: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 3,
    opacity: 1
  },
  icon: {
    color: colors.secondary,
    fontSize: 20
  },
  daily: {
    color: colors.secondary,
    fontSize: 15,
    marginLeft: 5
  },
  rect5: {
    width: '48%',
    borderWidth: 1,
    borderColor: colors.lightGrey,
    paddingVertical: 5,
    alignItems: 'center'
  },
  startDateTime: {
    color: colors.grey,
    textAlign: 'center'
  },
  endDateTime: {
    color: colors.grey,
    textAlign: 'center'
  },
  rect5Row: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  dateText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500'
  },

});

export default FindParkingForm;
