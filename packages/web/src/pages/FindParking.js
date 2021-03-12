import React, { useEffect, useState } from 'react';
import { useFindParking } from '@parkyourself-frontend/shared/hooks/listings';
import { updateFindParkingData } from '@parkyourself-frontend/shared/redux/actions/findParking';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, Form, Button, Spinner } from 'react-bootstrap';
import { IoIosCloseCircleOutline } from 'react-icons/io';
// import { showLoading, hideLoading } from 'react-redux-loading';
import { BiCurrentLocation } from 'react-icons/bi';
import { BsFilterRight } from 'react-icons/bs';
import { FaSearchLocation } from 'react-icons/fa';
import { ImList2 } from 'react-icons/im';
import Geocode from 'react-geocode';
import moment from 'moment';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
// import MapContainer from '../app/components/MapContainer';
import MapContainer from '../app/components/listings/FindParkingMapContainer';
import DriverContainer from '../app/components/DriverContainer';
import FindParkingList from '../app/components/FindParkingList';
import StartEndDateTimePicker from '../app/components/StartEndDateTimePicker';
import ParkingsListView from '../app/components/ParkingsListView';
import { Tabs, Tab, Modal, Dropdown } from 'react-bootstrap';
import { Menu, X } from 'react-feather';

Geocode.setApiKey('AIzaSyDF0pzALjYYanPshuclFzq_2F24xZWZjOg');

