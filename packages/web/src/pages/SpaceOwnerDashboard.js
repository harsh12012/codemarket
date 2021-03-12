import React, { useEffect, useState } from 'react';
import { Accordion, Card, Form, Button, Nav, ListGroup, Table } from 'react-bootstrap';
import Link from 'next/link';
import { IoIosArrowUp, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { gql, useMutation } from '@apollo/client';
import {
  createSpaceOwnerProfileLocal,
  loadUserSpaceOwnerProfile,
  updateSpaceOwnerProfileLocal,
  deleteSpaceOwnerProfileLocal
} from '../app/redux/actions/spaceOwnerProfile';
import { toggleLoading, toggleProfileType } from '../app/redux/actions/user';
import { client } from '../app/graphql';
import SpaceOwnerProfileModal from '../app/components/SpaceOwnerProfileModal';
import { useSpaceOwnerProfile } from '@parkyourself-frontend/shared/hooks/adminProfile';

// import 'react-toastify/dist/ReactToastify.css';

const GET_USER_SPACEOWNER_PROFILE = gql`
  query GetUserSpaceOwnerProfile($userId: String!) {
    getUserSpaceOwnerProfile(userId: $userId) {
      _id
      userId
      address
      businessName
      facebook
      twitter
      instagram
    }
  }
`;

const CREATE_SPACEOWNER_PROFILE = gql`
  mutation CreateSpaceOwnerProfile(
    $userId: String!
    $address: String!
    $businessName: String!
    $facebook: String!
    $twitter: String!
    $instagram: String!
  ) {
    createSpaceOwnerProfile(
      userId: $userId
      address: $address
      businessName: $businessName
      facebook: $facebook
      twitter: $twitter
      instagram: $instagram
    ) {
      _id
      userId
      address
      businessName
      facebook
      twitter
      instagram
    }
  }
`;

const UPDATE_SPACEOWNER_PROFILE = gql`
  mutation UpdateSpaceOwnerProfile(
    $id: ID!
    $userId: String
    $address: String
    $businessName: String
    $facebook: String
    $twitter: String
    $instagram: String
  ) {
    updateSpaceOwnerProfile(
      id: $id
      userId: $userId
      address: $address
      businessName: $businessName
      facebook: $facebook
      twitter: $twitter
      instagram: $instagram
    ) {
      _id
      userId
      address
      businessName
      facebook
      twitter
      instagram
    }
  }
`;

const DELETE_SPACEOWNER_PROFILE = gql`
  mutation DeleteSpaceOwnerProfile($id: ID!) {
    deleteSpaceOwnerProfile(id: $id)
  }
`;

const SpaceOwnerDashboard = ({
  spaceOwnerProfile,
  userData,
  createSpaceOwnerProfileLocal,
  loadUserSpaceOwnerProfile,
  updateSpaceOwnerProfileLocal,
  deleteSpaceOwnerProfileLocal
}) => {
  const { deleteSpaceOwner, payload, setPayload, addProfile, profile } = useSpaceOwnerProfile();

  // console.log('space', profile);

  const { name, email, sub } = userData;
  const [activeKey, setActiveKey] = useState('');
  const [showProfileForm, setShowProfileForm] = useState(false);

  const [showSpaceOwnerProfileModal, setShowSpaceOwnerProfileModal] = useState(false);
  const [spaceOwnerProfileEdit, setSpaceOwnerProfileEdit] = useState(false);

  const deleteSpaceOwnerProfileHandler = async (id) => {
    deleteSpaceOwner(id);
    toast.success('Space Owner Profile Deleted Successfully');
  };

  const createSpaceOwnerProfileHandler = async (data) => {
    // console.log(data);
    // setPayload(data);
    await addProfile(data);
    toast.success('Space Owner Profile Created Successfully');
  };
  const updateSpaceOwnerProfileHandler = async (data) => {
    // setPayload({ ...data, edit: true });
    // console.log({ ...data, edit: true });

    // console.log({ ...data, edit: true });
    await addProfile({ ...data, edit: true });
    toast.success('Space Owner Profile Updated Successfully');
  };

  const spaceOwnerProfileEditButtonHandler = async () => {
    setSpaceOwnerProfileEdit(true);
    setShowSpaceOwnerProfileModal(true);
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
            eventKey="business"
            onClick={() => {
              setShowProfileForm(!showProfileForm);
            }}>
            <div className="setup-profile">
              <div>
                <p className="lead">Space Owner Profile</p>
                <p>{email}</p>
              </div>
              {showProfileForm ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="business">
            <Card.Body>
              {profile ? (
                <>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{name}</td>
                      </tr>
                      {/* <tr>
              <td>Last Name</td>
              <td>{businessProfile.data.businessName}</td>
            </tr> */}
                      <tr>
                        <td>Email</td>
                        <td>{email}</td>
                      </tr>
                      {/* <tr>
              <td>Mobile Number</td>
              <td>{businessProfile.data.businessMobileCode}-{businessProfile.data.businessMobile} </td>   
            </tr>     */}
                      <tr>
                        <td>Address</td>
                        <td>{profile.address}</td>
                      </tr>
                      <tr>
                        <td>BusinessName</td>
                        <td>
                          {profile.businessName ? profile.businessName : 'No business name added'}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <br />
                  <p className="lead">Social Accounts</p>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>Facebook</td>
                        <td>{profile.facebook ? profile.facebook : 'No Facebook account added'}</td>
                      </tr>
                      <tr>
                        <td>Twitter</td>
                        <td>{profile.twitter ? profile.twitter : 'No Twitter account added'}</td>
                      </tr>
                      <tr>
                        <td>Instagram</td>
                        <td>
                          {profile.instagram ? profile.instagram : 'No Instagram account added'}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      spaceOwnerProfileEditButtonHandler();
                    }}>
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    style={{ marginLeft: '10px' }}
                    onClick={() => {
                      deleteSpaceOwnerProfileHandler(profile._id);
                    }}>
                    Delete
                  </Button>
                </>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => {
                    setSpaceOwnerProfileEdit(false);
                    setShowSpaceOwnerProfileModal(true);
                  }}>
                  Create Space Owner Profile
                </Button>
              )}
              <SpaceOwnerProfileModal
                show={showSpaceOwnerProfileModal}
                handleClose={() => {
                  setShowSpaceOwnerProfileModal(false);
                }}
                handleSave={createSpaceOwnerProfileHandler}
                handleUpdate={updateSpaceOwnerProfileHandler}
                edit={spaceOwnerProfileEdit}
                spaceOwnerProfile={profile}
                setPayload={setPayload}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <br />
      <h4>More Information</h4>
      <div className="more-info-btns">
        <Link href="/listings/my">
          <Card>
            <Card.Body>
              <div>My Listings</div>
              <IoIosArrowForward />
            </Card.Body>
          </Card>
        </Link>
        <Card>
          <Card.Body>
            <div>Parking Orders Recieved</div>
            <IoIosArrowForward />
          </Card.Body>
        </Card>
        <Link href="/listings/add">
          <Card>
            <Card.Body>
              <div>Add a Listing</div>
              <IoIosArrowForward />
            </Card.Body>
          </Card>
        </Link>
        <Link href="/check-in">
          <Card>
            <Card.Body>
              <div>Checkin / Checkout</div>
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
        <Link href="/withdrawal-settings">
          <Card>
            <Card.Body>
              <div>Withdrawal Settings</div>
              <IoIosArrowForward />
            </Card.Body>
          </Card>
        </Link>
        <Link href="/reports">
          <Card>
            <Card.Body>
              <div>Payout & Deposit Reports</div>
              <IoIosArrowForward />
            </Card.Body>
          </Card>
        </Link>
        <Card>
          <Card.Body>
            <div>Set Staff Credentials</div>
            <IoIosArrowForward />
          </Card.Body>
        </Card>
        <Link href="/faq">
          <Card>
            <Card.Body>
              <div>FAQs</div>
              <IoIosArrowForward />
            </Card.Body>
          </Card>
        </Link>
        {/* <Link href="faq">
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

const mapStateToProps = ({ user, auth, spaceOwnerProfile }) => ({
  profileType: user.profileType,
  userData: auth.data.attributes,
  spaceOwnerProfile
});

export default connect(mapStateToProps, {
  toggleProfileType,
  createSpaceOwnerProfileLocal,
  loadUserSpaceOwnerProfile,
  updateSpaceOwnerProfileLocal,
  deleteSpaceOwnerProfileLocal
})(SpaceOwnerDashboard);
