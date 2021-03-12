import React, { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { connect } from 'react-redux';
import { client } from '../app/graphql';
import ChatBox from '../app/components/message/ChatBox';

const GET_LISTING = gql`
  query GetListing($id: ID!) {
    getListing(id: $id) {
      _id
      ownerId
      ownerName
      ownerEmail
      locationDetails {
        address
      }
      reviews
    }
  }
`;

const ChatScreen = ({ match, id, userId, driverName, userData, location, isSpaceOwner }) => {
  const [listing, setListing] = useState(null);

  useEffect(() => {
    client
      .query({
        query: GET_LISTING,
        variables: { id: id }
      })
      .then(({ data }) => {
        console.log(data.getListing);
        setListing(data.getListing);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isSpaceOwner && (listing ? userData.sub !== listing.ownerId : true)) {
    return <div className="loading">Loading...</div>;
  }

  return !listing ? (
    <div className="loading">Loading...</div>
  ) : (
    <div className="dg__account">
      {isSpaceOwner ? (
        <>
          <h1 className="heading">{driverName ? driverName : ''}</h1>
          <p className="listing-name">{listing.locationDetails.address}</p>
        </>
      ) : (
        <>
          {' '}
          <h1 className="heading">{listing.ownerName}</h1>
          <p className="listing-name">{listing.locationDetails.address}</p>
        </>
      )}
      <ChatBox
        ownerId={listing.ownerId}
        ownerName={listing.ownerName}
        listingId={listing._id}
        listingAddress={listing.locationDetails.address}
        driverId={userId}
      />
    </div>
  );
};

const mapStateToProps = ({ auth, user }) => ({
  userData: auth.data.attributes,
  isSpaceOwner: user.isSpaceOwner
});

export default connect(mapStateToProps)(ChatScreen);
