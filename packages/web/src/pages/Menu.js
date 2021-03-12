import React from 'react';
import { connect } from 'react-redux';
import DriverMobileMenu from './DriverMobileMenu';
import SpaceOwnerMobileMenu from './SpaceOwnerMobileMenu';

const Menu = ({ isSpaceOwner,closeMobileMenu }) => {
  return isSpaceOwner ? <SpaceOwnerMobileMenu closeMobileMenu={closeMobileMenu}/> : <DriverMobileMenu closeMobileMenu={closeMobileMenu} />;
};

const mapStateToProps = ({ user }) => ({
  isSpaceOwner: user.isSpaceOwner,
});

export default connect(mapStateToProps)(Menu);
