import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { gql } from "@apollo/client";
import { client } from "../graphql";
import moment from "moment";

// const GET_LISTING = gql`
//   query GetListing($id: ID!) {
//     getListing(id: $id) {
//       _id
//       ownerId
//       ownerName
//     }
//   }
// `;

const SpaceOwnerInboxListItem = ({
  listingId,
  lastMessage,
  listingAddress,
}) => {
  //   const [listing,setListing] = useState(null);

  // useEffect(() => {
  //     client
  //       .query({
  //         query: GET_LISTING,
  //         variables: { id: listingId },
  //       })
  //       .then(({ data }) => {
  //         console.log(data.getListing);
  //         setListing(data.getListing);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);

  return (
    <Link
    href={`/chatscreen?id=${listingId}&userId=${lastMessage.driverId}&driverName=${lastMessage.driverName}`}
    >
      <Card className="inbox-item">
        <Card.Body>
          <div className="user-img">
            <FaUserCircle />
          </div>
          <div className="content">
            <div className="meta-data">
              <p>{lastMessage.driverName}</p>
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
  );
};

export default SpaceOwnerInboxListItem;
