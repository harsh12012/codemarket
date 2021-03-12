import React, { useEffect, useState } from 'react';
import { useCheckBookingAvailability } from '@parkyourself-frontend/shared/hooks/listings';
import { useCalculateAmount, useCreateBooking } from '@parkyourself-frontend/shared/hooks/bookings';
import { useStripeCreatePaymentIntentOffline } from '@parkyourself-frontend/shared/hooks/stripe';
import { addVehicleLocal } from '@parkyourself-frontend/shared/redux/actions/vehicle';
import { toggleProfileType } from '@parkyourself-frontend/shared/redux/actions/user';
import { ToggleLeft, ToggleRight } from 'react-feather';
import { connect } from 'react-redux';
import { ListGroup, Button, Form, Nav, Spinner } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { toast } from 'react-toastify';
import moment from 'moment';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import AddVehicleModal from '../app/components/AddVehicleModal';
import StartEndTimeModal from '../app/components/StartEndTimeModal';
import { clearSearchData, setSearchData } from '../app/redux/actions/findParking';
import { addBookingLocal, updateListingLocal } from '../app/redux/actions/user';
import { client } from '../app/graphql';
import BookingSuccessModal from '../app/components/BookingSuccessModal';
import ParkingTicketModal from '../app/components/ParkingTicketModal';
import ChooseVehicleModal from '../app/components/ChooseVehicleModal';
import CheckoutForm from '../app/components/stripe/CheckoutForm';
import SelectCardModal from '../app/components/manageCard/SelectCardModal';
import Loading from '../app/components/other/Loading';
import { useCRUDPromoCodes } from '@parkyourself-frontend/shared/hooks/promocode';

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
    $start: AWSDateTime
    $end: AWSDateTime
    $duration: Long!
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
      duration: $duration
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

const stripe_List_User_Cards = gql`
  query StripeListUserCards($driverId: String!, $type: String!) {
    stripeListUserCards(driverId: $driverId, type: $type)
  }
`;

const CHECK_PROMO_CODE = gql`
  query checkPromoCodeIsValid($code: String!, $listingId: String!) {
    checkPromoCode(code: $code, listingId: $listingId) {
      isValid
      discount
      id
    }
  }
`;

