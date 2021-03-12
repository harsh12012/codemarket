import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { IoIosCard, IoIosStar, IoIosStarHalf } from 'react-icons/io';
import Link from 'next/link';
import placeholderImg from '../assets/images/placeholder-img.jpg';
import { MdKeyboardArrowRight } from 'react-icons/md';
import moment from 'moment';
import AddListingReviewModal from './AddListingReviewModal';
import AddOwnerReviewModal from './AddOwnerReviewModal';
import { client } from '../graphql';
import { gql, useMutation, useSubscription } from '@apollo/client';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { updateListingLocal } from '../redux/actions/user';
import StarRatings from 'react-star-ratings';
import CheckInTicketModal from './booking/CheckInTicketModal';
// import EarlyCheckInSuccessModal from "./EarlyCheckInSuccessModal";
import EarlyCheckInModal from './EarlyCheckInModal';

const GET_LISTING_REVIEWS = gql`
  query GetListingReviews($listingId: String!) {
    getListingReviews(listingId: $listingId) {
      _id
      listingId
      ownerId
      ownerName
      driverId
      driverName
      rating
      feedback
      createdAt
    }
  }
`;

const CREATE_LISTING_REVIEW = gql`
  mutation CreateListingReview(
    $listingId: String!
    $ownerId: String!
    $ownerName: String!
    $driverId: String!
    $driverName: String!
    $rating: Float!
    $feedback: String!
  ) {
    createListingReview(
      listingId: $listingId
      ownerId: $ownerId
      ownerName: $ownerName
      driverId: $driverId
      driverName: $driverName
      rating: $rating
      feedback: $feedback
    ) {
      _id
      listingId
      ownerId
      ownerName
      driverId
      driverName
      rating
      feedback
      createdAt
    }
  }
`;

const CREATE_OWNER_REVIEW = gql`
  mutation CreateOwnerReview(
    $ownerId: String!
    $ownerName: String!
    $driverId: String!
    $driverName: String!
    $rating: Float!
    $feedback: String!
  ) {
    createOwnerReview(
      ownerId: $ownerId
      ownerName: $ownerName
      driverId: $driverId
      driverName: $driverName
      rating: $rating
      feedback: $feedback
    ) {
      _id
      ownerId
      ownerName
      driverId
      driverName
      rating
      feedback
      createdAt
    }
  }
`;

const GET_LISTING = gql`
  query GetListing($id: ID!) {
    getListing(id: $id) {
      _id
      ownerId
      ownerName
      ownerEmail
      reviews
    }
  }
`;

