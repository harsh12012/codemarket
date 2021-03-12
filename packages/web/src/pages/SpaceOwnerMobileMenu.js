import React from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { toggleUserType, toggleLoading } from "../app/redux/actions/user";
import { logoutUser, unsetAuthUser } from "../app/redux/actions/auth";
import { Auth } from "aws-amplify";
import { gql, useQuery } from "@apollo/client";
import { client } from "../app/graphql/index";
import { loadUserListings } from "../app/redux/actions/user";

const GET_OWNER_LISTINGS = gql`
  query GetOwnerListings($ownerId: String!) {
    getOwnerListings(ownerId: $ownerId) {
      _id
      ownerId
      ownerName
      ownerEmail
      published
      location {
        type
        coordinates
      }
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

const SpaceOwnerMobileMenu = ({
  toggleUserType,
  closeMobileMenu,
  logoutUser,
  auth,
  loadUserListings,
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
    console.log("getting owner listings");
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
        toggleLoading();
        // props.dispatch(hideLoading());
      });
  };

  return (
    <div
      style={{
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
        href="/my-listings"
        onClick={() => {
          closeMobileMenu();
          getListings();
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
          My Listings
        </div>
      </Link>
      <Link
        href="parking-orders"
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
          Parking Orders Recieved
        </div>
      </Link>

      <Link
        href="add-listing"
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
          Add a Listing
        </div>
      </Link>
      <Link
        href="/messages"
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
        Withdrawal Settings
      </div>
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
        Payout & Deposit Reports
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
        href="/find-parking"
        onClick={() => {
          toggleUserType();
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
          Switch to Driver
        </div>
      </Link>

      <div
        onClick={() => {
          handleLogout();
          closeMobileMenu();
        }}
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
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps, {
  toggleUserType,
  logoutUser,
  toggleLoading,
  loadUserListings,
})(SpaceOwnerMobileMenu);
