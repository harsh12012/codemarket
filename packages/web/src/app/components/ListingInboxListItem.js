import React from "react";
import { Card } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import moment from "moment";

const ListingInboxListItem = ({
  listingId,
  driverId,
  driverName,
  lastMessage,
}) => {
  return (
    <Card className="inbox-item">
      <Card.Body>
        <Link
          // href={{
          //   pathname: `${listingId}/${driverId}`,
          //   query: { driverId: driverId, driverName: driverName },
          // }}
          // href={`${listingId}/${driverId}`}
          href={`/chatscreen?id=${listingId}&userId=${driverId}&driverName=${driverName}`}
        >
          <div className="cursor-pointer">
            <div className="user-img">
              <FaUserCircle />
            </div>
            <div className="content">
              <div className="meta-data">
                <p>{driverName}</p>
                <span>{moment(new Date(lastMessage.createdAt)).fromNow()}</span>
              </div>
              <p className="description">
                {lastMessage.senderName} : {lastMessage.body}
              </p>
            </div>
          </div>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ListingInboxListItem;