const FindParking = () => {
  const { start, end, coordinates, parkings, search, duration } = useSelector(
    ({ findParking }) => findParking
  );
  const { loading } = useFindParking();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [listView, setListView] = useState(false);
  const [selected, setSelected] = useState({});
  const [showFilter,setShowFilter] = useState(false)

  const onMapClick = () => {};
  // const onMapClick = (mapProps, map, clickEvent) => {
  //   // const { google } = mapProps;
  //   // const service = new google.maps.places.PlacesService(map);
  //   console.log(clickEvent);
  //   const lat = clickEvent.latLng.lat();
  //   const lng = clickEvent.latLng.lng();
  //   console.log(mapProps);
  //   console.log(map);
  //   // setMarker({ lat: lat, lng: lng });
  //   // setCoordinates([lng, lat]);
  // };

  const onMarkerClick = (data) => {
    setSelected(data);
    setVisible(true);
  };

  const handleSelect = async (value) => {
    geocodeByAddress(value)
      .then((details) => {
        return getLatLng(details[0]);
      })
      .then((latLng) => {
        dispatch(
          updateFindParkingData({
            search: value,
            coordinates: [latLng.lng, latLng.lat]
          })
        );
      })
      .catch((error) => {
        // console.error('Error', error);
      });
  };

  // const getCurrentLocation = () => {};
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(
          updateFindParkingData({
            coordinates: [position.coords.longitude, position.coords.latitude]
          })
        );
        Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
          (response) => {
            const address = response.results[0].formatted_address;
            dispatch(
              updateFindParkingData({
                search: address
              })
            );
          },
          (error) => {
            // console.error(error);
          }
        );
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };
  // const onSubmitHandler = async () => {};

  return (
    <DriverContainer>
      <div className="dg__account find-parking">
        <div className="find-parking-form">
          <div className="header">
            <Nav variant="pills" activeKey={duration}>
              <Nav.Item>
                <Nav.Link
                  eventKey="hourly"
                  onClick={() => {
                    dispatch(
                      updateFindParkingData({
                        duration: 'hourly'
                      })
                    );
                    //   setFindParkingData({
                    //     ...findParkingData,
                    //     duration: 'hourly',
                    //     start: moment(`${moment(new Date()).format('ll')} ${st}`)._d,
                    //     end: moment(`${moment(new Date()).format('ll')} ${st}`).add(2, 'hour')._d
                    //   });
                    //   setSearchData({
                    //     ...findParkingData,
                    //     duration: 'hourly',
                    //     start: moment(`${moment(new Date()).format('ll')} ${st}`)._d,
                    //     end: moment(`${moment(new Date()).format('ll')} ${st}`).add(2, 'hour')._d
                    //   });
                    //
                  }}>
                  Hourly
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="monthly"
                  onClick={() => {
                    dispatch(
                      updateFindParkingData({
                        duration: 'monthly'
                      })
                    );
                    // setFindParkingData({
                    //   ...findParkingData,
                    //   duration: 'monthly',
                    //   start: moment(`${moment(new Date()).format('ll')} ${st}`)._d,
                    //   end: moment(`${moment(new Date()).format('ll')} ${st}`)
                    //     .add(1, 'month')
                    //     .subtract(1, 'day')._d
                    // });
                    // setSearchData({
                    //   ...findParkingData,
                    //   duration: 'monthly',
                    //   start: moment(`${moment(new Date()).format('ll')} ${st}`)._d,
                    //   end: moment(`${moment(new Date()).format('ll')} ${st}`)
                    //     .add(1, 'month')
                    //     .subtract(1, 'day')._d
                    // });
                  }}>
                  Monthly
                </Nav.Link>
              </Nav.Item>
            </Nav>

          <div className="d-flex justify-content-between">
            {/* <div>
              <h1 className="heading">{title || 'Bookings'}</h1>
            </div> */}
            <Dropdown drop="left">
              <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
              {/* <Button onClick={() =>setShowFilter(true)} variant="outline-dark"> */}
              <BsFilterRight />  Filters
            {/* </Button> */}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">
                  <span >Date Range</span>
                  {/* {dateFilter && (
                    <span className="cursor-pointer" onClick={() => setDateFilter(false)}>
                      <X size={25} className="ml-2" />
                    </span>
                  )} */}
                </Dropdown.Item>
                <Dropdown.Item
                  >
                  Day
                </Dropdown.Item>
               
                
              </Dropdown.Menu>
            </Dropdown>
          </div>
        
          
          </div>
          <div className="row">
            <Form className="col-xl-6 col-lg-5 col-md-5 col-xs-12">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Search</Form.Label>
                {/* <Form.Control
                type='email'
                placeholder='Location, Address or Event Name'
              /> */}
                <PlacesAutocomplete
                  value={search}
                  onChange={(value) =>
                    dispatch(
                      updateFindParkingData({
                        search: value
                      })
                    )
                  }
                  onSelect={handleSelect}>
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                      <div className="input-group">
                        <input
                          {...getInputProps({
                            placeholder: 'Search your location',
                            className: 'location-search-input form-control ',
                            style: { borderRight: 'none' }
                          })}
                        />
                        {search && (
                          <div
                            className="input-group-append clear-btn"
                            onClick={() =>
                              dispatch(
                                updateFindParkingData({
                                  search: ''
                                })
                              )
                            }>
                            <span className="input-group-text">
                              <IoIosCloseCircleOutline />
                            </span>
                          </div>
                        )}

                        <div
                          className="input-group-append location-btn"
                          onClick={() => {
                            getCurrentLocation();
                          }}>
                          <span className="input-group-text">
                            <BiCurrentLocation />
                          </span>
                        </div>
                      </div>

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
              </Form.Group>
            </Form>
            <StartEndDateTimePicker
              className="col-xl-4 col-lg-5 col-md-5 col-sm-8 col-10"
              start={start}
              // startTime={startTime}
              end={end}
              // endTime={endTime}
              onChange={(start, end) => {
                dispatch(
                  updateFindParkingData({
                    start,
                    end
                  })
                );
              }}
            />
            {/* <Button
              variant="dark"
              className="col-xl-1 col-lg-1 col-md-1 col-sm-2 col-2 search-btn"
              onClick={onSubmitHandler}>
              {disabled ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="mb-1"
                  />
                  <span className="sr-only">Loading...</span>
                </>
              ) : (
                <FaSearchLocation />
              )}
            </Button> */}
          </div>
        </div>
        <div className="map-container">
          {parkings.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="primary"
                onClick={() => {
                  setListView(true);
                }}>
                <ImList2 /> List View
              </Button>
              {listView && <ParkingsListView setListView={setListView} parkings={parkings} />}
            </div>
          )}
          <MapContainer
            coordinates={coordinates}
            onMapClick={onMapClick}
            onMarkerClick={onMarkerClick}
            parkings={parkings}
            start={start}
            end={end}
          />
          {visible && (
            <FindParkingList setVisible={setVisible} parkings={parkings} selected={selected} />
          )}
        </div>
      </div>
    </DriverContainer>
  );
};

export default FindParking;
