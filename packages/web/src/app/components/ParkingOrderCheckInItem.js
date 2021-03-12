import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import moment from "moment";
import { gql, useMutation } from "@apollo/client";
import { client } from "../graphql";
import AddVehicleModal from "./AddVehicleModal";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import EditBookingModal from "./EditBookingModal";
import EarlyCheckInModal from "./EarlyCheckInModal";
import EarlyCheckInSuccessModal from "./EarlyCheckInSuccessModal";
import Link from "next/link";
import { useUpdateBookingStatus } from "@parkyourself-frontend/shared/hooks/bookings";

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

const UPDATE_BOOKING = gql`
  mutation UpdateBooking($id: ID!, $vehicle: String) {
    updateBooking(id: $id, vehicle: $vehicle) {
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

const GET_LISTING = gql`
  query GetListing($id: ID!) {
    getListing(id: $id) {
      _id
      pricingDetails {
        pricingRates {
          perHourRate
        }
      }
    }
  }
`;

const ParkingOrderCheckInItem = ({
  _id,
  listingId,
  address,
  start,
  end,
  profileCategory,
  driverName,
  driverEmail,
  ownerEmail,
  createdAt,
  vehicle,
  onClickScan,
  role,
  updateBookingVehicle,
  updateBooking,
  cancelBooking,
  handleEarlyCheckIn,
}) => {
  const [createVehicle] = useMutation(CREATE_VEHICLE);
  const [updateVehicleForBooking] = useMutation(UPDATE_BOOKING);

  const [vehicleData, setVehicleData] = useState(null);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showEarlyCheckInModal, setShowEarlyCheckInModal] = useState(false);
  const [
    showEarlyCheckInSuccessModal,
    setShowEarlyCheckInSuccessModal,
  ] = useState(false);
  const [listing, setListing] = useState(null);

  // console.log("Date ",new Date()<new Date(start));

  const {updateBookingStatus} = useUpdateBookingStatus({
    id:null,
    driverEmail:driverEmail,
    ownerEmail:ownerEmail,
    driverI:driverId
  })

  const updateVehicleHandler = async (data) => {
    try {
      delete data["id"];
      const response = await createVehicle({
        variables: data,
      });
      setVehicleData(response.data.createVehicle);
      const response1 = await updateVehicleForBooking({
        variables: { id: _id, vehicle: response.data.createVehicle._id },
      });
      updateBookingVehicle(response.data.createVehicle._id);
      console.log(response1.data.updateBooking);
      console.log(response.data.createVehicle);
      toast.success("Driver Vehicle Updated Successfully");
    } catch (error) {
      toast.warn("Something Went Wrong!");
      console.log(error);
    }
  };

  const earlyCheckInHandler = async () => {
    try {
      handleEarlyCheckIn({ id: _id, start: new Date(), end: end });
      setShowEarlyCheckInModal(false);
      setShowEarlyCheckInSuccessModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBookingHandler = () => {
    cancelBooking({
      id: _id,
      status: "cancelled",
      driverEmail: driverEmail,
      ownerEmail: ownerEmail,
    });
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

    client
      .query({ query: GET_LISTING, variables: { id: listingId } })
      .then(({ data }) => {
        if (data.getListing) {
          console.log(data.getListing);
          setListing(data.getListing);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    vehicleData &&
    listing && (
      <Card className="parking-order-item">
        <Card.Body>
          <div className="order-content">
            <div className="order-details">
              <p className="lead">Guest : {driverName}</p>
              <p className="from-to-date">
                {moment(start).format("lll")} to {moment(end).format("lll")}
              </p>
              <p className="description">
                Vehicle : {vehicleData.make} {vehicleData.model}{" "}
                {vehicleData.licensePlate}
              </p>
            </div>
            <div className="meta-details">
              <p className="description">{moment(createdAt).fromNow()}</p>
              {(role === "admin" ||
                role === "manager" ||
                role === "valet" ||
                role === "attendant" ||
                role === "staff") && (
                // <Link href="/check-in">
                <Button variant="primary" onClick={onClickScan}>
                  Scan QR
                </Button>
                // </Link>
              )}
            </div>
          </div>
          <div className="btn-row">
            {(role === "admin" ||
              role === "manager" ||
              role === "valet" ||
              role === "attendant" ||
              role === "staff") &&
              new Date() < new Date(start) && (
                <>
                  {/* <Button
                    variant="primary"
                    onClick={() => {
                      setShowEarlyCheckInModal(true);
                    }}
                  >
                    Early Check-In
                  </Button> */}
                </>
              )}

            <Button variant="outline-primary">Manual Check-In</Button>
            {(role === "admin" ||
              role === "manager" ||
              role === "valet" ||
              role === "attendant" ||
              role === "staff") && (
              <>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    setShowVehicleModal(true);
                  }}
                >
                  Edit Vehicle
                </Button>
                <Button variant="outline-primary" onClick={() => {}}>
                  Change Assigned Space
                </Button>
              </>
            )}
            {(role === "admin" || role === "manager" || role === "staff") && (
              <>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    setShowBookingModal(true);
                  }}
                >
                  Edit Booking
                </Button>
                <Button variant="outline-danger" onClick={cancelBookingHandler}>
                  Cancel Booking
                </Button>
              </>
            )}

            <AddVehicleModal
              show={showVehicleModal}
              edit={true}
              id={vehicleData._id}
              handleClose={() => {
                setShowVehicleModal(false);
              }}
              handleUpdate={updateVehicleHandler}
            />
            <EditBookingModal
              show={showBookingModal}
              id={_id}
              prevStart={start}
              prevEnd={end}
              profileType={profileCategory}
              handleUpdate={updateBooking}
              handleClose={() => {
                setShowBookingModal(false);
              }}
            />
            {/* <EarlyCheckInModal
              show={showEarlyCheckInModal}
              handleClose={() => {
                setShowEarlyCheckInModal(false);
              }}
              address={address}
              numOfHours={moment
                .duration(moment(start).diff(moment(new Date())))
                .asHours()
                .toFixed(1)}
              totalPrice={(
                moment
                  .duration(moment(start).diff(moment(new Date())))
                  .asHours() * listing.pricingDetails.pricingRates.perHourRate
              ).toFixed(2)}
              handleSave={earlyCheckInHandler}
            />
            <EarlyCheckInSuccessModal
              show={showEarlyCheckInSuccessModal}
              handleClose={() => {
                setShowEarlyCheckInSuccessModal(false);
              }}
              address={address}
              star={start}
              end={end}
            /> */}
          </div>
        </Card.Body>
      </Card>
    )
  );
};

const mapStateToProps = ({ auth }) => ({
  role: auth.authenticated ? auth.data.attributes["custom:role"] : null,
});

export default connect(mapStateToProps)(ParkingOrderCheckInItem);
