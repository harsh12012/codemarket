/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, InputGroup, FormControl, Spinner, Button, Card, Modal } from 'react-bootstrap';
import moment from 'moment';
import { XCircle } from 'react-feather';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Geocode from 'react-geocode';
import featureList from '@parkyourself-frontend/shared/config/features';
import countryCodes from '@parkyourself-frontend/shared/config/countries';
import TimeKeeper from 'react-timekeeper';
import { convertToUnit, convertToMilliseconds } from '@parkyourself-frontend/shared/utils/time';
import {
  updateTempListing,
  tempListingLocationD,
  tempListingSpaceD,
  tempListingSpaceA,
  tempListingPricingD
} from '@parkyourself-frontend/shared/redux/actions/tempListing';
import { useAddOneListing } from '@parkyourself-frontend/shared/hooks/listings';
import API from '@parkyourself-frontend/shared/config/apiKeys';
import AddListingHeader from './AddListingHeader';
import MapContainer from '../MapContainer';
import CheckBoxItem from '../../CheckBoxItem';
import RadioItem from '../../RadioItem';
import CustomScheduleModal from '../../CustomScheduleModal';
// import StartEndDateTimePicker from '../../StartEndDateTimePicker';
import UseFormOption from '../../formOptions/UseFormOption';
import StartEndTimePicker from './StartEndTimePicker';
import { minutesData, timingsData } from './timings';

Geocode.setApiKey(API.GOGGLE);

