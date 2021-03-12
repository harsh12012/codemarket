import React, { useEffect, useState } from 'react';
import { Button, Tabs, Tab, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import Link from 'next/link';
import { useMutation, gql, useSubscription } from '@apollo/client';
import DriverContainer from '../app/components/DriverContainer';
import MyBookingItem from '../app/components/MyBookingItem';
import { loadUserBookings, toggleLoading, updateBookingLocal } from '../app/redux/actions/user';
import { client } from '../app/graphql';

const UPDATE_BOOKING = gql`
  mutation UpdateBookingStatus(
    $id: String!
    $status: String!
    $driverEmail: String!
    $ownerEmail: String!
  ) {
    updateBookingStatus(
      id: $id
      status: $status
      driverEmail: $driverEmail
      ownerEmail: $ownerEmail
    ) {
      _id
      driverId
      driverName
      driverEmail
      listingId
      ownerId
      ownerName
      ownerEmail
      address
      images
      start
      end
      status
      profileCategory
      vehicle
      payment
      paymentMethod
      createdAt
      qrCode
      spaceLabel
    }
  }
`;

const GET_DRIVER_BOOKINGS = gql`
  query GetDriverBookings($driverId: String!) {
    getDriverBookings(driverId: $driverId) {
      _id
      driverId
      driverName
      driverEmail
      listingId
      ownerId
      ownerName
      ownerEmail
      address
      images
      start
      end
      payment
      paymentMethod
      vehicle
      profileCategory
      status
      createdAt
      qrCode
      spaceLabel
    }
  }
`;

const checkIn_SUBSCRIPTION = gql`
  subscription CheckIn($driverId: String) {
    checkIn(driverId: $driverId) {
      _id
      driverId
      driverName
      driverEmail
      listingId
      ownerId
      ownerName
      ownerEmail
      address
      images
      start
      end
      payment
      paymentMethod
      vehicle
      profileCategory
      status
      createdAt
      qrCode
      spaceLabel
    }
  }
`;

const MyBookings = ({
  loading,
  bookings,
  updateBookingLocal,
  userId,
  loadUserBookings,
  toggleLoading
}) => {
  // const [deleteBooking] = useMutation(DELETE_BOOKING);

  const [updateBookingStatus] = useMutation(UPDATE_BOOKING);
  const [status, setStatus] = useState('upcoming');
  const [current, setCurrent] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [cancelled, setCancelled] = useState([]);

  const { data: checkInSub } = useSubscription(checkIn_SUBSCRIPTION, {
    variables: { driverId: userId }
  });

  useEffect(() => {
    if (checkInSub) {
      // addNewMessage(checkInSub.checkInSub);
      // console.log("checkInSub = ", checkInSub.checkIn);
      if (checkInSub.checkIn.status === 'current') {
        // alert('Check In Successful');
        setCurrent([...current, checkInSub.checkIn]);
        setUpcoming(upcoming.filter((item) => item._id !== checkInSub.checkIn._id));
      } else if (checkInSub.checkIn.status === 'completed') {
        // alert('Check Out Successful');
        setCompleted([...current, checkInSub.checkIn]);
        setCurrent(upcoming.filter((item) => item._id !== checkInSub.checkIn._id));
      }
    }
  }, [checkInSub]);

  useEffect(() => {
    const getBookings = async () => {
      // props.dispatch(showLoading());
      toggleLoading();
      client
        .query({
          query: GET_DRIVER_BOOKINGS,
          variables: { driverId: userId }
        })
        .then(({ data }) => {
          // setAllRooms(data.getAllRooms);
          if (data.getDriverBookings) {
            let bkgs = data.getDriverBookings;
            // console.log(data.getDriverBookings);
            loadUserBookings(data.getDriverBookings);

            let b = bkgs.map((item) => {
              if (item.status === 'upcoming' && new Date() > new Date(item.start)) {
                let response = null;
                updateBookingStatus({
                  variables: {
                    id: item._id,
                    status: 'completed',
                    driverEmail: item.driverEmail,
                    ownerEmail: item.ownerEmail
                  }
                }).then((res) => {
                  response = res;
                });

                if (response) {
                  // console.log(
                  //   "updated booking status :",
                  //   response.data.updateBookingStatus
                  // );
                  updateBookingLocal(response.data.updateBookingStatus);
                  return response.data.updateBookingStatus;
                }
              } else {
                return item;
              }
            });

            // console.log("bookings :", b);
            setUpcoming(b.filter((item) => item.status === 'upcoming'));
            setCurrent(b.filter((item) => item.status === 'current'));
            setCompleted(b.filter((item) => item.status === 'completed'));
            setCancelled(b.filter((item) => item.status === 'cancelled'));
          }
          // props.dispatch(hideLoading());
        })
        .catch((err) => {
          // console.log(err);
          toggleLoading();
          // props.dispatch(hideLoading());
        });
    };

    getBookings();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <DriverContainer>
      <div className="dg__account my-bookings-container">
        <div className="heading-bar">
          <h1 className="heading">My Bookings</h1>
          <Link href="/parkings">
            <Button variant="primary">Find Parking</Button>
          </Link>
        </div>
        <Tabs activeKey={status} onSelect={(value) => setStatus(value)}>
          <Tab eventKey="current" title="Current">
            {current.length > 0 ? (
              current.map((item) => (
                <MyBookingItem
                  {...item}
                  bookingData={item}
                  setUpcoming={setUpcoming}
                  upcoming={upcoming}
                  tabStatus="current"
                />
              ))
            ) : (
              <div className="loading">No Current Bookings!</div>
            )}
          </Tab>
          <Tab eventKey="upcoming" title="Upcoming">
            {upcoming.length > 0 ? (
              upcoming.map((item) => (
                <MyBookingItem
                  {...item}
                  bookingData={item}
                  setUpcoming={setUpcoming}
                  upcoming={upcoming}
                  setCancelled={setCancelled}
                  cancelled={cancelled}
                  tabStatus="upcoming"
                />
              ))
            ) : (
              <div className="loading">No Upcoming Bookings!</div>
            )}
          </Tab>
          <Tab eventKey="completed" title="Completed">
            {completed.length > 0 ? (
              completed.map((item) => <MyBookingItem {...item} tabStatus="completed" />)
            ) : (
              <div className="loading">No Completed Bookings!</div>
            )}
          </Tab>
          <Tab eventKey="cancelled" title="Cancelled">
            {cancelled.length > 0 ? (
              cancelled.map((item) => (
                <MyBookingItem {...item} bookingData={item} tabStatus="cancelled" />
              ))
            ) : (
              <div className="loading">No Cancelled Bookings!</div>
            )}
          </Tab>
        </Tabs>
      </div>
    </DriverContainer>
  );
};

const mapStateToProps = ({ user, auth }) => ({
  bookings: user.bookings,
  loading: user.loading,
  userId: auth.data.attributes.sub
});

export default connect(mapStateToProps, {
  updateBookingLocal,
  toggleLoading,
  loadUserBookings
})(MyBookings);
