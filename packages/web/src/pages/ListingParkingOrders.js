import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { client } from '../app/graphql';
import { Tab, Tabs } from 'react-bootstrap';
import ParkingOrderCheckInItem from '../app/components/ParkingOrderCheckInItem';
import ParkingOrderCheckOutItem from '../app/components/ParkingOrderCheckOutItem';
// import ScanQrModal from "../app/components/ScanQrModal";
import ORcodeModal from '../app/components/listings/ORcodeModal';
import { toast } from 'react-toastify';
import { useGetAllBookings, useUpdateBookingStatus } from '@parkyourself-frontend/shared/hooks/bookings';



const UPDATE_BOOKING = gql`
  mutation UpdateBooking($id: ID!, $start: String, $end: String, $profileCategory: String) {
    updateBooking(id: $id, start: $start, end: $end, profileCategory: $profileCategory) {
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
      spaceLabel
      createdAt
      qrCode
    }
  }
`;

const UPDATE_BOOKING_STATUS = gql`
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
      spaceLabel
      qrCode
    }
  }
`;

const UPDATE_TIMING = gql`
  mutation UpdateBooking($id: ID!, $start: String, $end: String) {
    updateBooking(id: $id, start: $start, end: $end) {
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
      spaceLabel
      createdAt
      qrCode
    }
  }
`;



const ListingParkingOrders = ({ id }) => {
  const [updateBooking] = useMutation(UPDATE_BOOKING);
  const [updateTiming] = useMutation(UPDATE_TIMING);
  const [updateBookingStatus] = useMutation(UPDATE_BOOKING_STATUS);
  const [key, setKey] = useState('checkin');
  const [upcoming, setUpcoming] = useState([]);
  const [current, setCurrent] = useState([]);
  const [showQrModal, setShowQrModal] = useState(false);

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);

  const {allData,loading} = useGetAllBookings({
    listingId:id,
    driverId:null,
    ownerId:null,
    status:"upcoming",
    screen:"staffOrders"

  })

 

  const updateUpcomingBookings = (id) => {

    let booking = upcoming.filter((item) => item._id === id)[0];
    console.log('update upcoming bookings :', id, booking);
    setUpcoming(upcoming.filter((item) => item._id !== id));
    setCurrent([...current, { ...booking, status: 'current' }]);

  };

  const updateCurrentBookings = (id) => {
    setCurrent(current.filter((item) => item._id !== id));
    setCheckoutSuccess(true);
    setShowCheckOutModal(true);
  };

  const updateBookingVehicle = (id, data) => {

    setUpcoming(upcoming.map((item) => (item._id === id ? { ...item, vehicle: data } : item)));
    
  };

  const updateBookingHandler = async (data) => {
    try {
      const response = await updateBooking({ variables: data });
      console.log(response.data.updateBooking);
      setUpcoming(
        upcoming.map((item) => (item._id === data.id ? { ...item, ...data, _id: data.id } : item))
      );
      toast.success('Booking Updated Successfully');
    } catch (error) {
      toast.warn('Error while updating Booking');
      console.log(error);
    }
  };

  const cancelBookingHandler = async (data) => {
    try {
      const response = await updateBookingStatus({ variables: data });
      console.log(response.data.updateBookingStatus);
      setUpcoming(upcoming.filter((item) => item._id !== data.id));
      toast.success('Booking Cancelled Successfully');
    } catch (error) {
      toast.warn('Error while Cancelling Booking');
      console.log(error);
    }
  };

  const lateCheckoutHandler = async (data) => {
    try {
      const response = await updateTiming({ variables: data });
      console.log(response.data.updateBooking);
      setCurrent(
        current.map((item) => (item._id === data.id ? { ...item, ...data, _id: data.id } : item))
      );
      toast.success('Additional Time added successfully');
    } catch (error) {
      toast.warn('Error while adding time');
      console.log(error);
    }
  };

  const earlyCheckInHandler = async (data) => {
    try {
      let result = await updateTiming({ variables: data });
      console.log(result.data.updateBooking);
      setUpcoming(
        upcoming.map((item) => (item._id === data.id ? { ...item, start: data.start } : item))
      );
    } catch (error) {
      toast.warn('Something Went Wrong');
      console.log(error);
    }
  };


  return (
    <div className="dg__account">
      <h1 className="heading">Parking Orders</h1>
      <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)}>
        <Tab eventKey="checkin" title="Check In">
          {allData.bookings.length > 0 ? (
            allData.bookings.map((item) => {
              console.log("item",item)
              return(
                <ParkingOrderCheckInItem
                {...item}
                onClickScan={() => {
                  setShowQrModal(true);
                }}
                updateBookingVehicle={updateBookingVehicle}
                updateBooking={updateBookingHandler}
                cancelBooking={cancelBookingHandler}
                handleEarlyCheckIn={earlyCheckInHandler}
              />
              )
            })
          ) : (
            <div className="loading">No Upcoming Bookings</div>
          )}
          <ORcodeModal
            show={showQrModal}
            handleClose={() => {
              setShowQrModal(false);
            }}
            // updateUpcomingBookings={updateUpcomingBookings}
          />
          {/* <ScanQrModal
            show={showQrModal}
            handleClose={() => {
              setShowQrModal(false);
            }}
            updateUpcomingBookings={updateUpcomingBookings}
          /> */}
        </Tab>
        <Tab eventKey="checkout" title="Check Out">
          {current.length > 0 ? (
            current.map((item) => (
              <ParkingOrderCheckOutItem
                {...item}
                updateCurrentBookings={updateCurrentBookings}
                handleLateCheckout={lateCheckoutHandler}
              />
            ))
          ) : (
            <div className="loading">No Current Bookings</div>
          )}

          {/* <Modal
        show={checkoutSuccess}
        onHide={()=>{setShowCheckoutModal(false)}}
      >
        <Modal.Header closeButton>
          <Modal.Title>{checkoutSuccess? 'Successful Check Out':'Unsuccessful Check Out'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="lead">{checkoutSuccess? `The driver of location ${address} has checked out of the parking location.`:`Failed to check out driver of location ${address}.Please Try Again.`}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>{setShowCheckoutModal(false)}}>
            OK
          </Button>
        </Modal.Footer>
      </Modal> */}
        </Tab>
      </Tabs>
    </div>
  );
};

export default ListingParkingOrders;
