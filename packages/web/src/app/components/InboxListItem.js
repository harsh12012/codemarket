import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import { gql } from '@apollo/client';
import { client } from '../graphql';
import moment from 'moment';

const GET_LISTING = gql`
  query GetListing($id: ID!) {
    getListing(id: $id) {
      _id
      ownerId
      ownerName
    }
  }
`;

const InboxListItem = ({ listingId, listingAddress, lastMessage }) => {
  const [listing, setListing] = useState(null);

  useEffect(() => {
    client
      .query({
        query: GET_LISTING,
        variables: { id: listingId }
      })
      .then(({ data }) => {
        console.log(data.getListing);
        setListing(data.getListing);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    listing && (
      <Link href={`/chatscreen?id=${listingId}&userId=${lastMessage.driverId}`}>
        <Card className="inbox-item cursor-pointer">
          <Card.Body>
            <div className="user-img">
              <FaUserCircle />
            </div>
            <div className="content">
              <div className="meta-data">
                <p>{listing.ownerName}</p>
                <span>{moment(new Date(lastMessage.createdAt)).fromNow()}</span>
              </div>
              <p className="listing-name">{listingAddress}</p>
              <p className="description">
                {lastMessage.senderName} : {lastMessage.body}
              </p>
            </div>
          </Card.Body>
        </Card>
      </Link>
    )
  );
};

export default InboxListItem;
