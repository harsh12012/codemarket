import { gql } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DriverContainer from '../app/components/DriverContainer';
import InboxListItem from '../app/components/InboxListItem';
import { client } from '../app/graphql';

const GET_DRIVER_MESSAGES = gql`
  query GetDriverMessages($driverId: String!) {
    getDriverMessages(driverId: $driverId) {
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

const DriverInbox = ({ userData, isSpaceOwner }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .query({ query: GET_DRIVER_MESSAGES, variables: { driverId: userData.sub } })
      .then(({ data }) => {
        if (data.getDriverMessages) {
          let result = data.getDriverMessages.reduce(function (r, a) {
            r[a.listingId] = r[a.listingId] || [];
            r[a.listingId].push(a);
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
    <DriverContainer>
      <div className="dg__account">
        <h1 className="heading">Inbox</h1>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="inbox-list">
            {messages.length > 0 ? (
              messages.map((item) => (
                <InboxListItem
                  key={item[0].listingId}
                  listingId={item[0].listingId}
                  listingAddress={item[0].listingAddress}
                  lastMessage={item[item.length - 1]}
                />
              ))
            ) : (
              <div className="loading">No messages found</div>
            )}
          </div>
        )}
      </div>
    </DriverContainer>
  );
};

const mapStateToProps = ({ auth }) => ({
  userData: auth.data.attributes
});

export default connect(mapStateToProps)(DriverInbox);
