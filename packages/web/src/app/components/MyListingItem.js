import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useMutation, gql } from '@apollo/client';
import { connect } from 'react-redux';
import { getRole } from '@parkyourself-frontend/shared/utils/listing';
import { useRouter } from 'next/router';
import { deleteListingLocal, updateListingLocal } from '../redux/actions/user';
import placeholderImg from '../assets/images/placeholder-img.jpg';
import { loadUserListings } from '../redux/actions/user';
import { client } from '../graphql';

const PUBLISH_LISTING = gql`
  mutation UpdateListing($id: ID!, $published: Boolean) {
    updateListing(id: $id, published: $published) {
      _id
      bookingCount {
        total
      }
      bookings
      createdAt
      location {
        coordinates
        type
      }
      locationDetails {
        address
        city
        country
        code
        features
        listingType
        marker {
          coordinates
          type
        }
        parkingEntranceImages
        parkingSpaceImages
        phone
        postalCode
        propertyName
        propertyType
        state
        streetViewImages
        unitNum
      }
      ownerId
      ownerEmail
      ownerName
      pricingDetails {
        pricingRates {
          perDayRate
          perHourRate
          perMonthRate
          perWeekRate
        }
        pricingType
      }
      published
      spaceAvailable {
        advanceBookingTime {
          unit
          value
        }
        customTimeRange {
          startDate
          endDate
        }
        friday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        hasNoticeTime
        instantBooking
        maxTime {
          unit
          value
        }
        minTime {
          unit
          value
        }
        monday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        noticeTime {
          unit
          value
        }
        saturday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        scheduleType
        sunday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        thursday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        tuesday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        wednesday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
      }
      spaceDetails {
        aboutSpace
        accessInstructions
        compact
        compactSpaces
        height1 {
          unit
          value
        }
        height2 {
          unit
          value
        }
        heightRestriction
        isLabelled
        large
        largeSpaces
        largestSize
        midsized
        midsizedSpaces
        motorcycle
        motorcycleSpaces
        oversized
        oversizedSpaces
        parkingSpaceType
        qtyOfSpaces
        sameSizeSpaces
        spaceLabels {
          isBooked
          label
          largestSize
        }
      }
      thumbnail
    }
  }
`;

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id)
  }
`;

const stripe_Retrieve_Account = gql`
  query StripeRetrieveAccount($userId: String!) {
    stripeRetrieveAccount(userId: $userId)
  }
