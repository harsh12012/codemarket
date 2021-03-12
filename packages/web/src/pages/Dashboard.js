import React from 'react';
import { connect } from 'react-redux';
import DriverDashboard from './DriverDashboard';
import SpaceOwnerDashboard from './SpaceOwnerDashboard';

const Dashboard = ({ isSpaceOwner }) => {
  return isSpaceOwner ? <SpaceOwnerDashboard /> : <DriverDashboard />;
};

const mapStateToProps = ({ user }) => ({
  isSpaceOwner: user.isSpaceOwner
});

export default connect(mapStateToProps)(Dashboard);
