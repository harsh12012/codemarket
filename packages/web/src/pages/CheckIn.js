import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import dynamic from "next/dynamic";
import { gql, useMutation } from "@apollo/client";
import { client } from "../app/graphql";
import { toast } from "react-toastify";
import moment from "moment";
import { HiArrowRight } from "react-icons/hi";
import { RiCameraSwitchFill } from "react-icons/ri";
// import QrReader from 'react-qr-reader'
const QrReader = dynamic(() => import("react-qr-reader"), {
  ssr: false,
});

const GET_BOOKING = gql`
  query GetBooking($id: String!) {
    getBooking(id: $id) {
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
    }
  }
`;

const get_Vehicle = gql`
  query GetVehicle($id: ID!) {
    getVehicle(id: $id) {
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
    }
  }
`;

const UPDATE_BOOKING = gql`
  mutation UpdateBookingStatus(
    $id: String!
    $status: String!
    $driverEmail: String!
    $ownerEmail: String!
    $driverId: String
  ) {
    updateBookingStatus(
      id: $id
      status: $status
      driverEmail: $driverEmail
      ownerEmail: $ownerEmail
      driverId: $driverId
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
    }
  }
`;

const CheckIn = () => {
  const [updateBooking] = useMutation(UPDATE_BOOKING);

  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [camera, setCamera] = useState("user");
  // const [booking, setBooking] = useState(null);
  const [booking, setBooking] = useState({
    loading: false,
    booking: null,
    error: false,
  });
  const [scanData, setScanData] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleError = (err) => {
    alert("Something went wrong while scaning please try again");
  };

  const toggleCameraType = () => {
    if (camera == "user") {
      setCamera("environment");
    } else {
      setCamera("user");
    }
  };

  const handleScan = (bookingId) => {
    if (bookingId) {
      // setScanData(bookingId);
      getBooking(bookingId);
    }
  };

  const getBooking = async (bookingId) => {
    try {
      setBooking({ ...booking, loading: true });
      const { data } = await client.query({
        query: GET_BOOKING,
        variables: { id: bookingId },
      });
      console.log("getBooking ", data.getBooking);
      if (
        (data.getBooking.status === "upcoming" ||
          data.getBooking.status === "current") &&
        new Date() < new Date(data.getBooking.end)
      ) {
        const { data: vehicle } = await client.query({
          query: get_Vehicle,
          variables: { id: data.getBooking.vehicle },
        });

        console.log("vehicle = ", vehicle.getVehicle);
        if (vehicle.getVehicle) {
          setBooking({
            ...booking,
            booking: { ...data.getBooking, vehicle: vehicle.getVehicle },
            loading: false,
            error: false,
          });
        }
      } else {
        setBooking({ booking: null, loading: false, error: true });
      }
    } catch (error) {
      console.log("getBooking error", error);
      setBooking({ booking: null, loading: false, error: true });
    }
  };

  // useEffect(() => {
  //   if (scanData) {
  //     console.log("scanData ==", scanData);
  //     getBooking(scanData);
  //   }
  // }, [scanData]);

  const checkIn = async (status) => {
    try {
      setDisabled(true);
      const { data } = await updateBooking({
        variables: {
          id: booking.booking._id,
          status: status,
          driverEmail: booking.booking.driverEmail,
          ownerEmail: booking.booking.ownerEmail,
          driverId: booking.booking.driverId,
        },
      });
      setDisabled(false);
      alert(
        `Check ${
          booking.booking.status === "upcoming" ? "In" : "Out"
        } successful`
      );
      setBooking({
        booking: null,
        loading: false,
        error: false,
      });
      setScanData(null);
    } catch (error) {
      setDisabled(false);
      alert("Something went wrong please try again");
      console.log("Checkin error", error);
    }
  };

  if (booking.loading) {
    return (
      <div className="text-center">
        <h1 className="heading">Getting booking details...</h1>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (booking.error) {
    return (
      <div className="text-center">
        <h1 className="heading">
          Invalid QR Code or The booking has been expired
        </h1>
        <Button
          variant="primary"
          onClick={() => {
            setBooking({
              ...booking,
              booking: null,
              error: false,
            });
            setScanData(null);
          }}
        >
          Scan Again
        </Button>
      </div>
    );
  }

  if (booking.booking) {
    return (
      <div className="text-center">
        {/* <h1 className="heading">{booking.booking.address}</h1> */}
        <div className="parking-ticket">
          <h5 className="address">{booking.booking.address}</h5>
          <div className="booking-time mb-2">
            <div className="arrive">
              <p className="description">Arrive after</p>
              <h6> {moment(new Date(booking.booking.start)).format("ll")}</h6>
              <h6>{moment(new Date(booking.booking.start)).format("LT")}</h6>
            </div>
            <HiArrowRight className="right-arrow" />
            <div className="arrive">
              <p className="description">Exit before</p>
              <h6> {moment(new Date(booking.booking.end)).format("ll")}</h6>
              <h6>{moment(new Date(booking.booking.end)).format("LT")}</h6>
            </div>
          </div>
          <div>
            <span>
              Car :
              <b>
                {" "}
                {`${booking.booking.vehicle.make} ${booking.booking.vehicle.model} ${booking.booking.vehicle.year}`}
              </b>
            </span>
            <br />
            <span>
              License Plate :<b> {booking.booking.vehicle.licensePlate}</b>
            </span>
            <br />
            <span>
              Driver Name : <b> {booking.booking.driverName}</b>
            </span>
            <br />
            <span>
              Driver Email : <b> {booking.booking.driverEmail}</b>
            </span>
          </div>
        </div>
        {(true || new Date() > new Date(booking.booking.start)) && (
          <Button
            variant="primary"
            style={{ pointerEvents: disabled ? "none" : "auto" }}
            onClick={() =>
              checkIn(
                booking.booking.status === "upcoming" ? "current" : "completed"
              )
            }
          >
            {disabled ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : booking.booking.status === "upcoming" ? (
              "Check In"
            ) : (
              "Check Out"
            )}
          </Button>
        )}

        <Button
          variant="warning"
          className="ml-3"
          style={{ pointerEvents: disabled ? "none" : "auto" }}
          onClick={() => {
            setBooking({
              ...booking,
              booking: null,
              error: false,
            });
            setScanData(null);
          }}
        >
          Scan Again
        </Button>
      </div>
    );
  }

  return (
    <div className="dg__account">
      <h1 className="heading text-center">Scan a parking Ticket</h1>
      <div className="text-center mb-3">
        <RiCameraSwitchFill
          size={45}
          className="cursor-pointer"
          onClick={toggleCameraType}
        />
        {/* <Button variant="primary" onClick={toggleCameraType}>
          Flip Camera
        </Button>{" "} */}
        {/* <Button
          variant="primary"
          onClick={() => handleScan("5faaed2037892e0009ecb0c2")}
        >
          Scan
        </Button> */}
      </div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
        className="qr-code-reader"
        facingMode={camera}
      />
    </div>
  );
};

export default CheckIn;