const ADD_REVIEW_TO_LISTING = gql`
  mutation UpdateListing($id: ID!, $reviews: [ID]) {
    updateListing(id: $id, reviews: $reviews) {
      _id
      ownerId
      ownerEmail
      ownerName
      published
      locationDetails {
        listingType
        propertyType
        propertyName
        address
        city
        state
        country
        postalCode
        code
        phone
        marker {
          type
          coordinates
        }
        streetViewImages
        parkingEntranceImages
        parkingSpaceImages
        features
      }
      spaceDetails {
        parkingSpaceType
        qtyOfSpaces
        heightRestriction
        height1 {
          value
          unit
        }
        height2 {
          value
          unit
        }
        sameSizeSpaces
        largestSize
        motorcycle
        compact
        midsized
        large
        oversized
        motorcycleSpaces
        compactSpaces
        midsizedSpaces
        largeSpaces
        oversizedSpaces
        isLabelled
        spaceLabels {
          label
          largestSize
          isBooked
        }
        aboutSpace
        accessInstructions
      }
      spaceAvailable {
        scheduleType
        instantBooking
        monday {
          isActive
          startTime
          endTime
        }
        tuesday {
          isActive
          startTime
          endTime
        }
        wednesday {
          isActive
          startTime
          endTime
        }
        thursday {
          isActive
          startTime
          endTime
        }
        friday {
          isActive
          startTime
          endTime
        }
        saturday {
          isActive
          startTime
          endTime
        }
        sunday {
          isActive
          startTime
          endTime
        }
        customTimeRange
        noticeTime {
          value
          unit
        }
        advanceBookingTime {
          value
          unit
        }
        minTime {
          value
          unit
        }
        maxTime {
          value
          unit
        }
        instantBooking
      }
      pricingDetails {
        pricingType
        pricingRates {
          perHourRate
          perDayRate
          perWeekRate
          perMonthRate
        }
      }
      bookings
      reviews
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

const MyBookingItem = ({
  tabStatus,
  cancelled,
  setCancelled,
  setUpcoming,
  upcoming,
  bookingData,
  _id,
  listingId,
  ownerId,
  ownerEmail,
  ownerName,
  driverId,
  driverName,
  driverEmail,
  address,
  images,
  start,
  end,
  payment,
  vehicle,
  status,
  spaceLabel,
  profileCategory,
  userData,
  updateListingLocal
}) => {
  const [createListingReview] = useMutation(CREATE_LISTING_REVIEW);
  const [createOwnerReview] = useMutation(CREATE_OWNER_REVIEW);
  const [updateListing] = useMutation(ADD_REVIEW_TO_LISTING);
  const [updateBooking] = useMutation(UPDATE_BOOKING);
  const [disabled, setDisabled] = useState(false);
  const [canceling, setCanceling] = useState(false);

  const [showListingReviewModal, setShowListingReviewModal] = useState(false);
  const [showOwnerReviewModal, setShowOwnerReviewModal] = useState(false);

  const [listing, setListing] = useState(null);
  const [rating, setRating] = useState(0);

  const [showCheckInTicketModal, setShowCheckInTicketModal] = useState(false);
  const [showEarlyCheckInModal, setShowEarlyCheckInModal] = useState(false);
  const [showLateCheckOutModal, setShowLateCheckOutModal] = useState(false);

  const addListingReviewHandler = async (data) => {
    try {
      // console.log(listing, _id);
      if (listing != null) {
        if (listing.reviews.includes(_id)) {
          toast.warn('Review Already Added!');
          return;
        }
      }

      const response = await createListingReview({
        variables: {
          listingId: listingId,
          ownerId: ownerId,
          ownerName: ownerName,
          driverId: userData.sub,
          driverName: userData.name,
          rating: data.rating,
          feedback: data.feedback,
          date: new Date().toString()
        }
      });
      // console.log(response.data.createListingReview);

      const response2 = await updateListing({
        variables: {
          id: listingId,
          reviews: [...listing.reviews, response.data.createListingReview._id]
        }
      });

      // console.log(response2.data.updateListing);

      updateListingLocal(response2.data.updateListing);

      toast.success('Review Added Successfully');
    } catch (error) {
      toast.warn('Something Went Wrong!');
      // console.log(error);
    }
  };

  const addOwnerReviewHandler = async (data) => {
    try {
      // console.log(listing._id);

      const response = await createOwnerReview({
        variables: {
          ownerId: ownerId,
          ownerName: listing.ownerName,
          driverId: userData.sub,
          driverName: userData.name,
          rating: data.rating,
          feedback: data.feedback,
          date: new Date().toString()
        }
      });
      // console.log(response.data.createOwnerReview);
      toast.success('Review Added Successfully');
    } catch (error) {
      toast.warn('Something Went Wrong!');
      // console.log(error);
    }
  };

  const checkIfAdded = () => {
    if (listing) {
      if (listing.reviews.includes(_id)) {
        return true;
      }
    } else return false;
  };

  useEffect(() => {
    client
      .query({
        query: GET_LISTING,
        variables: { id: listingId }
      })
      .then(({ data }) => {
        // console.log(data.getListing);
        setListing(data.getListing);
      })
      .catch((err) => {
        // console.log(err);
      });

    client
      .query({
        query: GET_LISTING_REVIEWS,
        variables: { listingId: listingId }
      })
      .then(({ data }) => {
        if (data.getListingReviews) {
          if (data.getListingReviews.length == 0) {
            setRating(0);
          } else {
            let sum = 0;
            data.getListingReviews.forEach((item) => {
              sum += item.rating;
            });
            // console.log("rating :", sum / data.getListingReviews.length);
            setRating(sum / data.getListingReviews.length);
          }
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  const earlyCheckInHandler = async () => {
    try {
      handleEarlyCheckIn({ id: _id, start: new Date(), end: end });
      setShowEarlyCheckInModal(false);
      setShowEarlyCheckInSuccessModal(true);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleCancelBooking = async () => {
    try {
      setDisabled(true);
      setCanceling(true);
      const { data } = await updateBooking({
        variables: {
          id: _id,
          status: 'cancelled',
          driverEmail: driverEmail,
          ownerEmail: ownerEmail,
          driverId: driverId
        }
      });
      // console.log('data.updateBookingStatus ', data);
      setUpcoming(upcoming.filter((u) => u._id !== data.updateBookingStatus._id));
      setCancelled([...cancelled, data.updateBookingStatus]);
      setDisabled(false);
      setCanceling(false);
    } catch (error) {
      alert('Something went wrong!');
      // console.log("handleCancelBooking error", error);
      setDisabled(false);
      setCanceling(false);
    }
  };

  return (
    <div className="listing-item row">
      <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12 listing-img">
        {/* {streetViewImages.length > 0 ? (
          <img src={streetViewImages[0]} />
        ) : parkingEntranceImages.length>0?<img src={parkingEntranceImages[0]} />:parkingSpaceImages.length>0?<img src={parkingSpaceImages[0]} />: (
          <img src={placeholderImg} />
        )} */}

        <img src={images.length > 0 ? images[0] : placeholderImg} />
      </div>
      <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-xs-12 listing-content">
        <div className="top row">
          <h4 className="col-10">{address}</h4>
          <div className="tag col-2">
            {profileCategory === 'personal' ? 'Personal' : 'Business'}
          </div>
        </div>

        <div className="booking-count">
          {moment(new Date(start)).format('lll')} to {moment(new Date(end)).format('lll')}
        </div>

        <div className="listing-btn-row">
          <div className="card-number">
            <IoIosCard
              style={{
                fontSize: '20px',
                color: '#000',
                marginRight: '10px'
              }}
            />{' '}
            ${payment}
          </div>
          <Link href={`/parkings/${listingId}`}>
            <Button variant="primary" disabled={disabled}>
              More Details
            </Button>
          </Link>
          <Link href={{ pathname: `/reviews/${listingId}` }}>
            <Button variant="outline-primary" className="review-btn">
              <StarRatings
                rating={rating}
                starRatedColor="yellow"
                numberOfStars={5}
                name="rating"
                isAggregateRating={true}
              />
              {listing ? listing.reviews.length : 'No Reviews'}
              <MdKeyboardArrowRight className="arrow-right" />
            </Button>
          </Link>
          {tabStatus === 'completed' && (
            <>
              <Button
                variant="outline-success"
                disabled={checkIfAdded()}
                onClick={() => {
                  setShowListingReviewModal(true);
                }}>
                Rate Space
              </Button>
              <Link
                href={{
                  pathname: `messages/${listingId}`,
                  query: { driverId: driverId }
                }}>
                <Button variant="outline-dark">Chat with Owner</Button>
              </Link>
              <Button
                variant="outline-success"
                disabled={checkIfAdded()}
                onClick={() => {
                  setShowOwnerReviewModal(true);
                }}>
                Rate Owner
              </Button>
              <AddListingReviewModal
                show={showListingReviewModal}
                address={address}
                handleClose={() => {
                  setShowListingReviewModal(false);
                }}
                handleSave={addListingReviewHandler}
              />
              {listing && (
                <AddOwnerReviewModal
                  show={showOwnerReviewModal}
                  ownerName={listing.ownerName}
                  handleClose={() => {
                    setShowOwnerReviewModal(false);
                  }}
                  handleSave={addOwnerReviewHandler}
                />
              )}
            </>
          )}
        </div>
        <div className="listing-btn-row">
          {(tabStatus === 'current' || tabStatus === 'upcoming') && (
            <>
              <Button
                variant="outline-success"
                onClick={() => {
                  setShowCheckInTicketModal(true);
                }}
                disabled={disabled}>
                Ticket
              </Button>
              {tabStatus === 'upcoming' && new Date() < new Date(start) && (
                <>
                  <Button
                    variant="outline-success"
                    onClick={() => {
                      setShowEarlyCheckInModal(true);
                    }}
                    disabled={disabled}>
                    Early Check-In
                  </Button>
                  <EarlyCheckInModal
                    bookingData={bookingData}
                    show={showEarlyCheckInModal}
                    handleClose={() => {
                      setShowEarlyCheckInModal(false);
                    }}
                    address={address}
                    handleSave={earlyCheckInHandler}
                    start={new Date()}
                    end={new Date(start)}
                    profileType={profileCategory}
                    listingId={listingId}
                    setUpcoming={setUpcoming}
                    upcoming={upcoming}
                    heading="Early Check-In"
                    endDisabled={true}
                  />
                </>
              )}
              {new Date() < new Date(end) && (
                <>
                  <Button
                    variant="outline-success"
                    onClick={() => setShowLateCheckOutModal(true)}
                    disabled={disabled}>
                    Late Check-Out
                  </Button>
                  <EarlyCheckInModal
                    bookingData={bookingData}
                    show={showLateCheckOutModal}
                    handleClose={() => {
                      setShowLateCheckOutModal(false);
                    }}
                    address={address}
                    start={new Date(end)}
                    end={new Date(new Date(new Date(end)).setHours(new Date(end).getHours() + 2))}
                    profileType={profileCategory}
                    listingId={listingId}
                    setUpcoming={setUpcoming}
                    upcoming={upcoming}
                    heading="Late Check-Out"
                    startDisabled={true}
                  />
                </>
              )}
              {tabStatus === 'upcoming' && (
                <>
                  <Button
                    variant="outline-danger"
                    onClick={handleCancelBooking}
                    disabled={disabled}>
                    {canceling ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      'Cancel Booking'
                    )}
                  </Button>
                </>
              )}
              <CheckInTicketModal
                id={_id}
                show={showCheckInTicketModal}
                handleClose={() => {
                  setShowCheckInTicketModal(false);
                }}
                bookingData={{ start, end, vehicle: null }}
                address={address}
                driverId={driverId}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  userData: auth.data.attributes
});

export default connect(mapStateToProps, { updateListingLocal })(MyBookingItem);