const BookNow = ({
  findParking,
  location,
  setSearchData,
  userData,
  clearSearchData,
  addBookingLocal,
  updateListingLocal,
  addVehicleLocal,
  profileType,
  toggleProfileType,
  match,
  id,
  listing
}) => {
  const {
    availabilityLoading,
    labels,
    availabile,
    error: labelsError
  } = useCheckBookingAvailability({
    id: listing._id,
    start: findParking.start,
    end: findParking.end,
    qtyOfSpaces: listing.spaceDetails.qtyOfSpaces,
    spaceAvailable: listing.spaceAvailable
  });

  const { amountCalculation, amountLoading } = useCalculateAmount({
    start: findParking.start,
    end: findParking.end,
    perHourRate: listing.pricingDetails.pricingRates.perHourRate
  });
  const { createIntentOffline } = useStripeCreatePaymentIntentOffline();

  const [createVehicle] = useMutation(CREATE_VEHICLE);
  const [createBooking] = useMutation(CREATE_BOOKING);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showChooseVehicleModal, setShowChooseVehicleModal] = useState(false);
  // const [showCreditCardModal, setShowCreditCardModal] = useState(false);
  const [showStartEndTimeModal, setShowStartEndTimeModal] = useState(false);
  const [showBookingSuccessModal, setShowBookingSuccessModal] = useState(false);
  const [showParkingTicketModal, setShowParkingTicketModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [useCard, setUseCard] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [cards, setCards] = useState([]);
  const [availability, setAvailability] = useState({
    available: false,
    loading: false,
    slot: 0,
    labels: []
  });

  const [bookingId, setBookingId] = useState('');

  // const { startTime, endTime } = findParking;

  const [bookingData, setBookingData] = useState({
    start: findParking.start,
    end: findParking.end,
    vehicle: '',
    spaceLabel: ''
  });

  const { start, end, vehicle, spaceLabel } = bookingData;
  //   console.log(location);

  // const address = 'hefhuhfhhrf';
  // const price = '3.20';
  // const images = [];

  const addNewVehicleHandler = async (data) => {
    try {
      const response = await createVehicle({
        variables: data
      });
      addVehicleLocal(response.data.createVehicle);
      setBookingData({ ...bookingData, vehicle: data });
      console.log(response.data.createVehicle);
      toast.success('Vehicle Added Successfully');
    } catch (error) {
      toast.warn('Something Went Wrong!');
    }
  };

  const addVehicleHandler = (data) => {
    // console.log(data);
    setBookingData({ ...bookingData, vehicle: data });
  };

  const changeTimingsHandler = (start, end) => {
    if (!validateTimings(start, end)) {
      // toast.warn('This Parking does not operate in given duration');
    } else {
      if (start && end) {
        setBookingData({
          ...bookingData,
          start: start,
          end: end
        });
        setSearchData({
          ...findParking,
          start: start,
          end: end
        });
        setShowStartEndTimeModal(false);
        // checkAvailability(start, end);
      }
    }
  };

  var diff = moment.duration(moment(end).diff(moment(start)));

  const getCardsList = async (type) => {
    setLoading(true);
    setCards([]);
    let tempCards = await client.query({
      query: stripe_List_User_Cards,
      variables: {
        driverId: userData.sub,
        type: type
      }
    });
    if (JSON.parse(tempCards.data.stripeListUserCards) !== null) {
      setCards(JSON.parse(tempCards.data.stripeListUserCards));
    }
    setLoading(false);
  };

  useEffect(() => {
    getCardsList(profileType);
  }, []);

  const changeProfileType = async (type) => {
    try {
      if (type === profileType) {
        return;
      }
      await toggleProfileType();
      if (type == 'personal') {
        toast.success('Switched to Personal Profile');
      } else {
        toast.success('Switched to Business Profile');
      }
    } catch (error) {
      toast.warn('Something Went Wrong!');
    }
  };
  const validateTimings = (start, end) => {
    return true;
  };
  const validateInputs = async () => {
    if (!validateTimings()) {
      alert('This Parking does not operate in given duration');
      return false;
    }
    // else if (listing.bookings.length === listing.spaceDetails.qtyOfSpaces) {
    //   alert("Parking Space is Full");
    //   return false;
    // }
    else {
      if (listing.spaceDetails.spaceLabels.length > 0 && !spaceLabel) {
        alert('Please select a space number');
        return false;
      } else {
        if (start && end && vehicle) {
          return true;
        } else {
          alert('Please select a vehicle');
          return false;
        }
      }
    }
  };

  const onSubmitHandler = async (paymentIntent, transferGroup) => {
    try {
      // console.log(startDate, startTime, endDate, endTime, vehicle);
      // if (startDate && startTime && endDate && endTime && vehicle) {
      const response1 = await createBooking({
        variables: {
          createdBy: userData.sub,
          driverId: userData.sub,
          driverName: userData.name,
          driverEmail: userData.email,
          listingId: id,
          ownerId: listing.ownerId,
          ownerName: listing.ownerName,
          ownerEmail: listing.ownerEmail,
          address: listing.locationDetails.address,
          images: [
            ...listing.locationDetails.streetViewImages,
            ...listing.locationDetails.parkingEntranceImages,
            ...listing.locationDetails.parkingSpaceImages
          ],
          start,
          end,
          duration: Date.parse(end) - Date.parse(start),
          payment: amountCalculation.totalAmount,
          ownerPayment: amountCalculation.amount,
          vehicle: vehicle._id,
          profileCategory: profileType,
          status: 'upcoming',
          paymentMethod: 'card',
          spaceLabel: spaceLabel,
          paymentIntent: paymentIntent,
          transferGroup: transferGroup
        }
      });

      addBookingLocal(response1.data.createBooking);

      setBookingId(response1.data.createBooking._id);

      clearSearchData();
      setShowBookingSuccessModal(true);
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
      const { data } = await createIntentOffline({
        payment_method: selectedCard.id,
        ownerId: listing.ownerId,
        amount: (amountCalculation.amount - (amountCalculation.amount * promoCodeState.discount)).toFixed(1),
        fee: amountCalculation.fee
      });
      if (
        data &&
        data.stripeCreatePaymentIntentOffline &&
        data.stripeCreatePaymentIntentOffline.secret === 'succeeded'
      ) {
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
      // console.log('error ', error);
      alert('Something went wrong');
    }
  };

  if (!listing) {
    return <div className="loading">Loading...</div>;
  }

  const { address } = listing.locationDetails;
  const images = [
    ...listing.locationDetails.streetViewImages,
    ...listing.locationDetails.parkingEntranceImages,
    ...listing.locationDetails.parkingSpaceImages
  ];

  //Promo Code State
  const [promoCodeState, setPromoCodeState] = useState({
    code: '',
    applied: false,
    discount: 0,
    discountId: null
  });
  const { checkPromoCodeIsValid } = useCRUDPromoCodes();

  const [checkPromoCode, { data, loading: promocodeLoading }] = useLazyQuery(CHECK_PROMO_CODE);

  useEffect(() => {
    console.log('outside');
    if (data && data.checkPromoCode) {
      if (data.checkPromoCode.isValid) {
        setPromoCodeState({
          ...promoCodeState,
          applied: true,
          discount: data.checkPromoCode.discount,
          discountId: data.checkPromoCode.id
        });
      } else {
        alert('Invalid Promo Code ');
        setPromoCodeState({
          ...promoCodeState,
          code: ''
        });
      }
    }
  }, [data]);

  return (
    <div className="dg__account">
      <h1 className="heading">{address}</h1>
      <div className="stars">
        <StarRatings
          rating={listing.ratingAverage}
          starRatedColor="yellow"
          numberOfStars={5}
          name="rating"
          isAggregateRating={true}
        />
        {listing && (
          <span style={{ marginLeft: '10px', fontSize: '18px' }}>{listing.ratingQuantity}</span>
        )}
      </div>

      {images.length > 0 && (
        <div className="detail-item">
          <img src={images[0]} className="parking-image" alt="parking-image" />
        </div>
      )}

      <div className="detail-item">
        <ListGroup>
          <ListGroup.Item>
            <p className="entity-label">Arriving</p>
            <div className="date-time">
              <p className="date-time-text">{moment(start).format('lll')}</p>
              <Button
                variant="outline-primary"
                onClick={() => {
                  setShowStartEndTimeModal(true);
                }}>
                Change
              </Button>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <p className="entity-label">Leaving</p>
            <div className="date-time">
              <p className="date-time-text">{moment(end).format('lll')}</p>
              <Button
                variant="outline-primary"
                onClick={() => {
                  setShowStartEndTimeModal(true);
                }}>
                Change
              </Button>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <p className="entity-label">Duration</p>
            <div className="date-time">
              <p className="date-time-text">
                {/* {diff1.days()>0 && `${diff1.days()} days`} {diff2.asHours()>0 && `${diff2.asHours().toFixed(1)} hours`} */}
                {diff.asHours().toFixed(1)} {diff.asHours() > 1 ? 'hours' : 'hour'}
              </p>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <p className="entity-label">Vehicle</p>
            <div className="date-time">
              <p className="date-time-text">
                {vehicle && `${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              </p>
              <Button
                variant="outline-primary"
                onClick={() => {
                  setShowChooseVehicleModal(true);
                }}>
                {vehicle ? 'Change' : 'Add'}
              </Button>
              <ChooseVehicleModal
                show={showChooseVehicleModal}
                handleClose={() => {
                  setShowChooseVehicleModal(false);
                }}
                handleSave={addVehicleHandler}
                addNewVehicle={() => {
                  setShowChooseVehicleModal(false);
                  setShowVehicleModal(true);
                }}
              />
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <p className="entity-label">Apply Promo Code</p>
            <div className="date-time">
              <Form.Control
                placeholder="PROMO CODE"
                value={promoCodeState.code}
                onChange={(event) =>
                  setPromoCodeState({
                    ...promoCodeState,
                    code: event.target.value
                  })
                }
                disabled={promoCodeState.applied}
              />
              {promoCodeState.applied ? (
                <Button
                  variant="danger"
                  onClick={() => {
                    setPromoCodeState({
                      code: '',
                      discount: 0,
                      discountId: null,
                      applied: false
                    });
                  }}>
                  Remove
                </Button>
              ) : (
                <Button
                  variant="outline-primary"
                  onClick={() =>
                    checkPromoCode({
                      variables: {
                        code: promoCodeState.code,
                        listingId: id
                      }
                    })
                  }>
                  Apply
                </Button>
              )}
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <p className="entity-label">Profile Category</p>
            <div className="profile-type">
              <Nav variant="pills" activeKey={profileType}>
                <Nav.Item>
                  <Nav.Link
                    eventKey="personal"
                    onClick={() => {
                      changeProfileType('personal');
                      getCardsList('personal');
                      setUseCard(false);
                    }}>
                    Personal
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="business"
                    onClick={() => {
                      changeProfileType('business');
                      getCardsList('business');
                      setUseCard(false);
                    }}>
                    Business
                  </Nav.Link>
                </Nav.Item>
              </Nav>{' '}
            </div>
          </ListGroup.Item>
          {listing.spaceDetails.spaceLabels.length > 0 && (
            <ListGroup.Item>
              <p className="entity-label">Select your space</p>
              <Form>
                {listing.spaceDetails.spaceLabels.map((item) => {
                  if (
                    availability.labels.length === 0 ||
                    availability.labels.indexOf(item.label) === -1
                  ) {
                    return (
                      <Form.Check
                        checked={spaceLabel === item.label}
                        inline
                        label={item.label}
                        type="radio"
                        disabled={item.isBooked}
                        onChange={() => {
                          setBookingData({
                            ...bookingData,
                            spaceLabel: item.label
                          });
                        }}
                      />
                    );
                  }
                })}
              </Form>
            </ListGroup.Item>
          )}
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
              {promoCodeState.applied && (
                <p>
                  <small>Discount Applied</small>
                </p>
              )}
              <p>
                <b>Total</b>
              </p>
            </p>
            <div className="date-time">
              {amountLoading ? (
                <Loading />
              ) : (
                <p className="date-time-text">
                  <p className="font-weight-normal">
                    <small>${amountCalculation.amount}</small>
                  </p>
                  <p className="font-weight-bold">
                    <small>${amountCalculation.tax}</small>
                  </p>
                  <p className="font-weight-bold">
                    <small>${amountCalculation.fee}</small>
                  </p>
                  {promoCodeState.applied && (
                    <p className="font-weight-bold">
                      <small>-${amountCalculation.amount * promoCodeState.discount}</small>
                    </p>
                  )}
                  <p>
                    $
                    {promoCodeState.applied
                      ? (
                          amountCalculation.totalAmount -
                          amountCalculation.amount * promoCodeState.discount
                        ).toFixed(1)
                      : amountCalculation.totalAmount}
                  </p>
                </p>
              )}
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
      <div className="pay-now-wrapper">
        {amountLoading || availabilityLoading ? (
          <Loading />
        ) : availabile ? (
          <>
            {useCard ? (
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
            ) : (
              <CheckoutForm
                ownerId={listing.ownerId}
                // driverName={userData.name}
                // driverId={userData.sub}
                amount={(
                  amountCalculation.totalAmount -
                  amountCalculation.amount * promoCodeState.discount
                ).toFixed(1)}
                fee={amountCalculation.fee}
                createBookingHandler={onSubmitHandler}
                validateInputs={validateInputs}
              />
            )}
            <p className="description">
              By making payment, you indicate your acceptance of our Terms & Conditions and Privacy
              Policy
            </p>
          </>
        ) : (
          <p className="description">
            <b>Sorry parking is full at this time slot</b>
          </p>
        )}
      </div>

      {listing && (
        <StartEndTimeModal
          show={showStartEndTimeModal}
          handleClose={() => {
            setShowStartEndTimeModal(false);
          }}
          scheduleType={listing.spaceAvailable.scheduleType}
          monday={listing.spaceAvailable.monday}
          tuesday={listing.spaceAvailable.tuesday}
          wednesday={listing.spaceAvailable.wednesday}
          thursday={listing.spaceAvailable.thursday}
          friday={listing.spaceAvailable.friday}
          saturday={listing.spaceAvailable.saturday}
          sunday={listing.spaceAvailable.sunday}
          customTimeRange={listing.spaceAvailable.customTimeRange}
          handleSave={changeTimingsHandler}
          start={start}
          end={end}
          // onChange={(start,end) => {
          //   setBookingData({ ...bookingData, start:start,end:end  });
          // }}
        />
      )}
      <AddVehicleModal
        show={showVehicleModal}
        handleClose={() => {
          setShowVehicleModal(false);
        }}
        handleSave={addNewVehicleHandler}
      />

      <BookingSuccessModal
        show={showBookingSuccessModal}
        handleClose={() => {
          setShowBookingSuccessModal(false);
        }}
        viewCodeHandler={() => {
          setShowBookingSuccessModal(false);
          setShowParkingTicketModal(true);
        }}
      />
      <ParkingTicketModal
        id={bookingId}
        show={showParkingTicketModal}
        handleClose={() => {
          setShowParkingTicketModal(false);
        }}
        bookingData={bookingData}
        address={address}
      />
    </div>
  );
};

const mapStateToProps = ({ findParking, auth, user }) => ({
  findParking,
  userData: auth.data.attributes,
  profileType: user.profileType
});

export default connect(mapStateToProps, {
  setSearchData,
  clearSearchData,
  addBookingLocal,
  updateListingLocal,
  addVehicleLocal,
  toggleProfileType
})(BookNow);
