import React, { useState, useEffect } from "react";
import { Tab, Tabs, Card, Spinner } from "react-bootstrap";
import { gql } from "@apollo/client";
import { client } from "../../graphql/index";
import moment from "moment";

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

const BookingDetail = (props) => {
  const [booking, setBooking] = useState({
    loading: false,
    booking: null,
    error: false,
  });
  const getBooking = async () => {
    try {
      setBooking({ ...booking, loading: true });
      const { data } = await client.query({
        query: GET_BOOKING,
        variables: { id: props.id },
      });
      console.log("getBooking ", data.getBooking);
      if (data.getBooking) {
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

  useEffect(() => {
    getBooking();
  }, []);

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
  if (booking.booking) {
    return (
      <div>
        <h4 className="mb-3">{booking.booking.address}</h4>
        <Tabs defaultActiveKey="details" id="uncontrolled-tab-example">
          <Tab eventKey="details" title="Details">
            <div className="more-info-btns">
              <Card>
                <Card.Body>
                  <div>Start Date</div>
                  <div className="text-parkyourself">
                    <b>
                      {moment(new Date(booking.booking.start)).format("lll")}
                    </b>
                  </div>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <div>End Date</div>
                  <div className="text-parkyourself">
                    <b>{moment(new Date(booking.booking.end)).format("lll")}</b>
                  </div>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <div>Driver Name</div>
                  <div className="text-parkyourself">
                    <b>{booking.booking.driverName}</b>
                  </div>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <div>Vechicle</div>
                  <div className="text-parkyourself">
                    <b>
                      {booking.booking.vehicle.make}{" "}
                      {booking.booking.vehicle.model}
                    </b>
                  </div>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <div>License Plate</div>
                  <div className="text-parkyourself">
                    <b>{booking.booking.vehicle.licensePlate}</b>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Tab>
          <Tab eventKey="payout" title="Payout Status">
            <div className="more-info-btns">
              <Card>
                <Card.Body>
                  <div>Payment Status</div>
                  <div className="text-parkyourself">
                    <b>Paid</b>
                  </div>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <div>Payment Receiving Date</div>
                  <div className="text-parkyourself">
                    <b>26 Novmber 2020</b>
                  </div>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <div>Booking Date</div>
                  <div className="text-parkyourself">
                    <b>
                      {moment(new Date(booking.booking.start)).format("lll")}
                    </b>
                  </div>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <div>Duration of Booking</div>
                  <div className="text-parkyourself">
                    <b>
                      {moment
                        .duration(
                          moment(booking.booking.end).diff(
                            moment(booking.booking.start)
                          )
                        )
                        .asHours()
                        .toFixed(1)}{" "}
                      Hours
                    </b>
                  </div>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <div>Booking Status</div>
                  <div className="text-parkyourself">
                    <b className="text-capitalize">{booking.booking.status}</b>
                  </div>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <div>Amount of Transaction</div>
                  <div className="text-parkyourself">
                    <b>${booking.booking.payment}</b>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
  return null;
};
export default BookingDetail;
