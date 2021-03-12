import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, ProgressBar, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import $ from 'jquery';
import PlacesAutocomplete from 'react-places-autocomplete';
import { BiCurrentLocation } from 'react-icons/bi';
import Geocode from 'react-geocode';

Geocode.setApiKey('AIzaSyDF0pzALjYYanPshuclFzq_2F24xZWZjOg');

const SpaceOwnerProfileModal = ({
  show,
  handleClose,
  handleSave,
  handleUpdate,
  edit,
  spaceOwnerProfile,
  userId
}) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [progress, setProgress] = useState(0);
  const [validated, setValidated] = useState(false);

  const [spaceOwnerData, setSpaceOwnerData] = useState({
    address: '',
    businessName: '',
    facebook: '',
    twitter: '',
    instagram: ''
  });

  const { address, businessName, facebook, twitter, instagram } = spaceOwnerData;

  const backButtonHandler = () => {
    try {
      if (activeIndex != 1) {
        setActiveIndex(activeIndex - 1);
        setProgress(progress - 20);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = async () => {
    try {
      if (activeIndex != 6) {
        if (
          (activeIndex == 1 && address) ||
          activeIndex == 2 ||
          activeIndex == 3 ||
          activeIndex == 4 ||
          activeIndex == 5
        ) {
          setActiveIndex(activeIndex + 1);
          setProgress(progress + 20);
          setValidated(false);
        } else {
          setValidated(true);
        }
      } else {
        if (edit) {
          // console.log({ ...spaceOwnerData, id: spaceOwnerProfile._id, userId: userId })
          handleUpdate({ ...spaceOwnerData, id: spaceOwnerProfile._id, userId: userId });
        } else {
          handleSave({ ...spaceOwnerData, userId: userId });
        }
        setActiveIndex(1);
        setProgress(0);
        onCloseHandler();
      }
    } catch (error) {
      alert('Problem creating space owner profile', 'Please try again');
    }
  };

  const onChangeSpaceOwnerData = (event) => {
    setSpaceOwnerData({ ...spaceOwnerData, [event.target.name]: event.target.value });
  };

  const onCloseHandler = () => {
    console.log('in close handler');
    $('.spaceowner-profile-modal').on('hidden.bs.modal', function (e) {
      $(this).removeData();
    });
    handleClose();
  };

  const handleSelect = async (value) => {
    setSpaceOwnerData({ ...spaceOwnerData, address: value });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
          (response) => {
            const address = response.results[0].formatted_address;
            console.log(address);

            setSpaceOwnerData({
              ...spaceOwnerData,
              address: address
            });
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

  const onChangeAddress = (value) => {
    setSpaceOwnerData({ ...spaceOwnerData, address: value });
  };

  useEffect(() => {
    // console.log(edit);
    if (edit) {
      const getSpaceOwnerData = () => {
        const { address, businessName, facebook, twitter, instagram } = spaceOwnerProfile;
        setSpaceOwnerData({ address, businessName, facebook, twitter, instagram });
      };
      getSpaceOwnerData();
    } else {
      setActiveIndex(1);
      setProgress(0);
    }
  }, [edit]);

  // console.log(spaceOwnerProfile._id, spaceOwnerData);

  return (
    <Modal show={show} onHide={onCloseHandler} className="spaceowner-profile-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          {edit ? 'Edit Space Owner Profile' : 'Create Space Owner Profile'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProgressBar now={progress} />
        <Form validated={validated} className="vehicle-form">
          {activeIndex == 1 && (
            <div className="question-item">
              <h4 className="heading">Where are you located?</h4>
              <Form.Group controlId="formBasicEmail">
                <PlacesAutocomplete
                  value={address}
                  onChange={onChangeAddress}
                  onSelect={handleSelect}>
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                      <div className="input-group">
                        <input
                          {...getInputProps({
                            placeholder: 'Search your location',
                            className: 'location-search-input form-control '
                          })}
                          style={{ marginTop: '0px' }}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          This field is required
                        </Form.Control.Feedback>
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
            </div>
          )}
          {activeIndex == 2 && (
            <div className="question-item">
              <h4 className="heading">Tell us your Business name?</h4>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="businessName"
                  placeholder="Business Name"
                  value={businessName}
                  onChange={(event) => {
                    onChangeSpaceOwnerData(event);
                  }}
                />
              </Form.Group>
            </div>
          )}
          {activeIndex == 3 && (
            <div className="question-item">
              <h4 className="heading">Do you have a Facebook account?</h4>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="facebook"
                  placeholder="Facebook Username"
                  value={facebook}
                  onChange={(event) => {
                    onChangeSpaceOwnerData(event);
                  }}
                />
              </Form.Group>
            </div>
          )}

          {activeIndex == 4 && (
            <div className="question-item">
              <h4 className="heading">Do you have a Twitter account?</h4>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="twitter"
                  placeholder="Twitter Username"
                  value={twitter}
                  onChange={(event) => {
                    onChangeSpaceOwnerData(event);
                  }}
                />
              </Form.Group>
            </div>
          )}

          {activeIndex == 5 && (
            <div className="question-item">
              <h4 className="heading">Do you have a Instagram account?</h4>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="instagram"
                  placeholder="Instagram Username"
                  value={instagram}
                  onChange={(event) => {
                    onChangeSpaceOwnerData(event);
                  }}
                />
              </Form.Group>
            </div>
          )}

          {activeIndex == 6 && (
            <div className="question-item">
              <h4 className="heading">Save your Space Owner Profile</h4>
              <Button variant="primary" onClick={onSubmitHandler}>
                Save
              </Button>
            </div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCloseHandler}>
          Close
        </Button>
        {activeIndex != 1 && (
          <Button
            variant="primary"
            onClick={() => {
              backButtonHandler();
            }}>
            Back
          </Button>
        )}
        {activeIndex != 6 && (
          <Button
            variant="success"
            onClick={() => {
              onSubmitHandler();
            }}>
            Next
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = ({ spaceOwnerProfile, auth }) => {
  return {
    // spaceOwnerProfile,
    userId: auth.data.attributes.sub
  };
};

export default connect(mapStateToProps)(SpaceOwnerProfileModal);
