import React from "react";
import { connect } from "react-redux";
import { toggleLoading, toggleUserType } from "../app/redux/actions/user";
import Link from "next/link";
import { logoutUser, unsetAuthUser } from "../app/redux/actions/auth";
import { Auth } from "aws-amplify";
import { gql, useQuery } from "@apollo/client";
// import { toggleUserType } from '../app/redux/actions/user';
import { client } from "../app/graphql/index";
import { loadUserListings, loadUserBookings } from "../app/redux/actions/user";

const GET_OWNER_LISTINGS = gql`
  query GetOwnerListings($ownerId: String!) {
    getOwnerListings(ownerId: $ownerId) {
      _id
      ownerId
      ownerName
      ownerEmail
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
      startDate
      startTime
      endDate
      endTime
      payment
      paymentMethod
      vehicle
      profileCategory
      status
      createdAt
      qrCode
    }
  }
`;

const DriverMobileMenu = ({
  toggleUserType,
  closeMobileMenu,
  logoutUser,
  loadUserListings,
  loadUserBookings,
  auth,
  toggleLoading,
  dispatch,
}) => {
  const handleLogout = () => {
    // Auth.signOut().then(() => {
    //   localStorage.removeItem('unitabiz-data');
    //   logoutUser();
    // });
    Auth.signOut();
    localStorage.removeItem("unitabiz-data");
    dispatch(unsetAuthUser());
  };

  const getListings = async () => {
    // props.dispatch(showLoading());
    toggleLoading();
    console.log("getting user listings");
    client
      .query({
        query: GET_OWNER_LISTINGS,
        variables: { ownerId: auth.data.attributes.sub },
      })
      .then(({ data }) => {
        // setAllRooms(data.getAllRooms);
        console.log(data.getOwnerListings);
        loadUserListings(data.getOwnerListings);
        // props.dispatch(hideLoading());
      })
      .catch((err) => {
        console.log(err);
        // props.dispatch(hideLoading());
      });
  };

  const getBookings = async () => {
    // props.dispatch(showLoading());
    console.log("get bookings");
    toggleLoading();
    client
      .query({
        query: GET_DRIVER_BOOKINGS,
        variables: { driverId: auth.data.attributes.sub },
      })
      .then(({ data }) => {
        // setAllRooms(data.getAllRooms);
        console.log(data.getDriverBookings);
        loadUserBookings(data.getDriverBookings);
        // props.dispatch(hideLoading());
      })
      .catch((err) => {
        console.log(err);
        toggleLoading();
        // props.dispatch(hideLoading());
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        textAlign: "center",
      }}
    >
      <Link
        href="/dashboard"
        onClick={() => {
          closeMobileMenu();
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px #ccc",
            padding: "10px",
            margin: "10px auto",
            cursor: "pointer",
            color: "#000",
          }}
        >
          Dashboard
        </div>
      </Link>
      <Link
        href="/find-parking"
        onClick={() => {
          closeMobileMenu();
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px #ccc",
            padding: "10px",
            margin: "10px auto",
            cursor: "pointer",
            color: "#000",
          }}
        >
          Find Parking
        </div>
      </Link>
      <Link
        href="/my-bookings"
        onClick={() => {
          closeMobileMenu();
          getBookings();
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px #ccc",
            padding: "10px",
            margin: "10px auto",
            cursor: "pointer",
            color: "#000",
          }}
        >
          My Bookings
        </div>
      </Link>
      <div
        style={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px #ccc",
          padding: "10px",
          margin: "10px auto",
          cursor: "pointer",
          color: "#000",
        }}
      >
        Payment
      </div>
      <Link
        href="messages"
        onClick={() => {
          closeMobileMenu();
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px #ccc",
            padding: "10px",
            margin: "10px auto",
            cursor: "pointer",
            color: "#000",
          }}
        >
          Messages
        </div>
      </Link>
      <div
        style={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px #ccc",
          padding: "10px",
          margin: "10px auto",
          cursor: "pointer",
          color: "#000",
        }}
      >
        Reviews
      </div>
      <Link
        href="faq"
        onClick={() => {
          closeMobileMenu();
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px #ccc",
            padding: "10px",
            margin: "10px auto",
            cursor: "pointer",
            color: "#000",
          }}
        >
          FAQs
        </div>
      </Link>
      <Link
        href="/my-listings"
        onClick={() => {
          toggleUserType();
          if (auth.authenticated) {
            getListings();
          }
          closeMobileMenu();
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: "#07e239",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px #ccc",
            padding: "10px",
            margin: "10px auto",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Switch to Space Owner
        </div>
      </Link>

      <Link
        href="/"
        onClick={() => {
          handleLogout();
          closeMobileMenu();
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: "#0b4094",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px #ccc",
            padding: "10px",
            margin: "10px auto",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Log Out
        </div>
      </Link>
    </div>
  );
};

const mapStateToProps = ({ auth, user }) => {
  return {
    auth,
    isSpaceOwner: user.isSpaceOwner,
    // userId: auth.data.attributes.sub,
  };
};

export default connect(mapStateToProps, {
  toggleUserType,
  logoutUser,
  loadUserListings,
  loadUserBookings,
  toggleLoading,
})(DriverMobileMenu);
