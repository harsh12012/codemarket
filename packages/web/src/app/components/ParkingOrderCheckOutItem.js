import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import { gql, useMutation } from '@apollo/client';
import { client } from '../graphql';
import placeholderImg from '../assets/images/placeholder-img.jpg';
import { connect } from 'react-redux';
import AddMoreTimeModal from './AddMoreTimeModal';

const GET_VEHICLE = gql`
  query GetVehicle($id: ID!) {
    getVehicle(id: $id) {
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
      driverId
      driverName
      driverEmail
      listingId
      ownerId
      ownerName
      ownerEmail
      address
      images
      startTime
      startDate
      endTime
      endDate
      status
      profileCategory
      vehicle
      payment
      paymentMethod
      createdAt
      qrCode
    }
  }
`;

const ParkingOrderCheckOutItem = ({
  _id,
  start,
  end,
  driverName,
  createdAt,
  vehicle,
  driverEmail,
  ownerEmail,
  address,
  updateCurrentBookings,
  role,
  handleLateCheckout
}) => {
  const [updateBooking] = useMutation(UPDATE_BOOKING);
  const [vehicleData, setVehicleData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showCheckoutSuccessModal, setShowCheckoutSuccessModal] = useState(false);
  const [showAddTimeModal, setShowAddTimeModal] = useState(false);

  const handleCheckOut = () => {
    try {
      let response = updateBooking({
        variables: {
          id: _id,
          status: 'completed',
          driverEmail: driverEmail,
          ownerEmail: ownerEmail
        }
      });
      setSuccess(true);
      setShowCheckoutSuccessModal(true);
      // updateCurrentBookings(_id);
    } catch (error) {
      console.log(error);
      setSuccess(false);
    }
  };

  useEffect(() => {
    client
      .query({ query: GET_VEHICLE, variables: { id: vehicle } })
      .then(({ data }) => {
        if (data.getVehicle) {
          console.log(data.getVehicle);
          setVehicleData(data.getVehicle);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    vehicleData && (
      <Card className="parking-order-item">
        <Card.Body>
          <div className="order-content">
            <div className="order-details">
              <p className="lead">Guest : {driverName}</p>
              <p className="from-to-date">
                {moment(start).format('lll')} to {moment(end).format('lll')}
              </p>
              <p className="description">
                Vehicle : {vehicleData.make} {vehicleData.model} {vehicleData.licensePlate}
              </p>
            </div>
            <div className="meta-details">
              {/* <p className="description">{moment(createdAt).fromNow()}</p> */}
              <div className="vehicle-img">
                <img src={vehicleData.image ? vehicleData.image : placeholderImg} />
              </div>
            </div>
          </div>
          <div className="btn-row">
            {(role === 'admin' ||
              role === 'manager' ||
              role === 'valet' ||
              role === 'attendant' ||
              role === 'staff') && (
              <Button variant="primary" onClick={handleCheckOut}>
                Check Out
              </Button>
            )}
            {(role === 'admin' ||
              role === 'manager' ||
              role === 'valet' ||
              role === 'attendant' ||
              role === 'staff') && (
              <>
                <Button
                  variant="primary"
                  onClick={() => {
                    setShowAddTimeModal(true);
                  }}>
                  Late Check Out
                </Button>
                <AddMoreTimeModal
                  show={showAddTimeModal}
                  handleClose={() => {
                    setShowAddTimeModal(false);
                  }}
                  _id={_id}
                  address={address}
                  start={start}
                  end={end}
                  handleLateCheckout={handleLateCheckout}
                />
              </>
            )}
          </div>
          <Modal
            show={showCheckoutSuccessModal}
            onHide={() => {
              setShowCheckoutSuccessModal(false);
            }}
            backdrop="static"
            keyboard={false}>
            <Modal.Header>
              <Modal.Title>
                {success ? 'Successful Check Out' : 'Unsuccessful Check Out'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="lead">
                {success
                  ? `The driver of location ${address} has checked out of the parking location.`
                  : `Failed to check out driver of location ${address}.Please Try Again.`}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => {
                  updateCurrentBookings(_id);
                  setShowCheckoutSuccessModal(false);
                }}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    )
  );
};

const mapStateToProps = ({ auth }) => ({
  role: auth.authenticated ? auth.data.attributes['custom:role'] : null
});

export default connect(mapStateToProps)(ParkingOrderCheckOutItem);
