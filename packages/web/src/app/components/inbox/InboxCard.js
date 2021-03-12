import React from 'react';
import { Card } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import moment from 'moment';

export default function InboxCard({ item, isSpaceOwner, setMessageData }) {
  return (
    <Card
      className="inbox-item cursor-pointer"
      onClick={() =>
        setMessageData({
          showChatBox: true,
          user1Id:
            item._id == item.lastMessage.senderId
              ? item.lastMessage.receiverId
              : item.lastMessage.senderId,
          user2Id: item._id,
          listingLocation: item.lastMessage.listingLocation,
          driverName: item.lastMessage.listingLocation
        })
      }>
      <Card.Body>
        <div className="user-img">
          <FaUserCircle />
        </div>
        <div className="content">
          <div className="meta-data">
            <p>{isSpaceOwner ? item.lastMessage.senderName : item.lastMessage.listingLocation}</p>
            <span>{moment(new Date(item.lastMessage.createdAt)).fromNow()}</span>
          </div>
          <p className="listing-name">{item.lastMessage.message}</p>
          {/* <p className="description">
            {item.lastMessage.senderName} : 
            {item.lastMessage.message}
          </p> */}
        </div>
      </Card.Body>
    </Card>
  );
}
