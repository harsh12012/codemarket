import React from 'react';
import { connect } from 'react-redux';
import { useChatBox } from '@parkyourself-frontend/shared/hooks/inbox';
import { Alert } from 'react-bootstrap';
import MessagesList from './MessagesList';
import SendMessage from './SendMessage';
import Loading from '../other/Loading';

const ChatBox = (props) => {
  const { user1Id, user2Id, listingLocation } = props;

  const { loading, allData, onSend, error, loadMore } = useChatBox({
    user1Id,
    user2Id,
    listingLocation
  });

  return (
    <div className="chat-box ">
      <Alert variant="primary">
        <h2>{listingLocation}</h2>
      </Alert>
      {loading && allData.count == 0 ? (
        <Loading />
      ) : (
        <MessagesList
          messages={allData.messages}
          count={allData.count}
          senderId={user1Id}
          loadMore={loadMore}
          loading={loading}
        />
      )}
      <SendMessage onSend={onSend} />
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
    userName: auth.authenticated ? auth.data.attributes.name : null,
    userData: auth.data.attributes
  };
};

export default connect(mapStateToProps)(ChatBox);
