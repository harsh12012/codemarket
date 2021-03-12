import React from 'react';
import { connect } from 'react-redux';
import AccessDenied from '../app/components/AccessDenied';
import SpaceOwnerContainer from '../app/components/SpaceOwnerContainer';

const ParkingOrders = ({ isSpaceOwner }) => {
  return (
    <SpaceOwnerContainer>
      <div
        className="dg__account"
        // style={{
        //   paddingTop: '100px',
        //   width: '570px',
        //   margin: '0px auto',
        //   textAlign: 'center',
        // }}
      >
        Parking Orders
      </div>
    </SpaceOwnerContainer>
  );
};

const mapStateToProps = ({ user }) => ({
  isSpaceOwner: user.isSpaceOwner
});

export default connect(mapStateToProps)(ParkingOrders);
