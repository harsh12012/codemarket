import React, { useState, useEffect } from 'react';
import { Card, Modal, Button, Spinner, ListGroup } from 'react-bootstrap';
import StartEndDateTimePicker from './StartEndDateTimePicker';
import ParkingTicketModal from './ParkingTicketModal';
import moment from 'moment';
import { gql, useMutation } from '@apollo/client';
import { client } from '../graphql/index';
import { connect } from 'react-redux';
import CheckoutForm from './stripe/CheckoutForm';
import { ToggleLeft, ToggleRight } from 'react-feather';
import SelectCardModal from './manageCard/SelectCardModal';
import CheckInTicketModal from './booking/CheckInTicketModal';
import { addBookingLocal } from '../redux/actions/user';

const GET_LISTING = gql`
  query GetListing($id: ID!, $driverId: String!, $type: String!) {
    getListing(id: $id) {
      _id
      ownerId
      spaceDetails {
        qtyOfSpaces
      }
      pricingDetails {
        pricingRates {
          perHourRate
          perDayRate
          perWeekRate
          perMonthRate
        }
      }
    }
    stripeListUserCards(driverId: $driverId, type: $type)
  }
`;

const check_Booking_Availability = gql`
  query CheckBookingAvailability($listingId: String!, $start: String!, $end: String!) {
    checkBookingAvailability(listingId: $listingId, start: $start, end: $end)
  }
`;

const stripe_Create_Payment_Intent_Offline = gql`
  query StripeCreatePaymentIntentOffline(
    $payment_method: String!
    $driverId: String!
    $type: String!
    $ownerId: String!
    $amount: Float!
    $fee: Float!
  ) {
    stripeCreatePaymentIntentOffline(
      payment_method: $payment_method
      driverId: $driverId
      type: $type
      ownerId: $ownerId
      amount: $amount
      fee: $fee
    ) {
      id
      secret
      transferGroup
    }
  }
`;

