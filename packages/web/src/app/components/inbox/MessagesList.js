import React, { useRef, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import moment from 'moment';
import { Button, Spinner } from 'react-bootstrap';

const MyMessage = ({ message, senderName, createdAt }) => {
  return (
    <div className="my-message">
      <div className="message-content">
        <p className="sender-name">{senderName}</p>
        <p className="message-body">{message}</p>
        <small className="message-time">{moment(new Date(createdAt)).format('lll')}</small>
      </div>
      <div className="user-avatar">
        {/* <img src={} alt="user-img"/> */}
        <FaUserCircle />
      </div>
    </div>
  );
};

const YourMessage = ({ message, senderName, createdAt }) => {
  return (
    <div className="your-message">
      <div className="user-avatar">
        {/* <img src={} alt="user-img"/> */}
        <FaUserCircle />
      </div>
      <div className="message-content">
        <p className="sender-name">{senderName}</p>
        <p className="message-body">{message}</p>
        <small className="message-time">{moment(new Date(createdAt)).format('lll')}</small>
      </div>
    </div>
  );
};

const MessagesList = ({ messages = [], count = 0, senderId, loadMore, loading }) => {
  const messageEl = useRef(null);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  return (
    <div className="message-list px-2" ref={messageEl}>
      {count > messages.length && (
        <div className="text-center">
          <Button disabled={loading} onClick={loadMore}>
            {loading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
      {messages
        .slice(0)
        .reverse()
        .map((item) =>
          item.senderId === senderId ? <MyMessage {...item} /> : <YourMessage {...item} />
        )}
      {/* <div myRef={myRef}>Messag bottom</div> */}
    </div>
  );
};

export default MessagesList;
