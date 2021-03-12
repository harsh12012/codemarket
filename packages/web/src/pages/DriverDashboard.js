import React, { useEffect, useState } from 'react';
import { Accordion, Card, Form, Button, Nav, ListGroup, Table } from 'react-bootstrap';
import { IoIosArrowUp, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { MdEdit, MdDelete, MdInfoOutline } from 'react-icons/md';
import { connect } from 'react-redux';
import AddVehicleModal from '../app/components/AddVehicleModal';
import { toggleLoading, toggleProfileType } from '../app/redux/actions/user';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import {
  addVehicleLocal,
  loadUserVehicles,
  updateVehicleLocal,
  deleteVehicleLocal
} from '../app/redux/actions/vehicle';
import {
  createBusinessProfileLocal,
  loadUserBusinessProfile,
  updateBusinessProfileLocal,
  deleteBusinessProfileLocal
} from '../app/redux/actions/businessProfile';
import { gql, useMutation } from '@apollo/client';
import { client } from '../app/graphql';
import BusinessProfileModal from '../app/components/BusinessProfileModal';
import VehicleDetailsModal from '../app/components/VehicleDetailsModal';
import Link from 'next/link';
import PersonalProfileModal from '../app/components/PersonalProfileModal';

const GET_USER_VEHICLES = gql`
  query GetUserVehicles($userId: String!) {
    getUserVehicles(userId: $userId) {
      _id
      userId
      profileType
      licensePlate
      type
      make
      model
      year
      size
      color
      image
      createdAt
    }
  }
`;

const CREATE_VEHICLE = gql`
  mutation CreateVehicle(
    $userId: String!
    $profileType: String!
    $licensePlate: String!
    $type: String!
    $make: String!
    $model: String!
    $year: String!
    $size: String!
    $color: String
    $image: String
  ) {
    createVehicle(
      userId: $userId
      profileType: $profileType
      licensePlate: $licensePlate
      type: $type
      make: $make
      model: $model
      year: $year
      size: $size
      color: $color
      image: $image
    ) {
      _id
      userId
      profileType
      licensePlate
      type
      make
      model
      year
      size
      color
      image
      createdAt
    }
  }
`;

const UPDATE_VEHICLE = gql`
  mutation UpdateVehicle(
    $id: ID!
    $userId: String!
    $profileType: String!
    $licensePlate: String!
    $type: String!
    $make: String!
    $model: String!
    $year: String!
    $size: String!
    $color: String
    $image: String
  ) {
    updateVehicle(
      id: $id
      userId: $userId
      profileType: $profileType
      licensePlate: $licensePlate
      type: $type
      make: $make
      model: $model
      year: $year
      size: $size
      color: $color
      image: $image
    ) {
      _id
      userId
      profileType
      licensePlate
      type
      make
      model
      year
      size
      color
      image
      createdAt
    }
  }
`;

const DELETE_VEHICLE = gql`
  mutation DeleteVehicle($id: ID!) {
    deleteVehicle(id: $id)
  }
`;

const GET_USER_BUSINESS_PROFILE = gql`
  query GetUserBusinessProfile($userId: String!) {
    getUserBusinessProfile(userId: $userId) {
      _id
      userId
      businessName
      businessEmail
      businessMobile
      businessMobileCode
      createdAt
    }
  }
`;

const CREATE_BUSINESS_PROFILE = gql`
  mutation CreateBusinessProfile(
    $userId: String!
    $businessName: String!
    $businessEmail: String!
    $businessMobile: String!
    $businessMobileCode: String!
  ) {
    createBusinessProfile(
      userId: $userId
      businessName: $businessName
      businessEmail: $businessEmail
      businessMobile: $businessMobile
      businessMobileCode: $businessMobileCode
    ) {
      _id
      userId
      businessName
      businessEmail
      businessMobile
      businessMobileCode
      createdAt
    }
  }
`;

const UPDATE_BUSINESS_PROFILE = gql`
  mutation UpdateBusinessProfile(
    $id: ID!
    $userId: String
    $businessName: String
    $businessEmail: String
    $businessMobile: String
    $businessMobileCode: String
  ) {
    updateBusinessProfile(
      id: $id
      userId: $userId
      businessName: $businessName
      businessEmail: $businessEmail
      businessMobile: $businessMobile
      businessMobileCode: $businessMobileCode
    ) {
      _id
      userId
      businessName
      businessEmail
      businessMobile
      businessMobileCode
      createdAt
    }
  }
`;

const DELETE_BUSINESS_PROFILE = gql`
  mutation DeleteBusinessProfile($id: ID!) {
    deleteBusinessProfile(id: $id)
  }
`;

const DriverDashboard = ({
  vehicle,
  profileType,
  userData,
  toggleProfileType,
  loadUserVehicles,
  addVehicleLocal,
  updateVehicleLocal,
  deleteVehicleLocal,
  createBusinessProfileLocal,
  businessProfile,
  loadUserBusinessProfile,
  updateBusinessProfileLocal,
  deleteBusinessProfileLocal
}) => {
  const [createVehicle] = useMutation(CREATE_VEHICLE);
  const [updateVehicle] = useMutation(UPDATE_VEHICLE);
  const [deleteVehicle] = useMutation(DELETE_VEHICLE);

  const [createBusinessProfile] = useMutation(CREATE_BUSINESS_PROFILE);
  const [updateBusinessProfile] = useMutation(UPDATE_BUSINESS_PROFILE);
  const [deleteBusinessProfile] = useMutation(DELETE_BUSINESS_PROFILE);

  const { vehicles, loading } = vehicle;
  const { name, email, sub } = userData;
  const [activeKey, setActiveKey] = useState('');
  const [showPersonalForm, setShowPersonalForm] = useState(false);
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  // const [profileType,setProfileType] = useState('personal');
  const [showVehicles, setShowVehicles] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [vehicleEdit, setVehicleEdit] = useState(false);
  const [vehicleId, setVehicleId] = useState('');

  const [showBusinessProfileModal, setShowBusinessProfileModal] = useState(false);
  const [showPersonalProfileModal, setShowPersonalProfileModal] = useState(false);
  const [businessProfileEdit, setBusinessProfileEdit] = useState(false);

  const [showVehicleDetails, setShowVehicleDetails] = useState(false);

  // const [personalVehicles,setPersonalVehicles] = useState(vehicles)

  useEffect(() => {
    const getVehicles = () => {
      toggleLoading();
      client
        .query({
          query: GET_USER_VEHICLES,
          variables: { userId: sub }
        })
        .then(({ data }) => {
          // console.log(data.getUserVehicles);
          loadUserVehicles(data.getUserVehicles);
        })
        .catch((err) => {
          // console.log(err);
          toggleLoading();
        });
    };

    const getBusinessProfileData = () => {
      // console.log('getting business profile');
      toggleLoading();
      client
        .query({
          query: GET_USER_BUSINESS_PROFILE,
          variables: { userId: sub }
        })
        .then(({ data }) => {
          // console.log(data.getUserBusinessProfile);
          loadUserBusinessProfile(data.getUserBusinessProfile);
        })
        .catch((err) => {
          // console.log(err);
          toggleLoading();
        });
    };
    getBusinessProfileData();
    getVehicles();
  }, []);

  const changeProfileType = async (type) => {
    try {
      if (type === profileType) {
        return;
      }
      await toggleProfileType();
      if (type == 'personal') {
        // toast.success('Switched to Personal Profile');
      } else {
        // toast.success('Switched to Business Profile');
      }
    } catch (error) {
      // toast.warn('Something Went Wrong!');
    }
  };

  const addVehicleHandler = async (data) => {
    try {
      const response = await createVehicle({
        variables: data
      });
      addVehicleLocal(response.data.createVehicle);

      // console.log(response.data.createVehicle);
      // toast.success('Vehicle Added Successfully');
    } catch (error) {
      // toast.warn('Something Went Wrong!');
    }
  };

  const updateVehicleHandler = async (data) => {
    try {
      const response = await updateVehicle({
        variables: data
      });
      updateVehicleLocal(response.data.updateVehicle);
      setVehicleEdit(false);
      setVehicleId('');
      // console.log(response.data.updateVehicle);
      // toast.success('Vehicle Updated Successfully');
    } catch (error) {
      // toast.warn('Something Went Wrong!');
    }
  };

  const vehicleEditButtonHandler = async (id) => {
    // console.log('in edit handler', id);
    setVehicleEdit(true);
    setVehicleId(id);
    setShowVehicleModal(true);
  };

  const vehicleInfoButtonHandler = async (id) => {
    // console.log('in edit handler', id);
    setVehicleId(id);
    setShowVehicleDetails(true);
  };

  const businessProfileEditButtonHandler = async () => {
    // console.log('in edit handler');
    setBusinessProfileEdit(true);
    setShowBusinessProfileModal(true);
  };

  const personalProfileEditButtonHandler = async () => {
    // console.log('in edit handler');
    setShowPersonalProfileModal(true);
  };

  const deleteVehicleHandler = async (id) => {
    try {
      const response = await deleteVehicle({
        variables: { id: id }
      });
      deleteVehicleLocal(id);
      // console.log(response.data.deleteVehicle);
      // toast.success("Vehicle Deleted Successfully");
    } catch (error) {
      // toast.warn("Something Went Wrong!");
    }
  };

  const createBusinessProfileHandler = async (data) => {
    try {
      const response = await createBusinessProfile({
        variables: data
      });
      createBusinessProfileLocal(response.data.createBusinessProfile);

      // console.log(response.data.createBusinessProfile);
      // toast.success('Business Profile Created Successfully');
    } catch (error) {
      // toast.warn('Something Went Wrong!');
      // console.log(error);
    }
  };

  const updateBusinessProfileHandler = async (data) => {
    try {
      const response = await updateBusinessProfile({
        variables: data
      });
      updateBusinessProfileLocal(response.data.updateBusinessProfile);
      setBusinessProfileEdit(false);
      // console.log(response.data.updateBusinessProfile);
      // toast.success('Business Profile Updated Successfully');
    } catch (error) {
      // toast.warn('Something Went Wrong!');
      // console.log(error);
    }
  };

  const deleteBusinessProfileHandler = async (id) => {
    try {
      const response = await deleteBusinessProfile({
        variables: { id: id }
      });
      deleteBusinessProfileLocal(id);
      // console.log(response.data.deleteVehicle);
      // toast.success('Business Profile Deleted Successfully');
    } catch (error) {
      // toast.warn('Something Went Wrong!');
      // console.log(error);
    }
  };

  return (
    <div className="dg__account">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
      <h1 className="heading">Dashboard</h1>
      <Accordion defaultActiveKey={activeKey} className="profile-accordian">
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="personal"
            onClick={() => {
              setActiveKey('personal');
              setShowPersonalForm(!showPersonalForm);
              setShowBusinessForm(false);
            }}>
            <div className="setup-profile">
              <div>
                <p className="lead">Personal Profile</p>
                <p>{email}</p>
              </div>
              {showPersonalForm ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="personal">
            <Card.Body>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{email}</td>
                  </tr>
                </tbody>
              </Table>
              <Button
                variant="outline-primary"
                onClick={() => {
                  personalProfileEditButtonHandler();
                }}>
                Edit
              </Button>
              <PersonalProfileModal
                show={showPersonalProfileModal}
                handleClose={() => {
                  setShowPersonalProfileModal(false);
                }}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="business"
            onClick={() => {
              setActiveKey('business');
              setShowPersonalForm(false);
              setShowBusinessForm(!showBusinessForm);
            }}>
            <div className="setup-profile">
              <div>
                <p className="lead">Business Profile</p>
                <p>
                  {businessProfile.data
                    ? businessProfile.data.businessEmail
                    : 'Set Up your Business Profile'}
                </p>
              </div>
              {showBusinessForm ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="business">
            <Card.Body>
              {businessProfile.data ? (
                <>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>Business Name</td>
                        <td>{businessProfile.data.businessName}</td>
                      </tr>
                      <tr>
                        <td>Business Email</td>
                        <td>{businessProfile.data.businessEmail}</td>
                      </tr>
                      <tr>
                        <td>Mobile Number</td>
                        <td>
                          {businessProfile.data.businessMobileCode}-
                          {businessProfile.data.businessMobile}{' '}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      businessProfileEditButtonHandler();
                    }}>
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    style={{ marginLeft: '10px' }}
                    onClick={() => {
                      deleteBusinessProfileHandler(businessProfile.data._id);
                    }}>
                    Delete
                  </Button>
                </>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => {
                    setBusinessProfileEdit(false);
                    setShowBusinessProfileModal(true);
                  }}>
                  Create a Business Profile
                </Button>
              )}
              <BusinessProfileModal
                show={showBusinessProfileModal}
                handleClose={() => {
                  setShowBusinessProfileModal(false);
                }}
                handleSave={createBusinessProfileHandler}
                handleUpdate={updateBusinessProfileHandler}
                edit={businessProfileEdit}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <br />
      <Card>
        <Card.Body>
          <div className="profile-type">
            Profile Type{' '}
            <Nav variant="pills" activeKey={profileType}>
              <Nav.Item>
                <Nav.Link
                  eventKey="personal"
                  onClick={() => {
                    changeProfileType('personal');
                  }}>
                  Personal
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="business"
                  onClick={() => {
                    changeProfileType('business');
                  }}>
                  Business
                </Nav.Link>
              </Nav.Item>
            </Nav>{' '}
          </div>
        </Card.Body>
      </Card>
      <br />
      <h4>More Information</h4>
      <div className="more-info-btns">
        <Link href="/bookings/my">
          <Card>
            <Card.Body>
              <div>My Bookings</div>
              <IoIosArrowForward />
            </Card.Body>
          </Card>
        </Link>
        <Accordion>
          <Card>
            <Accordion.Toggle
              className="vehicles-btn"
              as={Card.Header}
              eventKey="0"
              onClick={() => {
                setShowVehicles(!showVehicles);
              }}>
              <div>Vehicles</div>
              {showVehicles ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <ListGroup className="vehicle-list">
                  {loading ? (
                    <ListGroup.Item>Loading...</ListGroup.Item>
                  ) : vehicles.length > 0 ? (
                    vehicles.filter((item) => item.profileType === profileType).length > 0 ? (
                      vehicles
                        .filter((item) => item.profileType === profileType)
                        .map((v) => (
                          <ListGroup.Item>
                            <div className="vehicle-name">
                              {v.year} {v.make} {v.model}
                            </div>{' '}
                            <div className="vehicle-control-btns">
                              <Button
                                variant="secondary"
                                onClick={() => {
                                  vehicleInfoButtonHandler(v._id);
                                }}>
                                <MdInfoOutline />
                              </Button>
                              <Button
                                variant="primary"
                                onClick={() => {
                                  vehicleEditButtonHandler(v._id);
                                }}>
                                <MdEdit />
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => {
                                  deleteVehicleHandler(v._id);
                                }}>
                                <MdDelete />
                              </Button>
                            </div>
                          </ListGroup.Item>
                        ))
                    ) : (
                      <ListGroup.Item>
                        <div>
                          {profileType === 'personal'
                            ? 'No Personal Vehicles Added'
                            : 'No Business Vehicles Added'}
                        </div>
                      </ListGroup.Item>
                    )
                  ) : (
                    <ListGroup.Item>
                      <div>
                        {profileType === 'personal'
                          ? 'No Personal Vehicles Added'
                          : 'No Business Vehicles Added'}
                      </div>
                    </ListGroup.Item>
                  )}
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      setShowVehicleModal(true);
                    }}>
                    Add New Vehicle
                  </Button>
                  <AddVehicleModal
                    show={showVehicleModal}
                    edit={vehicleEdit}
                    id={vehicleId}
                    handleClose={() => {
                      setShowVehicleModal(false);
                    }}
                    handleSave={addVehicleHandler}
                    handleUpdate={updateVehicleHandler}
                  />
                  <VehicleDetailsModal
                    show={showVehicleDetails}
                    id={vehicleId}
                    handleClose={() => {
                      setShowVehicleDetails(false);
                    }}
                  />
                </ListGroup>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Link href="/manage-cards">
          <Card>
            <Card.Body>
              <div>Cards</div>
              <IoIosArrowForward />
            </Card.Body>
          </Card>
        </Link>
        <Link href="/inbox">
          <Card>
            <Card.Body>
              <div>Inbox</div>
              <IoIosArrowForward />
            </Card.Body>
          </Card>
        </Link>
        <Card>
          <Card.Body>
            <div>Reviews</div>
            <IoIosArrowForward />
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <div>Send a Gift</div>
            <IoIosArrowForward />
          </Card.Body>
        </Card>
        <Link href="/settings">
          <Card>
            <Card.Body>
              <div>Settings</div>
              <IoIosArrowForward />
            </Card.Body>
          </Card>
        </Link>
        <Link href="faq">
          <Card>
            <Card.Body>
              <div>FAQs</div>
              <IoIosArrowForward />
            </Card.Body>
          </Card>
        </Link>
        {/* <Link href="jiti">
          <Card>
            <Card.Body>
              <div>Video share</div>
              <IoIosArrowForward />
            </Card.Body>
          </Card>
        </Link> */}
      </div>
    </div>
  );
};

const mapStateToProps = ({ vehicle, user, auth, businessProfile }) => ({
  vehicle,
  profileType: user.profileType,
  userData: auth.data.attributes,
  businessProfile
});

export default connect(mapStateToProps, {
  toggleProfileType,
  addVehicleLocal,
  updateVehicleLocal,
  deleteVehicleLocal,
  loadUserVehicles,
  createBusinessProfileLocal,
  loadUserBusinessProfile,
  updateBusinessProfileLocal,
  deleteBusinessProfileLocal
})(DriverDashboard);
