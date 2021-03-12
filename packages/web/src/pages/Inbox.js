import React from 'react';
import { connect } from 'react-redux';
import DriverInbox from './DriverInbox';
import SpaceOwnerInbox from './SpaceOwnerInbox';

const Inbox = ({ isSpaceOwner }) => {
  return isSpaceOwner ? <SpaceOwnerInbox /> : <DriverInbox />;
};

const mapStateToProps = ({ user }) => ({
  isSpaceOwner: user.isSpaceOwner
});

export default connect(mapStateToProps)(Inbox);
