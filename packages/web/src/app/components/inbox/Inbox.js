import React, { useState, useEffect } from 'react';
import { useGetInbox } from '@parkyourself-frontend/shared/hooks/inbox';
import { useSelector } from 'react-redux';
import Loading from '../other/Loading';
import InboxCard from './InboxCard';
import ChatBox from './ChatBox';

export default function Inbox({
  showChatBox = false,
  user1Id = '',
  user2Id = '',
  listingLocation = ''
}) {
  const isSpaceOwner = useSelector(({ user }) => user.isSpaceOwner);
  const { loading, data, error } = useGetInbox({ userId: user1Id });
  const [messageData, setMessageData] = useState({
    showChatBox,
    user1Id,
    user2Id,
    listingLocation
  });

  useEffect(() => {
    if (showChatBox) {
      setMessageData({ ...messageData, showChatBox: true });
    }
  }, [showChatBox]);

  if (error) {
    return <p>{error.messsage}</p>;
  }

  if (loading || !data || !data.getInbox) {
    return <Loading />;
  }

  return (
    <div>
      {messageData.showChatBox ? (
        <ChatBox
          user1Id={messageData.user1Id}
          user2Id={messageData.user2Id}
          listingLocation={messageData.listingLocation}
        />
      ) : (
        <div>
          <h1>Inbox</h1>
          {isSpaceOwner && listingLocation && <p>{listingLocation}</p>}
          {!data.getInbox ||
            (data.getInbox.length === 0 && <p className="text-center mt-5">No Chats Found</p>)}
          <div>
            {data.getInbox &&
              data.getInbox
                .reverse()
                .map((item) => (
                  <InboxCard
                    item={item}
                    isSpaceOwner={isSpaceOwner}
                    setMessageData={setMessageData}
                  />
                ))}
          </div>
        </div>
      )}
    </div>
  );
}
