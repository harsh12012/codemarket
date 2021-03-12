import React from 'react';
import { connect } from 'react-redux';
import AccessDenied from './AccessDenied';

const DriverContainer = ({ isSpaceOwner, children }) => {
  if (isSpaceOwner) {
    return <AccessDenied />;
  }
  return <>{children}</>;
};

const mapStateToProps = ({ user }) => ({
  isSpaceOwner: user.isSpaceOwner,
});

export default connect(mapStateToProps)(DriverContainer);