const AddListingForm = ({
  tempListing,
  updateTempListing,
  tempListingLocationD,
  tempListingSpaceD,
  tempListingSpaceA,
  tempListingPricingD
}) => {
  const { handleNext } = useAddOneListing();
  const [search, setSearch] = useState('');
  const [showCustomScheduleModal, setShowCustomScheduleModal] = useState(false);
  const [time, setTime] = useState({
    hour: 4,
    minute: 55
  });
  const [showTime, setShowTime] = useState(false);
  const [activeDay, setActiveDay] = useState({ day: 'monday', start: true });

  const onChangeSearch = (value) => {
    setSearch(value);
  };
  const {
    locationDetails,
    spaceDetails,
    spaceAvailable,
    pricingDetails,
    activeIndex,
    validated,
    listingTypeOptions,
    propertyTypeOptions
  } = tempListing;

  const {
    listingType,
    propertyType,
    propertyName,
    country,
    address,
    unitNum,
    city,
    state,
    postalCode,
    code,
    phone,
    marker,
    streetViewImages,
    parkingEntranceImages,
    parkingSpaceImages,
    features
  } = locationDetails;

  const {
    parkingSpaceType,
    qtyOfSpaces,
    heightRestriction,
    height1,
    height2,
    sameSizeSpaces,
    largestSize,
    motorcycle,
    compact,
    midsized,
    large,
    oversized,
    motorcycleSpaces,
    compactSpaces,
    midsizedSpaces,
    largeSpaces,
    oversizedSpaces,
    isLabelled,
    spaceLabels,
    aboutSpace,
    accessInstructions
  } = spaceDetails;

  const {
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    scheduleType,
    customTimeRange,
    hasNoticeTime,
    noticeTime,
    advanceBookingTime,
    minTime,
    maxTime,
    instantBooking
  } = spaceAvailable;

  const { pricingType, pricingRates } = pricingDetails;

  const setActiveIndex = (index) => updateTempListing({ activeIndex: index });

  const onMapClick = (mapProps, map, clickEvent) => {
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        // console.log(response);
        handleSelect(response.results[0].formatted_address);
      },
      (error) => {
        Alert('Something went wrong');
      }
    );
  };

  const handleSelect = async (value) => {
    setSearch(value);
    geocodeByAddress(value)
      .then((details) => {
        let tempLoc = {
          country: 'United States',
          address: details[0].formatted_address,
          marker: {
            type: 'Point',
            coordinates: [details[0].geometry.location.lng(), details[0].geometry.location.lat()]
          }
        };

        details[0].address_components.forEach((item) => {
          if (item.types.includes('country')) {
            tempLoc = {
              ...tempLoc,
              country: item.long_name
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

        tempListingLocationD({
          ...tempLoc,
          code: countryCodes.find((i) => i.country.toLowerCase() == tempLoc.country.toLowerCase())
            .code
        });
      })
      .catch((error) => console.error('Error', error));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
          (response) => {
            handleSelect(response.results[0].formatted_address);
          },
          (error) => {
            console.error(error);
          }
        );
      });
    } else {
      alert('Geolocation is not supported by your browser.');
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

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      if (e.target.name === 'streetView') {
        tempListingLocationD({
          streetViewImages: [URL.createObjectURL(e.target.files[0])]
        });
        updateTempListing({ tStreetViewImages: e.target.files });
      } else if (e.target.name === 'parkingEntrance') {
        tempListingLocationD({
          parkingEntranceImages: [URL.createObjectURL(e.target.files[0])]
        });
        updateTempListing({ tParkingEntranceImages: e.target.files });
      } else if (e.target.name === 'parkingSpace') {
        tempListingLocationD({
          parkingSpaceImages: [URL.createObjectURL(e.target.files[0])]
        });
        updateTempListing({ tParkingSpaceImages: e.target.files });
      }
    }
  };

  const toggleFeatures = (feature) => {
    if (features.includes(feature)) {
      tempListingLocationD({
        features: features.filter((item) => item != feature)
      });
    } else {
      tempListingLocationD({
        features: [...features, feature]
      });
    }
  };

  const spacesSum =
    parseInt(motorcycleSpaces) +
    parseInt(compactSpaces) +
    parseInt(midsizedSpaces) +
    parseInt(largeSpaces) +
    parseInt(oversizedSpaces);

  const setLabel = (label, idx) => {
    tempListingSpaceD({
      spaceLabels: spaceLabels.map((item, index) =>
        index == idx ? { ...item, label: label } : item
      )
    });
  };

  const resetVehicleSize = () => {
    tempListingSpaceD({
      motorcycle: false,
      compact: false,
      midsized: false,
      large: true,
      oversized: false,
      motorcycleSpaces: 0,
      compactSpaces: 0,
      midsizedSpaces: 0,
      largeSpaces: 0,
      oversizedSpaces: 0
    });
  };

  const showTimeModal = (day, start, hour, minute) => {
    setActiveDay({ day, start });
    setTime({
      hour,
      minute
    });
  };

  const saveTime = () => {
    if (activeDay.day === 'monday') {
      if (activeDay.start) {
        tempListingSpaceA({
          monday: { ...monday, startHour: time.hour, startMinute: time.minute }
        });
      } else {
        tempListingSpaceA({
          monday: { ...monday, endHour: time.hour, endMinute: time.minute }
        });
      }
    } else if (activeDay.day === 'tuesday') {
      if (activeDay.start) {
        tempListingSpaceA({
          tuesday: { ...tuesday, startHour: time.hour, startMinute: time.minute }
        });
      } else {
        tempListingSpaceA({
          tuesday: { ...tuesday, endHour: time.hour, endMinute: time.minute }
        });
      }
    } else if (activeDay.day === 'wednesday') {
      if (activeDay.start) {
        tempListingSpaceA({
          wednesday: { ...wednesday, startHour: time.hour, startMinute: time.minute }
        });
      } else {
        tempListingSpaceA({
          wednesday: { ...wednesday, endHour: time.hour, endMinute: time.minute }
        });
      }
    } else if (activeDay.day === 'thursday') {
      if (activeDay.start) {
        tempListingSpaceA({
          thursday: { ...thursday, startHour: time.hour, startMinute: time.minute }
        });
      } else {
        tempListingSpaceA({
          thursday: { ...thursday, endHour: time.hour, endMinute: time.minute }
        });
      }
    } else if (activeDay.day === 'friday') {
      if (activeDay.start) {
        tempListingSpaceA({
          friday: { ...friday, startHour: time.hour, startMinute: time.minute }
        });
      } else {
        tempListingSpaceA({
          friday: { ...friday, endHour: time.hour, endMinute: time.minute }
        });
      }
    } else if (activeDay.day === 'saturday') {
      if (activeDay.start) {
        tempListingSpaceA({
          saturday: { ...saturday, startHour: time.hour, startMinute: time.minute }
        });
      } else {
        tempListingSpaceA({
          saturday: { ...saturday, endHour: time.hour, endMinute: time.minute }
        });
      }
    } else if (activeDay.day === 'sunday') {
      if (activeDay.start) {
        tempListingSpaceA({
          sunday: { ...sunday, startHour: time.hour, startMinute: time.minute }
        });
      } else {
        tempListingSpaceA({
          sunday: { ...sunday, endHour: time.hour, endMinute: time.minute }
        });
      }
    }
    // hide modal
    setShowTime(false);
  };

  const handleSaveTime = (day, start, hour, minute) => {
    if (day === 'monday') {
      if (start) {
        tempListingSpaceA({
          monday: { ...monday, startHour: hour, startMinute: minute }
        });
      } else {
        tempListingSpaceA({
          monday: { ...monday, endHour: hour, endMinute: minute }
        });
      }
    } else if (day === 'tuesday') {
      if (start) {
        tempListingSpaceA({
          tuesday: { ...tuesday, startHour: hour, startMinute: minute }
        });
      } else {
        tempListingSpaceA({
          tuesday: { ...tuesday, endHour: hour, endMinute: minute }
        });
      }
    } else if (day === 'wednesday') {
      if (start) {
        tempListingSpaceA({
          wednesday: { ...wednesday, startHour: hour, startMinute: minute }
        });
      } else {
        tempListingSpaceA({
          wednesday: { ...wednesday, endHour: hour, endMinute: minute }
        });
      }
    } else if (day === 'thursday') {
      if (start) {
        tempListingSpaceA({
          thursday: { ...thursday, startHour: hour, startMinute: minute }
        });
      } else {
        tempListingSpaceA({
          thursday: { ...thursday, endHour: hour, endMinute: minute }
        });
      }
    } else if (day === 'friday') {
      if (start) {
        tempListingSpaceA({
          friday: { ...friday, startHour: hour, startMinute: minute }
        });
      } else {
        tempListingSpaceA({
          friday: { ...friday, endHour: hour, endMinute: minute }
        });
      }
    } else if (day === 'saturday') {
      if (start) {
        tempListingSpaceA({
          saturday: { ...saturday, startHour: hour, startMinute: minute }
        });
      } else {
        tempListingSpaceA({
          saturday: { ...saturday, endHour: hour, endMinute: minute }
        });
      }
    } else if (day === 'sunday') {
      if (start) {
        tempListingSpaceA({
          sunday: { ...sunday, startHour: hour, startMinute: minute }
        });
      } else {
        tempListingSpaceA({
          sunday: { ...sunday, endHour: hour, endMinute: minute }
        });
      }
    }
    // hide modal
    setShowTime(false);
  };

  const nonEmpty = (value) => {
    let tempValue = 0;
    if (value) {
      tempValue = value;
    }
    return tempValue;
  };

  return (
    <div>
      <AddListingHeader
        activeIndex={activeIndex}
        // onNextButtonPress={handleNext}
        onNextButtonPress={() => setActiveIndex(activeIndex + 1)}
        onBackButtonPress={() => setActiveIndex(activeIndex - 1)}
      />
      {activeIndex === 1 && (
        <>
          <div className="question-item">
            <h1 className="heading">Choose a Listing Type {listingType}</h1>
            <Form validated={validated}>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Control
                  value={listingType}
                  onChange={(e) => tempListingLocationD({ listingType: e.target.value })}
                  as="select"
                  custom
                  required>
                  <option value="">Select Option</option>
                  {listingTypeOptions.map((o, i) => (
                    <option key={i} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Property Name*</Form.Label>
                <Form.Control
                  name="propertyName"
                  value={propertyName}
                  onChange={(e) => tempListingLocationD({ propertyName: e.target.value })}
                  type="text"
                  placeholder="Enter property name"
                  required
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </Form.Group>
            </Form>
          </div>
          <div className="question-item">
            <div className="heading-bar">
              <h1 className="heading">Tell us your Listing Address</h1>
              <Button variant="outline-primary" onClick={getCurrentLocation}>
                Use Current Location
              </Button>
            </div>
            <PlacesAutocomplete value={search} onChange={onChangeSearch} onSelect={handleSelect}>
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: 'Search your location',
                      className: 'location-search-input'
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? {
                            backgroundColor: '#27aae1',
                            cursor: 'pointer',
                            padding: '10px',
                            border: '1px solid #999'
                          }
                        : {
                            backgroundColor: '#ffffff',
                            cursor: 'pointer',
                            padding: '10px',
                            border: '1px solid #999'
                          };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style
                          })}>
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>

            <Form validated={validated}>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Control
                  as="select"
                  custom
                  name="country"
                  value={country}
                  onChange={(e) => tempListingLocationD({ country: e.target.value })}>
                  {countryCodes.map((item) => (
                    <option key={item.country}>{item.country}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => tempListingLocationD({ address: e.target.value })}
                  required
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="unitNum"
                  placeholder="Unit #"
                  value={unitNum}
                  onChange={(e) => tempListingLocationD({ unitNum: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="city"
                  placeholder="City/Town"
                  value={city}
                  onChange={(e) => tempListingLocationD({ city: e.target.value })}
                  required
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="State/Province"
                  value={state}
                  name="state"
                  onChange={(e) => tempListingLocationD({ state: e.target.value })}
                  required
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(e) => tempListingLocationD({ postalCode: e.target.value })}
                  required
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </Form.Group>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Control
                      as="select"
                      name="code"
                      custom
                      value={code}
                      onChange={(e) => tempListingLocationD({ code: e.target.value })}>
                      {countryCodes.map((item) => (
                        <option key={item.country}>{item.code}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  name="phone"
                  type="number"
                  min="0"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => tempListingLocationD({ phone: e.target.value })}
                  required
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </InputGroup>
            </Form>
            <div className="question-item">
              <p className="lead" style={{ margin: '10px auto', textAlign: 'center' }}>
                OR
              </p>
              <h1 className="heading">Mark your location on the Map</h1>
              <MapContainer onMapClick={onMapClick} coordinates={marker.coordinates} />
            </div>
          </div>
        </>
      )}
      {activeIndex === 2 && (
        <div className="question-item">
          <h1 className="heading">Choose a Property Type</h1>
          <Form validated={validated}>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Control
                required
                value={propertyType}
                onChange={(e) => tempListingLocationD({ propertyType: e.target.value })}
                as="select"
                custom>
                <option value="">Select Option</option>
                {propertyTypeOptions.map((o, i) => (
                  <option key={i} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </div>
      )}
      {activeIndex === 3 && (
        <div className="question-item">
          <h1 className="heading">Add Photos of your listing</h1>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Street View Image</Form.Label>
              {validated && streetViewImages.length === 0 && (
                <p className="invalid-feedback-text">Please select atleast one photo</p>
              )}
              <Form.File
                required
                name="streetView"
                onChange={handleFileChange}
                id="custom-file"
                label="Add Street View Image"
                custom
                accept="image/png, image/jpeg, image/jpg, image/gif"
                style={{ marginBottom: '20px' }}
              />
            </Form.Group>
          </Form>
          <div className="images-wrapper">
            {streetViewImages &&
              streetViewImages.map((url, i) => {
                return (
                  <div className="d-inline-block w--50 p-1" key={i}>
                    <button
                      // disabled={disabled}
                      type="button"
                      onClick={() => removeImage('streetViewImages')}
                      className="btn btn-primary btn-sm p-0 rounded-pill shadow position-absolute right-0"
                      style={{
                        zIndex: '3',
                        borderRadius: '50%',
                        backgroundColor: 'red',
                        border: 'none'
                      }}>
                      <XCircle size={20} />
                    </button>
                    <img style={{ width: '100%' }} alt="streetViewImage" src={url} />
                  </div>
                );
              })}
          </div>

          <Form>
            <Form.Label>Parking Entrance Image</Form.Label>
            {validated && parkingEntranceImages.length === 0 && (
              <p className="invalid-feedback-text">Please select atleast one photo</p>
            )}
            <Form.File
              name="parkingEntrance"
              onChange={handleFileChange}
              id="custom-file"
              label="Add Parking Entrance Image"
              custom
              accept="image/png, image/jpeg, image/jpg, image/gif"
              style={{ marginBottom: '20px' }}
            />
          </Form>

          <div className="images-wrapper">
            {parkingEntranceImages &&
              parkingEntranceImages.map((url, i) => {
                return (
                  <div className="d-inline-block w--50 p-1" key={i}>
                    <button
                      // disabled={disabled}
                      type="button"
                      onClick={() => removeImage('parkingEntranceImages')}
                      className="btn btn-primary btn-sm p-0 rounded-pill shadow position-absolute right-0"
                      style={{
                        zIndex: '3',
                        borderRadius: '50%',
                        backgroundColor: 'red',
                        border: 'none'
                      }}>
                      <XCircle size={20} />
                    </button>
                    <img style={{ width: '100%' }} src={url} />
                  </div>
                );
              })}
          </div>

          <Form>
            <Form.Label>Parking Space Image</Form.Label>
            {validated && parkingSpaceImages.length === 0 && (
              <p className="invalid-feedback-text">Please select atleast one photo</p>
            )}
            <Form.File
              name="parkingSpace"
              onChange={handleFileChange}
              id="custom-file"
              label="Add Parking Space Images"
              custom
              accept="image/png, image/jpeg, image/jpg, image/gif"
              style={{ marginBottom: '20px' }}
            />
          </Form>

          <div className="images-wrapper">
            {parkingSpaceImages &&
              parkingSpaceImages.map((url, i) => {
                return (
                  <div className="d-inline-block w--50 p-1" key={i}>
                    <button
                      // disabled={disabled}
                      type="button"
                      onClick={() => removeImage('parkingSpaceImages')}
                      className="btn btn-primary btn-sm p-0 rounded-pill shadow position-absolute right-0"
                      style={{
                        zIndex: '3',
                        borderRadius: '50%',
                        backgroundColor: 'red',
                        border: 'none'
                      }}>
                      <XCircle size={20} />
                    </button>
                    <img style={{ width: '100%' }} src={url} />
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {activeIndex === 4 && (
        <div className="question-item">
          <h1 className="heading">What features will you offer?</h1>
          {featureList.map((item) => (
            <CheckBoxItem
              key={item}
              label={item}
              onClick={() => toggleFeatures(item)}
              checked={features ? features.includes(item) : false}
            />
          ))}
        </div>
      )}
      {activeIndex === 5 && (
        <>
          <div className="question-item">
            <h1 className="heading">Tell guests about your space</h1>
            <Form validated={validated}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="aboutSpace"
                  required
                  placeholder="What makes your space great? Is it nearby notable landmarks or destinations"
                  value={aboutSpace}
                  onChange={(e) => tempListingSpaceD({ aboutSpace: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </Form.Group>
            </Form>
          </div>
          {/* )}
      {activeIndex === 9 && ( */}
          <div className="question-item">
            <h1 className="heading">Tell guests what to do when they arrive</h1>
            <Form validated={validated}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="accessInstructions"
                  required
                  placeholder="Tell guests what to do when they arrive. Provide special instructions (if any)"
                  value={accessInstructions}
                  onChange={(e) => tempListingSpaceD({ accessInstructions: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </Form.Group>
            </Form>
          </div>
        </>
      )}
      {activeIndex === 6 && (
        <div className="question-item">
          <h1 className="heading">Choose a Parking Space Type</h1>
          <Form validated={validated}>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Control
                as="select"
                custom
                name="parkingSpaceType"
                value={parkingSpaceType}
                onChange={(e) => tempListingSpaceD({ parkingSpaceType: e.target.value })}>
                <option value="">Select Option</option>
                <option value="Tandem">Tandem</option>
                <option value="Side by Side">Side By Side</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Total Quantity of Parking Spaces</Form.Label>
              <Form.Control
                type="number"
                placeholder="Total Quantity of Parking Spaces"
                required
                name="qtyOfSpaces"
                min="1"
                required
                onChange={(e) => {
                  tempListingSpaceD({
                    qtyOfSpaces: e.target.value == '' ? 0 : e.target.value
                  });
                }}
                value={qtyOfSpaces == 0 ? '' : qtyOfSpaces}
              />
              <Form.Control.Feedback type="invalid">
                Minimum 1 parking space is required.
              </Form.Control.Feedback>
            </Form.Group>
            {qtyOfSpaces && qtyOfSpaces > 1 && (
              <>
                <h1 className="heading">Are all parking spaces the same size?</h1>
                {validated && sameSizeSpaces == null && (
                  <p className="invalid-feedback-text">Please select Yes or No</p>
                )}
                <RadioItem
                  label="Yes"
                  name="sameSizeSpaces"
                  onClick={(event) => {
                    tempListingSpaceD({ sameSizeSpaces: true });
                    resetVehicleSize();
                  }}
                  value={true}
                  checked={sameSizeSpaces}
                />
                <RadioItem
                  label="No, some are different"
                  name="sameSizeSpaces"
                  value={false}
                  onClick={(event) => {
                    tempListingSpaceD({ sameSizeSpaces: false });
                    resetVehicleSize();
                  }}
                  checked={!sameSizeSpaces}
                />
              </>
            )}
          </Form>
        </div>
      )}
      {activeIndex === 7 && (
        <div className="question-item">
          <h1 className="heading">Select your Vehicle Size?</h1>
          <p className="description">Select the largest vehicle size for your parking spaces</p>
          {!sameSizeSpaces && (
            <>
              <p className=" ">
                Sum of Entered Spaces / Total Qty. of Spaces : {spacesSum} / {qtyOfSpaces}
              </p>
              {validated && parseInt(spacesSum) != parseInt(qtyOfSpaces) && (
                <p className="invalid-feedback-text">
                  Sum of all spaces must equal the total quantity of spaces
                </p>
              )}
            </>
          )}
          <RadioItem
            label="Motorcycle"
            onClick={(event) => {
              if (sameSizeSpaces) {
                tempListingSpaceD({
                  motorcycle: true,
                  compact: false,
                  midsized: false,
                  large: false,
                  oversized: false,
                  largestSize: 'Motorcycle'
                });
              } else {
                tempListingSpaceD({
                  motorcycle: !motorcycle,
                  motorcycleSpaces: motorcycle ? 0 : motorcycleSpaces
                });
              }
            }}
            value="Motorcycle"
            checked={motorcycle}
          />
          {!sameSizeSpaces && motorcycle && (
            <Form validated={validated}>
              <Form.Group controlId="formBasicEmail">
                <br />
                <Form.Label>Motorcycle Spaces</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  placeholder="Number of Spaces"
                  name="motorcycleSpaces"
                  required
                  onChange={(e) => {
                    tempListingSpaceD({
                      motorcycleSpaces: e.target.value === '' ? 0 : e.target.value
                    });
                  }}
                  value={motorcycleSpaces == 0 ? '' : motorcycleSpaces}
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </Form.Group>
            </Form>
          )}
          <RadioItem
            label="Compact"
            onClick={(event) => {
              if (sameSizeSpaces) {
                tempListingSpaceD({
                  motorcycle: false,
                  compact: true,
                  midsized: false,
                  large: false,
                  oversized: false,
                  largestSize: 'Compact'
                });
              } else {
                tempListingSpaceD({
                  compact: !compact,
                  compactSpaces: compact ? 0 : compactSpaces
                });
              }
            }}
            value="Motorcycle"
            checked={compact}
          />
          {!sameSizeSpaces && compact && (
            <Form validated={validated}>
              <Form.Group controlId="formBasicEmail">
                <br />
                <Form.Label>compact Spaces</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Number of Spaces"
                  name="compactSpaces"
                  required
                  onChange={(e) => {
                    tempListingSpaceD({
                      compactSpaces: e.target.value == '' ? 0 : e.target.value
                    });
                  }}
                  value={compactSpaces == 0 ? '' : compactSpaces}
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </Form.Group>
            </Form>
          )}
          <RadioItem
            label="Midsized"
            onClick={(event) => {
              if (sameSizeSpaces) {
                tempListingSpaceD({
                  motorcycle: false,
                  compact: false,
                  midsized: true,
                  large: false,
                  oversized: false,
                  largestSize: 'Midsized'
                });
              } else {
                tempListingSpaceD({
                  midsized: !midsized,
                  midsizedSpaces: midsized ? 0 : midsizedSpaces
                });
              }
            }}
            value="Motorcycle"
            checked={midsized}
          />
          {!sameSizeSpaces && midsized && (
            <Form validated={validated}>
              <Form.Group controlId="formBasicEmail">
                <br />
                <Form.Label>midsized Spaces</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Number of Spaces"
                  name="midsizedSpaces"
                  required
                  onChange={(e) => {
                    tempListingSpaceD({
                      midsizedSpaces: e.target.value == '' ? 0 : e.target.value
                    });
                  }}
                  value={midsizedSpaces == 0 ? '' : midsizedSpaces}
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </Form.Group>
            </Form>
          )}
          <RadioItem
            label="Large"
            onClick={(event) => {
              if (sameSizeSpaces) {
                tempListingSpaceD({
                  motorcycle: false,
                  compact: false,
                  midsized: false,
                  large: true,
                  oversized: false,
                  largestSize: 'Large'
                });
              } else {
                tempListingSpaceD({
                  large: !large,
                  largeSpaces: large ? 0 : largeSpaces
                });
              }
            }}
            value="large"
            checked={large}
          />
          {!sameSizeSpaces && large && (
            <Form validated={validated}>
              <Form.Group controlId="formBasicEmail">
                <br />
                <Form.Label>large Spaces</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Number of Spaces"
                  name="largeSpaces"
                  required
                  onChange={(e) => {
                    tempListingSpaceD({
                      largeSpaces: e.target.value === '' ? 0 : e.target.value
                    });
                  }}
                  value={largeSpaces === 0 ? '' : largeSpaces}
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </Form.Group>
            </Form>
          )}
          <RadioItem
            label="oversized"
            onClick={(event) => {
              if (sameSizeSpaces) {
                tempListingSpaceD({
                  motorcycle: false,
                  compact: false,
                  midsized: false,
                  large: false,
                  oversized: true,
                  largestSize: 'Oversized'
                });
              } else {
                tempListingSpaceD({
                  oversized: !oversized,
                  oversizedSpaces: oversized ? 0 : oversizedSpaces
                });
              }
            }}
            value="oversized"
            checked={oversized}
          />
          {!sameSizeSpaces && oversized && (
            <Form validated={validated}>
              <Form.Group controlId="formBasicEmail">
                <br />
                <Form.Label>oversized Spaces</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Number of Spaces"
                  name="oversizedSpaces"
                  required
                  onChange={(e) => {
                    tempListingSpaceD({
                      oversizedSpaces: e.target.value === '' ? 0 : e.target.value
                    });
                  }}
                  value={oversizedSpaces === 0 ? '' : oversizedSpaces}
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </Form.Group>
            </Form>
          )}
          <br />
          {validated && !(motorcycle || compact || midsized || large || oversized) && (
            <p className="invalid-feedback-text">Please select at least one vehicle size</p>
          )}
          <p className="modal-link">How do I determine my space size?</p>
        </div>
      )}
      {activeIndex === 8 && (
        <div className="question-item">
          <h1 className="heading">Are the spaces numbered or labelled?</h1>
          <RadioItem
            label="Yes"
            name="isLabelled"
            onClick={(event) => {
              let tSpaceLabels = [];
              for (let i = 0; i < qtyOfSpaces; i++) {
                tSpaceLabels.push({
                  label: '',
                  largestSize: largestSize
                });
              }
              tempListingSpaceD({
                isLabelled: true,
                spaceLabels: tSpaceLabels
              });
            }}
            value={true}
            checked={isLabelled}
          />
          <RadioItem
            label="No"
            name="isLabelled"
            onClick={(event) => tempListingSpaceD({ isLabelled: false })}
            value={false}
            checked={!isLabelled}
          />
          <br />
          {isLabelled && (
            <Form validated={validated}>
              <h4>Enter Space Labels</h4>
              <br />
              {spaceLabels.map((item, index) => (
                <InputGroup className="mb-3">
                  <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder="Space Label/Number"
                    required
                    value={item.label}
                    onChange={({ target: { value } }) => setLabel(value, index)}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2">{item.largestSize}</InputGroup.Text>
                  </InputGroup.Append>
                  <Form.Control.Feedback type="invalid">
                    This field is required
                  </Form.Control.Feedback>
                </InputGroup>
              ))}
            </Form>
          )}
        </div>
      )}
      {activeIndex === 9 && (
        <div className="question-item">
          <h1 className="heading">What are the timings?</h1>
          {validated && !scheduleType && (
            <p className="invalid-feedback-text">Please select a schedule type</p>
          )}
          <RadioItem
            label="Set to 24 hours a day"
            name="scheduleType"
            onClick={() => tempListingSpaceA({ scheduleType: '24hours' })}
            checked={scheduleType === '24hours'}
          />

          <RadioItem
            label="Set to a Fixed schedule"
            name="scheduleType"
            onClick={() => tempListingSpaceA({ scheduleType: 'fixed' })}
            checked={scheduleType == 'fixed'}
          />
          <RadioItem
            label="Set a Custom Schedule"
            name="scheduleType"
            onClick={() => tempListingSpaceA({ scheduleType: 'custom' })}
            checked={scheduleType == 'custom'}
          />
          {scheduleType === 'fixed' && (
            <div className="question-item">
              <h1 className="heading">At what days can drivers park at your listing?</h1>
              <Modal show={showTime} onHide={() => setShowTime(false)} size="md" centered>
                <Modal.Body className="p-5">
                  {/* <TimeKeeper
                    time={time}
                    onChange={({ hour, minute }) => {
                      console.log(hour,minute)
                      setTime({ hour, minute })
                    }}
                    onDoneClick={() => saveTime()}
                    switchToMinuteOnHourSelect
                  /> */}
                  <div className="d-flex justify-content-center align-items-center pt-5"></div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 10 }}>
                    <Button variant="primary" onClick={() => saveTime()}>
                      Save Time
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>
              {validated &&
                scheduleType === 'fixed' &&
                !(
                  monday.isActive ||
                  tuesday.isActive ||
                  wednesday.isActive ||
                  thursday.isActive ||
                  friday.isActive ||
                  saturday.isActive ||
                  sunday.isActive
                ) && <p className="invalid-feedback-text">Please select at least one day</p>}

              <CheckBoxItem
                label="Monday"
                name="monday"
                onClick={() =>
                  tempListingSpaceA({
                    monday: { ...monday, isActive: !monday.isActive }
                  })
                }
                checked={monday.isActive}
              />
              {monday.isActive && (
                <StartEndTimePicker
                  day="monday"
                  startHour={monday.startHour}
                  startMinute={monday.startMinute}
                  endHour={monday.endHour}
                  endMinute={monday.endMinute}
                  showTimeModal={showTimeModal}
                  onStartChange={(start) => {
                    handleSaveTime('monday', true, start.getHours(), start.getMinutes());
                  }}
                  onEndChange={(end) => {
                    handleSaveTime('monday', false, end.getHours(), end.getMinutes());
                  }}
                />
              )}
              <CheckBoxItem
                label="Tuesday"
                name="tuesday"
                onClick={() =>
                  tempListingSpaceA({
                    tuesday: { ...tuesday, isActive: !tuesday.isActive }
                  })
                }
                checked={tuesday.isActive}
              />
              {tuesday.isActive && (
                <StartEndTimePicker
                  day="tuesday"
                  startHour={tuesday.startHour}
                  startMinute={tuesday.startMinute}
                  endHour={tuesday.endHour}
                  endMinute={tuesday.endMinute}
                  showTimeModal={showTimeModal}
                  onStartChange={(start) => {
                    handleSaveTime('tuesday', true, start.getHours(), start.getMinutes());
                  }}
                  onEndChange={(end) => {
                    handleSaveTime('tuesday', false, end.getHours(), end.getMinutes());
                  }}
                />
              )}
              <CheckBoxItem
                label="Wednesday"
                name="wednesday"
                onClick={(event) =>
                  tempListingSpaceA({
                    wednesday: { ...wednesday, isActive: !wednesday.isActive }
                  })
                }
                checked={wednesday.isActive}
              />
              {wednesday.isActive && (
                <StartEndTimePicker
                  day="wednesday"
                  startHour={wednesday.startHour}
                  startMinute={wednesday.startMinute}
                  endHour={wednesday.endHour}
                  endMinute={wednesday.endMinute}
                  showTimeModal={showTimeModal}
                  onStartChange={(start) => {
                    handleSaveTime('wednesday', true, start.getHours(), start.getMinutes());
                  }}
                  onEndChange={(end) => {
                    handleSaveTime('wednesday', false, end.getHours(), end.getMinutes());
                  }}
                />
              )}
              <CheckBoxItem
                label="Thursday"
                name="thursday"
                onClick={(event) =>
                  tempListingSpaceA({
                    thursday: { ...thursday, isActive: !thursday.isActive }
                  })
                }
                checked={thursday.isActive}
              />

              {thursday.isActive && (
                <StartEndTimePicker
                  day="thursday"
                  startHour={thursday.startHour}
                  startMinute={thursday.startMinute}
                  endHour={thursday.endHour}
                  endMinute={thursday.endMinute}
                  showTimeModal={showTimeModal}
                  onStartChange={(start) => {
                    handleSaveTime('thursday', true, start.getHours(), start.getMinutes());
                  }}
                  onEndChange={(end) => {
                    handleSaveTime('thursday', false, end.getHours(), end.getMinutes());
                  }}
                />
              )}
              <CheckBoxItem
                label="Friday"
                name="friday"
                onClick={(event) =>
                  tempListingSpaceA({
                    friday: { ...friday, isActive: !friday.isActive }
                  })
                }
                checked={friday.isActive}
              />
              {friday.isActive && (
                <StartEndTimePicker
                  day="friday"
                  startHour={friday.startHour}
                  startMinute={friday.startMinute}
                  endHour={friday.endHour}
                  endMinute={friday.endMinute}
                  showTimeModal={showTimeModal}
                  onStartChange={(start) => {
                    handleSaveTime('friday', true, start.getHours(), start.getMinutes());
                  }}
                  onEndChange={(end) => {
                    handleSaveTime('friday', false, end.getHours(), end.getMinutes());
                  }}
                />
              )}
              <CheckBoxItem
                label="Saturday"
                name="saturday"
                onClick={(event) =>
                  tempListingSpaceA({
                    saturday: { ...saturday, isActive: !saturday.isActive }
                  })
                }
                checked={saturday.isActive}
              />

              {saturday.isActive && (
                <StartEndTimePicker
                  day="saturday"
                  startHour={saturday.startHour}
                  startMinute={saturday.startMinute}
                  endHour={saturday.endHour}
                  endMinute={saturday.endMinute}
                  showTimeModal={showTimeModal}
                  onStartChange={(start) => {
                    handleSaveTime('saturday', true, start.getHours(), start.getMinutes());
                  }}
                  onEndChange={(end) => {
                    handleSaveTime('saturday', false, end.getHours(), end.getMinutes());
                  }}
                />
              )}
              <CheckBoxItem
                label="Sunday"
                name="sunday"
                onClick={(event) =>
                  tempListingSpaceA({
                    sunday: { ...sunday, isActive: !sunday.isActive }
                  })
                }
                checked={sunday.isActive}
              />
              {sunday.isActive && (
                <StartEndTimePicker
                  day="sunday"
                  startHour={sunday.startHour}
                  startMinute={sunday.startMinute}
                  endHour={sunday.endHour}
                  endMinute={sunday.endMinute}
                  showTimeModal={showTimeModal}
                  onStartChange={(start) => {
                    handleSaveTime('sunday', true, start.getHours(), start.getMinutes());
                  }}
                  onEndChange={(end) => {
                    handleSaveTime('sunday', false, end.getHours(), end.getMinutes());
                  }}
                />
              )}
            </div>
          )}

          <br />
          {scheduleType === 'custom' && (
            <>
              <h1 className="heading">Select a time range</h1>
              {validated && scheduleType === 'custom' && customTimeRange.length === 0 && (
                <p className="invalid-feedback-text">Please add atleast one Time Range</p>
              )}
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setShowCustomScheduleModal(true);
                }}>
                Add a Time Range
              </Button>
              <br />
              <CustomScheduleModal
                show={showCustomScheduleModal}
                handleClose={() => {
                  setShowCustomScheduleModal(false);
                }}
                handleSave={(dates) => {
                  tempListingSpaceA({
                    customTimeRange: [...customTimeRange, ...dates]
                  });
                }}
              />
              <br />
              {customTimeRange.map((item, idx) => (
                <Card>
                  <Card.Body
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                    {`${moment(item.startDate).format('lll')} to ${moment(item.endDate).format(
                      'lll'
                    )}`}{' '}
                    <Button
                      variant="danger"
                      onClick={() => {
                        tempListingSpaceA({
                          customTimeRange: customTimeRange.filter((item, index) => index !== idx)
                        });
                      }}>
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </>
          )}
        </div>
      )}
      {activeIndex === 10 && (
        <div className="question-item">
          <h1 className="heading">How much notice time do you need before guests arrives?</h1>
          <CheckBoxItem
            label="Set it to None"
            name="hasNoticeTime"
            onClick={(event) =>
              tempListingSpaceA({
                hasNoticeTime: !hasNoticeTime
              })
            }
            checked={!hasNoticeTime}
          />
          <br />
          {hasNoticeTime && (
            <Form validated={validated}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Notice Time"
                  type="number"
                  min="0"
                  name="noticeTime"
                  required
                  value={convertToUnit(noticeTime.value, noticeTime.unit)}
                  onChange={(event) => {
                    tempListingSpaceA({
                      noticeTime: {
                        ...noticeTime,
                        value: convertToMilliseconds(event.target.value, noticeTime.unit)
                      }
                    });
                  }}
                />
                <InputGroup.Append>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Control
                      as="select"
                      custom
                      value={noticeTime.unit}
                      onChange={(event) => {
                        tempListingSpaceA({
                          noticeTime: {
                            // ...noticeTime,
                            value: 0,
                            unit: event.target.value
                          }
                        });
                      }}>
                      <option>Minutes</option>
                      <option>Hours</option>
                      <option>Days</option>
                    </Form.Control>
                  </Form.Group>
                </InputGroup.Append>
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </InputGroup>
            </Form>
          )}

          <p className="description">
            Tip : At least 2 days' notice can help you plan for a guest's arrival, but you might
            miss out last minute trips.
          </p>
        </div>
      )}
      {activeIndex === 11 && (
        <div className="question-item">
          <h1 className="heading">How far in advance can guests book?</h1>
          <Form validated={validated}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Advance Booking Time"
                type="number"
                min="0"
                required
                name="advanceBookingTime"
                value={convertToUnit(advanceBookingTime.value, advanceBookingTime.unit)}
                onChange={(event) => {
                  tempListingSpaceA({
                    advanceBookingTime: {
                      ...advanceBookingTime,
                      value: convertToMilliseconds(event.target.value, advanceBookingTime.unit)
                    }
                  });
                }}
              />
              <InputGroup.Append>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Control
                    as="select"
                    custom
                    value={advanceBookingTime.unit}
                    onChange={(event) => {
                      tempListingSpaceA({
                        advanceBookingTime: {
                          // ...advanceBookingTime,
                          value: 0,
                          unit: event.target.value
                        }
                      });
                    }}>
                    <option>Minutes</option>
                    <option>Hours</option>
                    <option>Days</option>
                  </Form.Control>
                </Form.Group>
              </InputGroup.Append>{' '}
              <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
            </InputGroup>
          </Form>

          <p className="description">
            Tip : Avoid cancelling or declining guests by only unblocking dates you can host.
          </p>
        </div>
      )}
      {activeIndex === 12 && (
        <div className="question-item">
          <h1 className="heading">How long can guests stay?</h1>
          <Form validated={validated}>
            <Form.Group>
              <Form.Label>Minimum Time</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Minimum Time"
                  type="number"
                  min="0"
                  name="minTime"
                  value={convertToUnit(minTime.value, minTime.unit)}
                  required
                  onChange={(event) =>
                    tempListingSpaceA({
                      minTime: {
                        ...minTime,
                        value: convertToMilliseconds(event.target.value, minTime.unit)
                      }
                    })
                  }
                />
                <InputGroup.Append>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Control
                      as="select"
                      custom
                      value={minTime.unit}
                      onChange={(event) => {
                        tempListingSpaceA({
                          minTime: {
                            // ...minTime,
                            value: 0,
                            unit: event.target.value
                          }
                        });
                      }}>
                      <option>Hours</option>
                      <option>Days</option>
                    </Form.Control>
                  </Form.Group>
                </InputGroup.Append>
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Maximum Time</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Maximum Time"
                  type="number"
                  min="0"
                  required
                  name="maxTime"
                  value={convertToUnit(maxTime.value, maxTime.unit)}
                  onChange={(event) =>
                    tempListingSpaceA({
                      maxTime: {
                        ...maxTime,
                        value: convertToMilliseconds(event.target.value, maxTime.unit)
                      }
                    })
                  }
                />

                <InputGroup.Append>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Control
                      as="select"
                      custom
                      value={maxTime.unit}
                      onChange={(event) => {
                        tempListingSpaceA({
                          maxTime: {
                            // ...maxTime,
                            value: 0,
                            unit: event.target.value
                          }
                        });
                      }}>
                      <option>Hours</option>
                      <option>Days</option>
                    </Form.Control>
                  </Form.Group>
                </InputGroup.Append>
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form>

          <p className="description">
            Tip : Shorter trips can mean more reservations but you might have to turn over your
            space more often.
          </p>
        </div>
      )}
      {activeIndex === 13 && (
        <div className="question-item">
          <h1 className="heading">Which booking process do you prefer?</h1>
          {validated && instantBooking === '' && (
            <p className="invalid-feedback-text">Please select a booking process type</p>
          )}
          <RadioItem
            label="Instant Booking"
            name="instantBooking"
            onClick={(event) => tempListingSpaceA({ instantBooking: true })}
            checked={instantBooking === true}
          />
          <RadioItem
            label="Approval is required"
            name="instantBooking"
            onClick={(event) => tempListingSpaceA({ instantBooking: false })}
            checked={instantBooking === false}
          />
        </div>
      )}
      {activeIndex === 14 && (
        <>
          <div className="question-item">
            <h1 className="heading">Choose how you want to charge for the bookings?</h1>
            <RadioItem
              label="Variable Rate"
              name="pricingType"
              onClick={(event) =>
                tempListingPricingD({
                  pricingType: 'variable'
                })
              }
              checked={pricingType === 'variable'}
            />
            <p className="small-muted">Charge by length of reservation</p>
            <RadioItem
              label="Flat Rate"
              name="pricingType"
              onClick={(event) =>
                tempListingPricingD({
                  pricingType: 'flat'
                })
              }
              checked={pricingType === 'flat'}
            />
            <p className="small-muted">Charge a flat rate per day</p>

            {validated && !pricingType && (
              <p className="invalid-feedback-text">Please select a billing type</p>
            )}
          </div>
          <div className="question-item">
            <h1 className="heading">Set your desired rates</h1>
            <h4>Flat Billing Type</h4>
            <br />
            <Form validated={validated}>
              <Form.Label>Per Hour*</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Per Hour"
                  placeholder="Per Hour"
                  type="number"
                  required
                  min="0"
                  value={pricingRates.perHourRate ? pricingRates.perHourRate : ''}
                  name="perHourRate"
                  onChange={({ target: { value } }) =>
                    tempListingPricingD({
                      pricingRates: {
                        ...pricingRates,
                        perHourRate: value === '' ? 0 : value
                      }
                    })
                  }
                />

                <InputGroup.Append>
                  <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup.Append>
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </InputGroup>
              <Form.Label>Per Day</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Per Day"
                  placeholder="Per Day"
                  type="number"
                  min="0"
                  required
                  value={pricingRates.perDayRate ? pricingRates.perDayRate : ''}
                  name="perDayRate"
                  onChange={({ target: { value } }) =>
                    tempListingPricingD({
                      pricingRates: {
                        ...pricingRates,
                        perDayRate: value === '' ? 0 : value
                      }
                    })
                  }
                />
                <InputGroup.Append>
                  <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup.Append>
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </InputGroup>
              <Form.Label>Per Week</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Per Week"
                  placeholder="Per Week"
                  type="number"
                  min="0"
                  required
                  value={pricingRates.perWeekRate ? pricingRates.perWeekRate : ''}
                  name="perWeekRate"
                  onChange={({ target: { value } }) =>
                    tempListingPricingD({
                      pricingRates: {
                        ...pricingRates,
                        perWeekRate: value === '' ? 0 : value
                      }
                    })
                  }
                />
                <InputGroup.Append>
                  <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup.Append>
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </InputGroup>
              <Form.Label>Per Month</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Per Month"
                  placeholder="Per Month"
                  type="number"
                  min="0"
                  required
                  value={pricingRates.perMonthRate ? pricingRates.perMonthRate : ''}
                  name="perMonthRate"
                  onChange={({ target: { value } }) =>
                    tempListingPricingD({
                      pricingRates: {
                        ...pricingRates,
                        perMonthRate: value === '' ? 0 : value
                      }
                    })
                  }
                />
                <InputGroup.Append>
                  <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup.Append>
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </InputGroup>
            </Form>
            <p className="modal-link">Tips for setting appropriate rates</p>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = ({ tempListing }) => ({
  tempListing
});

export default connect(mapStateToProps, {
  updateTempListing,
  tempListingLocationD,
  tempListingSpaceD,
  tempListingSpaceA,
  tempListingPricingD
})(AddListingForm);
