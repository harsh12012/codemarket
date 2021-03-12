import React, { useState } from 'react';
import { useGetOwnerInbox } from '@parkyourself-frontend/shared/hooks/inbox';
import { Card } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import Loading from '../other/Loading';
import Inbox from './Inbox';

export default function SpaceOwnerInbox() {
  const { loading, data, error } = useGetOwnerInbox();

  const [inboxData, setInboxData] = useState({
    showInboxBox: false,
    user1Id: '',
    listingLocation: ''
  });

  if (loading || !data) {
    return <Loading />;
  }

  return inboxData.showInboxBox ? (
    <Inbox user1Id={inboxData.user1Id} listingLocation={inboxData.listingLocation} />
  ) : (
    <div>
      <h1>Space Owner Inbox</h1>
      {data && data.getOwnerInbox.length > 0 ? (
        data.getOwnerInbox.map((item) => (
          <Card
            key={item._id}
            className="inbox-item cursor-pointer"
            onClick={() =>
              setInboxData({
                showInboxBox: true,
                user1Id: item._id,
                listingLocation: item.listingAddress
              })
            }>
            <Card.Body>
              <div className="owner-inbox-card">
                <FaUserCircle className="mr-2 icon" />
                <p className="p-0 m-0">Listing - {item.listingAddress}</p>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-center mt-5">No Chats Found</p>
      )}
    </div>
  );
}