`;

const MyListingItem = ({
  listBy,
  _id,
  published,
  bookings,
  locationDetails,
  spaceDetails,
  spaceAvailable,
  pricingDetails,
  deleteListingLocal,
  updateListingLocal,
  listings,
  loadUserListings,
  userId,
  ownerId,
  staff
}) => {
  const router = useRouter();
  const [publishListing] = useMutation(PUBLISH_LISTING);
  const [deleteListing] = useMutation(DELETE_LISTING);
  const [disabled, updateDisabled] = useState(false);

  const {
    listingType,
    propertyType,
    propertyName,
    country,
    address,
    unitNum,
    city,
    state,
    postalCode,
    code,
    phone,
    marker,
    streetViewImages,
    parkingEntranceImages,
    parkingSpaceImages,
    features
  } = locationDetails;

  const {
    parkingSpaceType,
    qtyOfSpaces,
    heightRestriction,
    height1,
    height2,
    sameSizeSpaces,
    largestSize,
    motorcycle,
    compact,
    midsized,
    large,
    oversized,
    motorcycleSpaces,
    compactSpaces,
    midsizedSpaces,
    largeSpaces,
    oversizedSpaces,
    isLabelled,
    spaceLabels,
    aboutSpace,
    accessInstructions
  } = spaceDetails;

  const {
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    scheduleType,
    // startTime,
    // endTime,
    customTimeRange,
    noticeTime,
    advanceBookingTime,
    minTime,
    maxTime,
    instantBooking
  } = spaceAvailable;

  const { pricingType, pricingRates } = pricingDetails;

  const checkAllSpaceLabels = () => {
    var flag = true;
    spaceLabels.forEach((item) => {
      if (!item.label || !item.largestSize) {
        console.log('found invalid space label');
        flag = false;
      }
    });
    return flag;
  };

  const checkWithdrawalSettings = async () => {
    let { data } = await client.query({
      query: stripe_Retrieve_Account,
      variables: { userId: userId }
    });
    // .then(({data})=>{
    console.log('data :', data);
    if (data.stripeRetrieveAccount) {
      console.log('data :', data.stripeRetrieveAccount);
      let stripeData = JSON.parse(data.stripeRetrieveAccount);
      console.log(stripeData);
      if (!stripeData.details_submitted) {
        alert('Details not submitted');
        router.push('/withdrawal-settings');
        return false;
      } else {
        if (!stripeData.payouts_enabled) {
          alert('Please Update your Withdrawal Settings');
          router.push('/withdrawal-settings');
          return false;
        } else {
          return true;
        }
      }
    } else {
      alert('Withdrawal Settings not Set Up. Please Set it and Try again');
      router.push('/withdrawal-settings');
      return false;
    }
    // }).catch((error)=>{console.log(error);});
  };

  const checkTotalCount = () => {
    var flag = true;
    var sum = 0;
    if (motorcycle) {
      sum += parseInt(motorcycleSpaces);
    }
    if (compact) {
      sum += parseInt(compactSpaces);
    }
    if (midsized) {
      sum += parseInt(midsizedSpaces);
    }
    if (large) {
      sum += parseInt(largeSpaces);
    }
    if (oversized) {
      sum += parseInt(oversizedSpaces);
    }

    if (sum != qtyOfSpaces) {
      flag = false;
    }

    return flag;
  };

  const checkIfComplete = async () => {
    if (
      propertyName &&
      country &&
      address &&
      city &&
      state &&
      postalCode &&
      code &&
      phone &&
      qtyOfSpaces >= 1 &&
      (heightRestriction ? height1.value > 0 : true) &&
      ((sameSizeSpaces && largestSize) ||
        (!sameSizeSpaces &&
          (motorcycle || compact || midsized || large || oversized) &&
          checkTotalCount())) &&
      (isLabelled ? checkAllSpaceLabels() : true) &&
      aboutSpace &&
      accessInstructions &&
      (scheduleType == '24hours' ||
        scheduleType == 'fixed' ||
        // (scheduleType == 'fixed' &&
        //   (monday.isActive ? monday.startTime && monday.endTime : true) &&
        //   (tuesday.isActive ? tuesday.startTime && tuesday.endTime : true) &&
        //   (wednesday.isActive ? wednesday.startTime && wednesday.endTime : true) &&
        //   (thursday.isActive ? thursday.startTime && thursday.endTime : true) &&
        //   (friday.isActive ? friday.startTime && friday.endTime : true) &&
        //   (saturday.isActive ? saturday.startTime && saturday.endTime : true) &&
        //   (sunday.isActive ? sunday.startTime && sunday.endTime : true))
        (scheduleType == 'custom' && customTimeRange.length > 0)) &&
      noticeTime.value >= 0 &&
      advanceBookingTime.value >= 0 &&
      minTime.value >= 0 &&
      maxTime.value >= 0 &&
      !(instantBooking === '') &&
      pricingRates.perHourRate >= 0 &&
      pricingRates.perDayRate >= 0 &&
      pricingRates.perWeekRate >= 0 &&
      pricingRates.perMonthRate >= 0
    ) {
      console.log(await checkWithdrawalSettings());
      if (!(await checkWithdrawalSettings())) {
        // alert("Withdrawal Settings not Set Up. Please Set it and Try again");
        return false;
      } else {
        return true;
      }
    } else {
      alert('Listing Incomplete!', 'Please Complete and Try Again');
      return false;
    }
  };

  const handlePublish = async () => {
    try {
      updateDisabled(true);
      console.log('Check if complete :', await checkIfComplete());
      if (await checkIfComplete()) {
        // props.dispatch(showLoading());
        let res = await publishListing({
          variables: {
            id: _id,
            published: !published
          }
        });
        if (published) {
          alert('Listing Unpublished Successfully');
        } else {
          alert('Listing Published Successfully');
        }
        updateListingLocal(res.data.updateListing);
      } else {
        // alert("Listing Incomplete!", "Please Complete and Try Again");
      }

      updateDisabled(false);
      // props.dispatch(hideLoading());
    } catch (error) {
      updateDisabled(false);
      // props.dispatch(hideLoading());
      console.log(error);
      alert('Something went wrong!', 'Please try again');
    }
  };

  const handleDelete = async () => {
    try {
      updateDisabled(true);
      if (window.confirm('Are you sure you want to delete this listing?')) {
        // props.dispatch(showLoading());
        const response = await deleteListing({
          variables: {
            id: _id
          }
        });
        updateDisabled(false);
        // handleDeleteUI(_id);
        // await loadUserListings(listings.filter((item) => item._id !== _id));
        console.log(response);
        // window.location.reload();

        alert('Listing deleted successfully');

        // props.dispatch(hideLoading());
        await deleteListingLocal(_id);
      } else {
        return updateDisabled(false);
      }
    } catch (error) {
      // props.dispatch(hideLoading());
      // console.log(error);
      updateDisabled(false);
      alert('Something went wrong!', 'Please try again');
    }
  };

  return (
    <div className="listing-item row">
      {/* <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12 listing-img'>
        {images.length > 0 ? (
          <img src={images[0]} />
        ) : (
          <img src={placeholderImg} />
        )}
      </div> */}
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 listing-content">
        <div className="top row">
          <h4 className="col-10">{propertyName}</h4>
          <h4 className="col-10">{listBy === 'address' ? address : propertyName}</h4>
          <div className="tag col-2 text-capitalize">{getRole({ ownerId, userId, staff })}</div>
        </div>
        <div className="booking-count">
          {bookings < 1 ? 'No Upcoming Bookings' : `${bookings} Upcoming Bookings`}
        </div>
        <div className="listing-btn-row">

          {/* <Link href={`/parkings/orders/${_id}`}>
            <Button variant="outline-primary" disabled={disabled}>
              Staff Orders
            </Button>
          </Link> */}
          <Link href={`/parkings/orders/all/${_id}`}>
            <Button variant="outline-primary" disabled={disabled}>
              Parking Orders
            </Button>
          </Link>
          <Link href={`/parkings/${_id}`}>
            <Button variant="outline-primary" disabled={disabled}>
              View Details
            </Button>
          </Link>
          <Link href={`/listings/managestaff/${_id}`}>
            <Button variant="outline-primary" disabled={disabled}>
              Manage Staff
            </Button>
          </Link>
          <Link href={`/listings/edit/${_id}`}>
            <Button variant="outline-primary" disabled={disabled}>
              Modify
            </Button>
          </Link>
          <Link href={`/listings/promo-codes/${_id}`}>
            <Button variant="outline-primary" disabled={disabled}>
              Promo Codes
            </Button>
          </Link>
          <Button variant="outline-success" onClick={handlePublish} disabled={disabled}>
            {published ? 'UnPublish' : 'Publish'}
          </Button>
          <Link href={`/inbox`}>
            <Button variant="outline-primary" disabled={disabled}>
              Inbox
            </Button>
          </Link>
          <Button variant="outline-danger" onClick={handleDelete} disabled={disabled}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user, auth }) => ({
  listings: user.listings,
  userId: auth.data.attributes.sub
});

export default connect(mapStateToProps, {
  deleteListingLocal,
  updateListingLocal,
  loadUserListings
})(MyListingItem);
