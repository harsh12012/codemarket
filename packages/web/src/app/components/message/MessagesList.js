// Components/MessagesList.js

import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import moment from 'moment';

const MyMessage = ({ body, senderName, createdAt }) => {
  return (
    <div className="my-message">
      <div className="message-content">
        <p className="sender-name">{senderName}</p>
        <p className="message-body">{body}</p>
        <small className="message-time">{moment(new Date(createdAt)).format('lll')}</small>
      </div>
      <div className="user-avatar">
        {/* <img src={} alt="user-img"/> */}
        <FaUserCircle />
      </div>
    </div>
  );
};

const YourMessage = ({ body, senderName, createdAt }) => {
  return (
    <div className="your-message">
      <div className="user-avatar">
        {/* <img src={} alt="user-img"/> */}
        <FaUserCircle />
      </div>
      <div className="message-content">
        <p className="sender-name">{senderName}</p>
        <p className="message-body">{body}</p>
        <small className="message-time">{moment(new Date(createdAt)).format('lll')}</small>
      </div>
    </div>
  );
};

const MessagesList = ({ messages, username }) => (
  // <ChatFeed
  //   maxHeight={window.innerHeight - 250}
  //   messages={messages.map(
  //     (msg) =>
  //       new Message({
  //         id:  msg.senderName === username ? 0 : msg._id,
  //         message: msg.body,
  //         senderName:msg.senderName,

  //       })
  //   )}
  //   isTyping={false}
  //   showSenderName
  //   bubblesCentered={false}
  // bubbleStyles={{
  //   text: {
  //     fontSize: 12,
  //   },
  //   chatbubble: {
  //     borderRadius: 20,
  //     paddingHorizontal: 10,
  //     paddingVertical: 10,
  //   },
  // }}
  // />
  <div className="message-list">
    {messages.map((item) =>
      item.senderName === username ? <MyMessage {...item} /> : <YourMessage {...item} />
    )}
  </div>
);

export default MessagesList;
