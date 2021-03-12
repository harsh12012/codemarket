import React, { useState, useEffect } from "react";
import { client } from "../app/graphql";
import { gql } from "@apollo/client";
import ListingInboxListItem from "../app/components/ListingInboxListItem";
import SpaceOwnerContainer from "../app/components/SpaceOwnerContainer";

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

const GET_LISTING_MESSAGES = gql`
  query GetListingMessages($listingId: String!) {
    getListingMessages(listingId: $listingId) {
      _id
      listingId
      listingAddress
      body
      driverId
      driverName
      ownerId
      ownerName
      senderName
      createdAt
    }
  }
`;

const ListingInbox = ({ id }) => {
  const [listing, setListing] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .query({
        query: GET_LISTING,
        variables: { id: id },
      })
      .then(({ data }) => {
        console.log(data.getListing);
        setListing(data.getListing);
      })
      .catch((err) => {
        console.log(err);
      });

    client
      .query({ query: GET_LISTING_MESSAGES, variables: { listingId: id } })
      .then(({ data }) => {
        if (data.getListingMessages) {
          console.log(data.getListingMessages);
          let result = data.getListingMessages.reduce(function (r, a) {
            r[a.driverId] = r[a.driverId] || [];
            r[a.driverId].push(a);
            return r;
          }, Object.create(null));

          console.log(result);
          let msgArray = Object.values(result);
          console.log(msgArray);
          setMessages(msgArray);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <SpaceOwnerContainer>
      {!listing ? (
        <div className="loading">Loading...</div>
      ) : (
        <div>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="dg__account">
              <h1 className="heading">Inbox</h1>
              <p className="listing-name">{listing.locationDetails.address}</p>
              <div className="inbox-list">
                {messages.length > 0 ? (
                  messages.map((item) => (
                    <ListingInboxListItem
                      key={item[0].listingId}
                      listingId={id}
                      driverId={item[0].driverId}
                      driverName={item[0].driverName}
                      lastMessage={item[item.length - 1]}
                    />
                  ))
                ) : (
                  <div className="loading">No messages found</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </SpaceOwnerContainer>
  );
};

export default ListingInbox;
