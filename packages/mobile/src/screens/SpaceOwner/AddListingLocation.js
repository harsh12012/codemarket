import colors from '@parkyourself-frontend/shared/config/colors';
import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import {
  updateTempListing,
  tempListingLocationD,
  tempListingSpaceD
} from '@parkyourself-frontend/shared/redux/actions/tempListing';
import EntypoIcon from 'react-native-vector-icons/Entypo';
// import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { Picker } from '@react-native-community/picker';
import ImagePicker from 'react-native-image-picker';
import countries from '@parkyourself-frontend/shared/config/countries';
import Input from '../../components/Input';
import RadioListItem from '../../components/RadioListItem';
import AddressModal from '../../components/listing/addListing/AddressModal';
import CountryModal from '../../components/listing/addListing/CountryModal';
import OutlineButton from '../../components/common/OutlineButton';
import InputButton from '../../components/listing/addListing/InputButton';

const featureList = [
  '24/7 access',
  'Car Wash',
  'Covered',
  'EV Charging',
  'Fenced',
  'Mobile Pass',
  'Paved',
  'Security',
  'Staff onsite',
  'Tandem',
  'Unpaved',
  'Valet'
];

function AddListingLocation({
  locationDetails,
  tempListingLocationD,
  updateTempListing,
  activeIndex,
  validated,
  listingTypeOptions,
  propertyTypeOptions,
  spaceDetails,
  tempListingSpaceD
}) {
  const scrollRef = useRef();

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);

  const toggleFeatures = (feature) => {
    if (locationDetails.features.includes(feature)) {
      tempListingLocationD({
        features: locationDetails.features.filter((item) => item != feature)
      });
    } else {
      tempListingLocationD({ features: [...locationDetails.features, feature] });
    }
  };

  const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

  const removeImage = (type) => {
    if (type === 'streetViewImages') {
      tempListingLocationD({
        streetViewImages: []
      });
      updateTempListing({ tStreetViewImages: [] });
    } else if (type === 'parkingEntranceImages') {
      tempListingLocationD({
        parkingEntranceImages: []
      });
      updateTempListing({ tParkingEntranceImages: [] });
    } else {
      tempListingLocationD({
        parkingSpaceImages: []
      });
      updateTempListing({ tParkingSpaceImages: [] });
    }
  };

  const streetViewImagePickerHandler = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        tempListingLocationD({
          streetViewImages: [response.uri]
        });
        updateTempListing({ tStreetViewImages: [response.uri] });
      }
    });
  };
  const parkingEntranceImagePickerHandler = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        tempListingLocationD({
          parkingEntranceImages: [response.uri]
        });
        updateTempListing({ tParkingEntranceImages: [response.uri] });
      }
    });
  };

  const parkingSpaceImagePickerHandler = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        tempListingLocationD({
          parkingSpaceImages: [response.uri]
        });
        updateTempListing({ tParkingSpaceImages: [response.uri] });
      }
    });
  };

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.container}
        ref={scrollRef}>
        {activeIndex === 1 && (
          <>
            <Text style={styles.heading}>Choose a Listing Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={locationDetails.listingType}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  tempListingLocationD({ listingType: itemValue })
                }>
                <Picker.Item label="Select Option" value="" />
                {listingTypeOptions.map((o, i) => (
                  <Picker.Item key={i} label={o.label} value={o.value} />
                ))}
              </Picker>
            </View>
            <Input
              placeholder="Property Name"
              placeholderTextColor="rgba(182,182,182,1)"
              style={styles.textInput}
              value={locationDetails.propertyName}
              validated={validated}
              onChangeText={(input) => tempListingLocationD({ propertyName: input })}
            />
            <Text style={styles.heading}>Listing Address</Text>
            <OutlineButton label="Search your address" onPress={() => setShowAddressModal(true)} />
            <AddressModal
              visible={showAddressModal}
              onHide={() => setShowAddressModal(false)}
              onSelect={(data, details = null) => {
                let tempLoc = {
                  marker: {
                    type: 'Point',
                    coordinates: [details.geometry.location.lng, details.geometry.location.lat]
                  }
                };
                let add = '';
                add += data.structured_formatting.main_text;
                details.address_components.forEach((item) => {
                  if (item.types.includes('route')) {
                    add += `, ${item.long_name}`;
                  }
                  if (item.types.includes('sublocality')) {
                    add += `, ${item.long_name}`;
                  }
                  if (item.types.includes('country')) {
                    tempLoc = {
                      ...tempLoc,
                      country: item.long_name,
                      code: countries.filter((i) => i.country == item.long_name)[0].code
                    };
                  }
                  if (item.types.includes('administrative_area_level_1')) {
                    tempLoc = {
                      ...tempLoc,
                      state: item.long_name
                    };
                  }
                  if (item.types.includes('administrative_area_level_2')) {
                    tempLoc = {
                      ...tempLoc,
                      city: item.long_name
                    };
                  }
                  if (item.types.includes('postal_code')) {
                    tempLoc = {
                      ...tempLoc,
                      postalCode: item.long_name
                    };
                  }
                });
                tempListingLocationD({ ...tempLoc, address: add });
                setShowAddressModal(false);
              }}
            />
            <View style={{ marginBottom: 10 }} />
            <CountryModal
              visible={showCountryModal}
              onHide={() => setShowCountryModal(false)}
              selectedCountry={locationDetails.country}
              tempListingLocationD={tempListingLocationD}
              // onSelect={(tempCountry) => tempListingLocationD({ country: tempCountry })}
            />
            <InputButton
              label="Country"
              onPress={() => setShowCountryModal(true)}
              value={locationDetails.country}
            />
            <Input
              placeholder="Address"
              placeholderTextColor="rgba(182,182,182,1)"
              style={styles.placeholder}
              value={locationDetails.address}
              validated={validated}
              onChangeText={(input) => tempListingLocationD({ address: input })}
            />
            <Input
              placeholder="Unit #"
              placeholderTextColor="rgba(182,182,182,1)"
              style={styles.placeholder}
              value={locationDetails.unitNum}
              // validated={validated}
              onChangeText={(input) => tempListingLocationD({ unitNum: input })}
            />
            <Input
              placeholder="City/Town"
              placeholderTextColor="rgba(182,182,182,1)"
              style={styles.placeholder}
              value={locationDetails.city}
              validated={validated}
              onChangeText={(input) => tempListingLocationD({ city: input })}
            />
            <Input
              placeholder="State/Province"
              placeholderTextColor="rgba(182,182,182,1)"
              style={styles.placeholder}
              value={locationDetails.state}
              validated={validated}
              onChangeText={(input) => tempListingLocationD({ state: input })}
            />
            <Input
              placeholder="Postal Code"
              placeholderTextColor="rgba(182,182,182,1)"
              style={styles.placeholder}
              value={locationDetails.postalCode}
              validated={validated}
              onChangeText={(input) => tempListingLocationD({ postalCode: input })}
            />
            <View style={{ flexDirection: 'row' }}>
              <InputButton label=" " value={locationDetails.code} style={{ marginRight: 10 }} />
              <Input
                placeholder="Phone Number"
                placeholderTextColor="rgba(182,182,182,1)"
                style={styles.placeholder}
                value={locationDetails.phone}
                keyboardType="number-pad"
                validated={validated}
                onChangeText={(input) => tempListingLocationD({ phone: input })}
              />
            </View>
            <Text
              style={{
                color: colors.secondary,
                fontWeight: 'bold',
                marginTop: 20,
                marginBottom: 5,
                fontSize: 17
              }}>
              Mark Location on Map
            </Text>
            <MapView
              onPress={(event) => {
                tempListingLocationD({
                  marker: {
                    type: 'Point',
                    coordinates: [
                      event.nativeEvent.coordinate.longitude,
                      event.nativeEvent.coordinate.latitude
                    ]
                  }
                });
              }}
              style={{ flex: 1, height: 400, marginBottom: 50 }}
              region={{
                latitude: locationDetails.marker.coordinates[1],
                longitude: locationDetails.marker.coordinates[0],
                latitudeDelta: 0.05,
                longitudeDelta: 0.05
              }}>
              <Marker
                coordinate={{
                  longitude: locationDetails.marker.coordinates[0],
                  latitude: locationDetails.marker.coordinates[1]
                }}
              />
            </MapView>
          </>
        )}
        {activeIndex === 2 && (
          <>
            <Text style={styles.heading}>Choose a Property Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={locationDetails.propertyType}
                style={styles.picker}
                onValueChange={(itemValue) => tempListingLocationD({ propertyType: itemValue })}>
                <Picker.Item label="Select Option" value="" />
                {propertyTypeOptions.map((o, i) => (
                  <Picker.Item key={i} label={o.label} value={o.value} />
                ))}
              </Picker>
            </View>
          </>
        )}

        {activeIndex === 3 && (
          <>
            <Text style={styles.heading}>Add photos of this Listing</Text>
            <View style={styles.imageRow}>
              <Text style={styles.addPhotoBtnText}>Street View Image</Text>
              {locationDetails.streetViewImages.length > 0 ? (
                <View style={styles.imageList}>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => removeImage('streetViewImages')}>
                      <EntypoIcon name="circle-with-cross" style={styles.deleteIcon} />
                    </TouchableOpacity>
                  </View>

                  {locationDetails.streetViewImages.map((item, key) => (
                    <Image key={key} source={{ uri: item }} style={styles.image} />
                  ))}
                </View>
              ) : (
                <TouchableOpacity style={styles.addPhotoBtn} onPress={streetViewImagePickerHandler}>
                  <Text style={styles.addPhotoBtnText}>+ Add Photo</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.imageRow}>
              <Text style={styles.addPhotoBtnText}>Parking Entrance Image</Text>
              {locationDetails.parkingEntranceImages.length > 0 ? (
                <View style={styles.imageList}>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => removeImage('parkingEntranceImages')}>
                      <EntypoIcon name="circle-with-cross" style={styles.deleteIcon} />
                    </TouchableOpacity>
                  </View>

                  {locationDetails.parkingEntranceImages.map((item, key) => (
                    <Image key={key} source={{ uri: item }} style={styles.image} />
                  ))}
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addPhotoBtn}
                  onPress={parkingEntranceImagePickerHandler}>
                  <Text style={styles.addPhotoBtnText}>+ Add Photo</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.imageRow}>
              <Text style={styles.addPhotoBtnText}>Parking Space Image</Text>
              {locationDetails.parkingSpaceImages.length > 0 ? (
                <View style={styles.imageList}>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => removeImage('parkingSpaceImages')}>
                      <EntypoIcon name="circle-with-cross" style={styles.deleteIcon} />
                    </TouchableOpacity>
                  </View>

                  {locationDetails.parkingSpaceImages.map((item, key) => (
                    <Image key={key} source={{ uri: item }} style={styles.image} />
                  ))}
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addPhotoBtn}
                  onPress={parkingSpaceImagePickerHandler}>
                  <Text style={styles.addPhotoBtnText}>+ Add Photo</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}

        {activeIndex === 4 && (
          <>
            <Text style={styles.heading}>What features will you offer?</Text>
            <View style={styles.features}>
              {featureList.map((item) => (
                <RadioListItem
                  key={item}
                  label={item}
                  checked={
                    locationDetails.features ? locationDetails.features.includes(item) : false
                  }
                  onPress={() => {
                    toggleFeatures(item);
                  }}
                />
              ))}
            </View>
          </>
        )}
        {activeIndex === 5 && (
          <>
            <Text style={styles.heading}>Tell Guests about your space</Text>
            <Input
              placeholder="What makes your space great? Is it near notable landmarks or destinations?"
              placeholderTextColor="rgba(182,182,182,1)"
              // numberOfLines={20}
              inlineImagePadding={10}
              textAlignVertical="top"
              maxLength={300}
              multiline={true}
              selectTextOnFocus={true}
              style={styles.placeholder}
              value={spaceDetails.aboutSpace}
              validated={validated}
              onChangeText={(input) =>
                tempListingSpaceD({
                  aboutSpace: input
                })
              }
            />
            <Text style={styles.heading}>Tell Guests what to do when they arrive?</Text>
            <Input
              placeholder="Tell Guests what to do when they arrive? Provide special instructions (if any)"
              placeholderTextColor="rgba(182,182,182,1)"
              // numberOfLines={20}
              inlineImagePadding={10}
              maxLength={300}
              textAlignVertical="top"
              multiline={true}
              selectTextOnFocus={true}
              style={styles.placeholder}
              value={spaceDetails.accessInstructions}
              validated={validated}
              onChangeText={(input) =>
                tempListingSpaceD({
                  accessInstructions: input
                })
              }
            />
          </>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  deleteIcon: {
    fontSize: 40,
    color: 'red'
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 3,
    top: 15,
    left: 5
  },
  container: {
    // flex: 1,
    backgroundColor: colors.white,
    padding: 20,
    paddingBottom: 50,
    paddingTop: 0
  },
  heading: {
    color: 'rgba(11,64,148,1)',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 10
  },
  location: {
    color: 'rgba(11,64,148,1)',
    fontSize: 24,
    marginTop: 17,
    fontWeight: '500'

    // marginLeft: 23,
  },
  pickerContainer: {
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    marginBottom: 10
  },
  picker: {
    width: '100%'
    // marginVertical: 10,
    // fontSize: 18,
  },
  label: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: '700'
    // marginLeft: 24,
  },
  rect: {
    width: 330,
    height: 43,
    flexDirection: 'row',
    marginTop: 18
    // marginLeft: 23,
  },
  inactiveTab: {
    width: 94,
    height: 31,
    borderWidth: 2,
    borderColor: 'rgba(182,182,182,1)',
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  activeTab: {
    width: 110,
    height: 31,
    borderRadius: 21,
    backgroundColor: 'rgba(39,170,225,1)',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeBtn: {
    width: 120,
    height: 110,
    backgroundColor: 'rgba(39,170,225,1)',
    // marginLeft: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  activeText: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 13,
    textAlign: 'center'
  },
  activeIcon: {
    color: 'rgba(255,255,255,1)',
    fontSize: 58
    // height: 63,
    // width: 58,
  },
  inactiveBtn: {
    width: 120,
    height: 110,
    backgroundColor: 'rgba(39,170,225,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  inactiveText: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 11,
    textAlign: 'center'
  },
  inactiveIcon: {
    color: 'rgba(39,170,225,1)',
    fontSize: 60
    // height: 65,
    // width: 49,
  },
  rect4: {
    width: 85,
    height: 31,
    borderWidth: 2,
    borderColor: 'rgba(182,182,182,1)',
    borderRadius: 21,
    marginLeft: 5,
    marginTop: 8
  },
  rect2Row: {
    height: 31,
    flexDirection: 'row',
    flex: 1,
    marginRight: 32,
    marginTop: 5
  },
  required: {
    borderBottomColor: 'red'
  },
  requiredText: {
    color: 'red',
    fontSize: 12,
    marginTop: 10
  },
  textInput: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 41,
    width: '100%',
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#d6d6d6'
    // marginLeft: 24,
  },
  listingAddress: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 16,
    marginTop: 16
    // marginLeft: 24,
  },
  placeholder: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 45,
    width: '100%',
    // marginTop: 26,
    // borderBottomColor: '#d6d6d6',
    // borderBottomWidth: 1,
    fontSize: 18
    // marginLeft: 23,
  },
  modalView: {
    padding: 20,
    backgroundColor: '#fff'
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  phone: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
    // borderBottomColor: '#d6d6d6',
    // borderBottomWidth: 1,
  },
  mapView: {
    height: 400,
    width: '100%',
    marginTop: 21
  },
  propertyType: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 16,
    marginTop: 29
    // marginLeft: 21,
  },
  rect5: {
    width: 250,
    height: 235,
    marginTop: 19
    // marginLeft: 23,
  },
  rect6: {
    width: 119,
    height: 112,
    backgroundColor: 'rgba(39,170,225,0.2)'
  },
  icon: {
    top: 0,
    left: 0,
    position: 'absolute',
    color: 'rgba(39,170,225,1)',
    fontSize: 60,
    height: 65,
    width: 49
  },
  driveway: {
    top: 62,
    left: 0,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 11
  },
  iconStack: {
    width: 49,
    height: 75,
    marginTop: 13,
    marginLeft: 35
  },
  icon1: {
    top: 11,
    left: 28,
    position: 'absolute',
    color: 'rgba(39,170,225,1)',
    fontSize: 60,
    height: 65,
    width: 60
  },
  rect7: {
    top: 0,
    left: 0,
    width: 119,
    height: 112,
    position: 'absolute',
    backgroundColor: 'rgba(39,170,225,0.2)'
  },
  residentialGarage: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    textAlign: 'center',
    fontSize: 11,
    marginTop: 74,
    marginLeft: 21
  },
  icon1Stack: {
    width: 119,
    height: 112,
    marginLeft: 12
  },
  rect6Row: {
    height: 112,
    flexDirection: 'row'
  },
  icon2: {
    top: 13,
    left: 35,
    position: 'absolute',
    color: 'rgba(39,170,225,1)',
    fontSize: 60,
    height: 65,
    width: 53
  },
  rect8: {
    top: 0,
    left: 0,
    width: 119,
    height: 112,
    position: 'absolute',
    backgroundColor: 'rgba(39,170,225,0.2)'
  },
  openAirLot: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 11,
    marginTop: 74,
    marginLeft: 28
  },
  icon2Stack: {
    width: 119,
    height: 112
  },
  rect9: {
    width: 119,
    height: 112,
    backgroundColor: 'rgba(39,170,225,0.2)',
    marginLeft: 12
  },
  icon3: {
    top: 0,
    left: 23,
    position: 'absolute',
    color: 'rgba(39,170,225,1)',
    fontSize: 60,
    height: 65,
    width: 60
  },
  loremIpsum: {
    top: 62,
    left: 0,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 11,
    textAlign: 'center'
  },
  icon3Stack: {
    width: 112,
    height: 89,
    marginTop: 10,
    marginLeft: 4
  },
  icon2StackRow: {
    height: 112,
    flexDirection: 'row',
    marginTop: 11
  },
  loremIpsum2: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 16,
    marginTop: 31
    // marginLeft: 19,
  },
  addPhotoBtn: {
    borderColor: '#0b4094',
    borderWidth: 2,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 6,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10
  },
  addPhotoBtnText: {
    color: '#0b4094',
    fontWeight: '700',
    fontSize: 16
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 25,
    marginTop: 10
  },
  rect10: {
    top: 0,
    left: 0,
    width: 261,
    height: 73,
    position: 'absolute',
    flexDirection: 'row'
  },
  rect11: {
    width: 84,
    height: 84,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon4: {
    color: 'rgba(214,214,214,1)',
    fontSize: 30,
    height: 33,
    width: 30,
    marginTop: 9
    // marginLeft: 25,
  },
  streetView: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 10,
    marginTop: 3
    // marginLeft: 16,
  },
  rect12: {
    width: 84,
    height: 84,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    marginLeft: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon5: {
    color: 'rgba(214,214,214,1)',
    fontSize: 30,
    height: 33,
    width: 30,
    marginTop: 9
    // marginLeft: 27,
  },
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 1
    // marginLeft: 13,
  },
  rect11Row: {
    height: 73,
    flexDirection: 'row',
    flex: 1,
    marginRight: 83
  },
  rect13: {
    top: 0,
    left: 187,
    width: 84,
    height: 84,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon6: {
    color: 'rgba(214,214,214,1)',
    fontSize: 30,
    height: 33,
    width: 30,
    marginTop: 9
    // marginLeft: 27,
  },
  parkingSpaceStal: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 10,
    textAlign: 'center'
    // marginLeft: 8,
  },
  rect10Stack: {
    width: 271,
    height: 73,
    marginTop: 16
    // marginLeft: 19,
  },
  listingFeatures: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 16,
    marginVertical: 20
    // marginLeft: 20,
  },
  features: {},
  feature: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d6d6d6',
    paddingVertical: 5
  },
  featureText: {
    fontSize: 18
  },
  rect14: {
    width: 340,
    height: 180,
    marginTop: 12
    // marginLeft: 20,
  },
  rect15: {
    width: 110,
    height: 31,
    borderRadius: 20,
    backgroundColor: 'rgba(39,170,225,1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loremIpsum4: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 11
  },
  rect16: {
    width: 110,
    height: 31,
    borderRadius: 20,
    backgroundColor: 'rgba(39,170,225,1)',
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  carWash: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 11
  },
  rect17: {
    width: 110,
    height: 31,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  covered: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 11
  },
  rect15Row: {
    height: 32,
    flexDirection: 'row',
    marginTop: 11,
    marginLeft: 1,
    marginRight: 1
  },
  loremIpsum5: {
    top: 10,
    left: 24,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 11
  },
  rect20: {
    top: 0,
    left: 0,
    width: 110,
    height: 31,
    position: 'absolute',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  eyCharging: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 11
  },
  loremIpsum5Stack: {
    width: 110,
    height: 32
  },
  rect19: {
    width: 110,
    height: 31,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fenced: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 11
    // marginTop: 10,
    // marginLeft: 36,
  },
  rect18: {
    width: 110,
    height: 31,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mobilePass: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 11
    // marginTop: 10,
    // marginLeft: 26,
  },
  loremIpsum5StackRow: {
    height: 32,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 1,
    marginRight: 1
  },
  loremIpsum6: {
    top: 10,
    left: 24,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 11
  },
  rect23: {
    top: 0,
    left: 0,
    width: 110,
    height: 31,
    position: 'absolute',
    borderRadius: 20,
    backgroundColor: 'rgba(39,170,225,1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paved: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 11
  },
  loremIpsum6Stack: {
    width: 110,
    height: 32
  },
  rect22: {
    width: 110,
    height: 31,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  security: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 11
  },
  rect21: {
    width: 110,
    height: 31,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  staffOnsite: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 11
    // marginTop: 10,
    // marginLeft: 28,
  },
  loremIpsum6StackRow: {
    height: 32,
    flexDirection: 'row',
    marginTop: 12,
    marginLeft: 1,
    marginRight: 1
  },
  loremIpsum7: {
    top: 10,
    left: 24,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 11
  },
  rect26: {
    top: 0,
    left: 0,
    width: 110,
    height: 31,
    position: 'absolute',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tandem: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 11
  },
  loremIpsum7Stack: {
    width: 110,
    height: 32
  },
  rect25: {
    width: 110,
    height: 31,
    borderRadius: 20,
    backgroundColor: 'rgba(39,170,225,1)',
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  unpaved: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 11
  },
  rect24: {
    width: 110,
    height: 31,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  valet: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 11
  },
  loremIpsum7StackRow: {
    height: 32,
    flexDirection: 'row',
    marginTop: 11,
    marginLeft: 1,
    marginRight: 1
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  backBtnText: {
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  materialButtonPrimary: {
    width: 100,
    height: 36,
    marginVertical: 67,
    alignSelf: 'center'
  }
});

// AddListingLocation.propTypes = {
//   updateTempListing: PropTypes.func.isRequired,
//   tempListingLocationD: PropTypes.func.isRequired,
// };

const mapStateToProps = ({ tempListing }) => ({
  locationDetails: tempListing.locationDetails,
  validated: tempListing.validated,
  listingTypeOptions: tempListing.listingTypeOptions,
  propertyTypeOptions: tempListing.listingTypeOptions,
  spaceDetails: tempListing.spaceDetails
});

export default connect(mapStateToProps, {
  tempListingLocationD,
  updateTempListing,
  tempListingSpaceD
})(AddListingLocation);