const CREATE_BOOKING = gql`
  mutation CreateBooking(
    $createdBy: String
    $driverId: String
    $driverName: String
    $driverEmail: String
    $listingId: String
    $ownerId: String
    $ownerName: String
    $ownerEmail: String
    $address: String
    $images: [String]
    $start: String
    $end: String
    $status: String
    $profileCategory: String
    $vehicle: String
    $payment: Float
    $ownerPayment: Float
    $paymentMethod: String
    $spaceLabel: String
    $paymentIntent: String
    $transferGroup: String
  ) {
    createBooking(
      createdBy: $createdBy
      driverId: $driverId
      driverName: $driverName
      driverEmail: $driverEmail
      listingId: $listingId
      ownerId: $ownerId
      ownerName: $ownerName
      ownerEmail: $ownerEmail
      address: $address
      images: $images
      start: $start
      end: $end
      status: $status
      profileCategory: $profileCategory
      vehicle: $vehicle
      payment: $payment
      ownerPayment: $ownerPayment
      paymentMethod: $paymentMethod
      spaceLabel: $spaceLabel
      paymentIntent: $paymentIntent
      transferGroup: $transferGroup
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

const EarlyCheckInModal = ({
  heading,
  setUpcoming,
  upcoming,
  addBookingLocal,
  bookingData,
  show,
  handleClose,
  address,
  start,
  end,
  profileType,
  listingId,
  userData,
  endDisabled,
  startDisabled
}) => {
  const [createBooking] = useMutation(CREATE_BOOKING);
  const [validated, setValidated] = useState(false);

  const [startDT, setStartDT] = useState(start);
  const [endDT, setEndDT] = useState(end);
  const [diff, setDiff] = useState(
    moment
      .duration(moment(end).diff(moment(start)))
      .asHours()
      .toFixed(1)
  );
  const [listing, setListing] = useState(null);
  const [cards, setCards] = useState([]);
  const [showCardModal, setShowCardModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [useCard, setUseCard] = useState(false);
  const [totalPrice, setTotalPrice] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [availability, setAvailability] = useState({
    available: false,
    loading: false,
    slot: 0
  });

  const [bookingId, setBookingId] = useState('');
  const [showParkingTicketModal, setShowParkingTicketModal] = useState(false);

  const calculateDiff = (start, end) => {
    console.log('Date Change tempDiff : ');
    const tempDiff = moment
      .duration(moment(end).diff(moment(start)))
      .asHours()
      .toFixed(1);
    console.log('tempDiff : ', tempDiff);
    setDiff(tempDiff);
  };

  const onSaveHandler = () => {
    if (startDT && endDT) {
      console.log('start : ', startDT);
      console.log('end : ', endDT);
      // handleSave(startDT, endDT);
    }
  };

  const getTotalPrice = () => {
    if (listing) {
      return listing.pricingDetails.pricingRates.perHourRate * diff;
    } else {
      return 0;
    }
  };

  const getInitial = async () => {
    try {
      const { data } = await client.query({
        query: GET_LISTING,
        variables: {
          id: listingId,
          driverId: userData.sub,
          type: profileType
        }
      });
      console.log('data1. getInitial', data);
      if (data.getListing && data.stripeListUserCards) {
        setListing(data.getListing);
        if (JSON.parse(data.stripeListUserCards) !== null) {
          setCards(JSON.parse(data.stripeListUserCards));
        }
        // checkAvailability(data.checkBookingAvailability.length);
        // checkAvailability(startDT, endDT);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkAvailability = async (start, end, checkout) => {
    console.log('checkAvailability = listing', listing);
    try {
      if (!checkout) {
        setAvailability({ ...availability, loading: true });
      }
      let tempSlots = await client.query({
        query: check_Booking_Availability,
        variables: {
          listingId: listingId,
          start: start,
          end: end
        }
      });

      if (
        checkout &&
        listing.spaceDetails.qtyOfSpaces - tempSlots.data.checkBookingAvailability.length > 0
      ) {
        return true;
      } else {
        // console.log(
        //   "checkAvailability = tempSlots",
        //   tempSlots.data.checkBookingAvailability.length
        // );
        setAvailability({
          available:
            listing.spaceDetails.qtyOfSpaces - tempSlots.data.checkBookingAvailability.length > 0,
          slot: listing.spaceDetails.qtyOfSpaces - tempSlots.data.checkBookingAvailability.length,
          loading: false
        });

        return (
          listing.spaceDetails.qtyOfSpaces - tempSlots.data.checkBookingAvailability.length > 0
        );
      }
    } catch (error) {
      console.log('checkAvailability = error', error);
      setAvailability({ available: false, slot: 0, loading: false });
      return false;
    }
  };

  useEffect(() => {
    if (show) {
      getInitial();
    }
  }, [show]);

  useEffect(() => {
    if (listing) {
      checkAvailability(startDT, endDT);
    }
  }, [listing]);

  const validateInputs = async () => {
    const status = await checkAvailability(startDT, endDT, true);
    if (!status) {
      alert('Parking Space is Full at this time slot');
    }
    return status;
  };

  const onSubmitHandler = async (paymentIntent, transferGroup) => {
    try {
      // console.log(startDate, startTime, endDate, endTime, vehicle);
      // if (startDate && startTime && endDate && endTime && vehicle) {

      const response1 = await createBooking({
        variables: {
          ...bookingData,
          createdBy: userData.sub,
          status: 'upcoming',
          start: startDT,
          end: endDT,
          paymentIntent: paymentIntent,
          transferGroup: transferGroup,
          payment: parseFloat((getTotalPrice() + 1 + (getTotalPrice() * 0.029 + 0.3)).toFixed(2)),
          ownerPayment: parseFloat(getTotalPrice().toFixed(2))
        }
      });

      console.log(response1.data.createBooking);

      addBookingLocal(response1.data.createBooking);
      setUpcoming([...upcoming, response1.data.createBooking]);

      // const response2 = await updateListing({
      //   variables: {
      //     id: id,
      //     bookings: [...listing.bookings, response1.data.createBooking._id],
      //   },
      // });

      setBookingId(response1.data.createBooking._id);

      // console.log(response2.data.updateListing);
      // updateListingLocal(response2.data.updateListing);
      setShowParkingTicketModal(true);
    } catch (error) {
      alert('Something went Wrong', 'Please try again');
      console.log(error);
    }
  };

  const onSubmitHandlerCard = async () => {
    if (!(await validateInputs())) {
      return false;
    } else if (selectedCard === null) {
      return alert('Select card');
    }
    try {
      setDisabled(true);
      let { data } = await client.query({
        query: stripe_Create_Payment_Intent_Offline,
        variables: {
          payment_method: selectedCard ? selectedCard.id : null,
          driverId: userData.sub,
          type: profileType,
          ownerId: bookingData.ownerId, //"8e2783ed-f09d-48e8-8158-43e7d42c7378",
          amount: parseInt((getTotalPrice() + 1 + (getTotalPrice() * 0.029 + 0.3)) * 100),
          fee: parseInt(getTotalPrice())
        }
      });
      if (data.stripeCreatePaymentIntentOffline.secret === 'succeeded') {
        // alert("Payment was succesfull");
        // setDisabled(false);
        onSubmitHandler(
          data.stripeCreatePaymentIntentOffline.id,
          data.stripeCreatePaymentIntentOffline.transferGroup
        );
      } else {
        alert('Something went wrong please try again');
      }
      setDisabled(false);
    } catch (error) {
      setDisabled(false);
      console.log('error ', error);
      alert('Something went wrong');
    }
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose} className="faq-modal">
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <StartEndDateTimePicker
            start={startDT}
            end={endDT}
            endDisabled={endDisabled}
            startDisabled={startDisabled}
            onChange={(start, end) => {
              if (endDisabled) {
                setStartDT(start);
                calculateDiff(start, endDT);
                checkAvailability(start, endDT);
              } else if (startDisabled) {
                setEndDT(end);
                calculateDiff(startDT, end);
                checkAvailability(startDT, end);
              }
            }}
          />
        </div>
        {listing && (
          <div className=" ">
            {availability.loading ? (
              <p className="description text-center">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>{' '}
                Checking Availability
              </p>
            ) : availability.available ? (
              <>
                <p className="lead">
                  {diff} {diff > 1 ? 'hours' : 'hour'} early than the booked time.
                </p>
                {/* <p className="lead">
                  Additional cost for booking the location {address} now will be
                  :
                </p> */}
                <ListGroup className="mb-3">
                  {cards.length > 0 && (
                    <ListGroup.Item>
                      <p className="entity-label">Use Saved Card</p>
                      <div className="date-time">
                        <div>
                          {useCard ? (
                            <ToggleRight
                              className="cursor-pointer"
                              onClick={() => setUseCard(false)}
                              size={35}
                            />
                          ) : (
                            <ToggleLeft
                              className="cursor-pointer"
                              onClick={() => setUseCard(true)}
                              size={35}
                            />
                          )}
                        </div>
                      </div>
                    </ListGroup.Item>
                  )}

                  {useCard && (
                    <ListGroup.Item>
                      <p className="entity-label"></p>
                      <div className="date-time">
                        <div>
                          {selectedCard ? (
                            <span>
                              <span className="text-capitalize">{selectedCard.card.brand}</span>{' '}
                              {` **** **** **** ${selectedCard.card.last4}`}
                            </span>
                          ) : null}
                          <Button variant="outline-primary" onClick={() => setShowCardModal(true)}>
                            {selectedCard ? 'Change Card' : 'Select Card'}
                          </Button>
                          <SelectCardModal
                            cards={cards}
                            show={showCardModal}
                            handleClose={() => setShowCardModal(false)}
                            setSelectedCard={(card) => {
                              setSelectedCard(card);
                              setShowCardModal(false);
                            }}
                          />
                        </div>
                      </div>
                    </ListGroup.Item>
                  )}
                  {/* <ListGroup.Item>
                    <p className="entity-label">Payment</p>
                    <div className="date-time">
                      <p className="date-time-text">$ {getTotalPrice()}</p>
                    </div>
                  </ListGroup.Item> */}
                  <ListGroup.Item>
                    <p className="entity-label">
                      <p>
                        <small>Amount</small>
                      </p>
                      <p>
                        <small>Tax</small>
                      </p>
                      <p>
                        <small>Fee</small>
                      </p>
                      <p>
                        <b>Total</b>
                      </p>
                    </p>
                    <div className="date-time">
                      <p className="date-time-text">
                        <p className="font-weight-normal">
                          <small>${getTotalPrice().toFixed(2)}</small>
                        </p>
                        <p className="font-weight-bold">
                          <small>$1</small>
                        </p>
                        <p className="font-weight-bold">
                          <small>${(getTotalPrice() * 0.029 + 0.3).toFixed(2)}</small>
                        </p>
                        <p>${(getTotalPrice() + 1 + (getTotalPrice() * 0.029 + 0.3)).toFixed(2)}</p>
                      </p>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
                {useCard ? (
                  <div className="text-center">
                    <Button variant="primary" onClick={onSubmitHandlerCard}>
                      {disabled ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        `Book Now`
                      )}
                    </Button>
                  </div>
                ) : (
                  <CheckoutForm
                    ownerId={bookingData.ownerId}
                    // driverName={bookingData.driverName}
                    // driverId={bookingData.driverId}
                    amount={parseFloat(
                      ((getTotalPrice() + 1 + (getTotalPrice() * 0.029 + 0.3)) * 100).toFixed(2)
                    )}
                    fee={parseFloat(
                      (
                        (getTotalPrice() + 1 + (getTotalPrice() * 0.029 + 0.3)) *
                        100 *
                        0.15
                      ).toFixed(2)
                    )}
                    createBookingHandler={onSubmitHandler}
                    validateInputs={validateInputs}
                  />
                )}
                <p className="description text-center">
                  By making payment, you indicate your acceptance of our Terms & Conditions and
                  Privacy Policy
                </p>
              </>
            ) : (
              <p className="description">
                <b>Sorry parking is full at this time slot</b>
              </p>
            )}
          </div>
        )}
        <CheckInTicketModal
          id={bookingId}
          show={showParkingTicketModal}
          handleClose={() => {
            setShowParkingTicketModal(false);
            handleClose();
          }}
          bookingData={{ start, end, vehicle: null }}
          address={address}
          newTicket="New"
          // driverId={driverId}
        />
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = ({ auth }) => ({
  userData: auth.data.attributes
});

export default connect(mapStateToProps, { addBookingLocal })(EarlyCheckInModal);
