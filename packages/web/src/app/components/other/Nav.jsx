/* eslint-disable react/self-closing-comp */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { IoIosArrowDown, IoIosMenu } from 'react-icons/io';
import { FaUserCircle, FaParking } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import Link from 'next/link';
import { Auth } from 'aws-amplify';
import { client } from '@parkyourself-frontend/shared/graphql';
import { Button, Navbar, Nav, OverlayTrigger, Overlay, Tooltip } from 'react-bootstrap';
import { unsetAuthUser } from '../../redux/actions/auth';
import { setRedirectPath } from '../../redux/actions/redirect';
import { toggleUserType, toggleLoading } from '../../redux/actions/user';
import logo from '../../assets/images/logo2.png';

const NavC = (props) => {
  const handleLogout = () => {
    Auth.signOut().then(() => {
      client.resetStore();
      props.dispatch(unsetAuthUser());
    });
  };
  return (
    <Navbar expand="lg">
      <Navbar.Brand>
        <Link href="/dashboard">
          <img src={logo} alt="parkyourself" className="img-fluid" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home" disabled></Nav.Link>
        </Nav>
        <Nav className="align-items-center">
          {props.auth.authenticated ? (
            <>
              {props.admin && (
                <Nav.Item>
                  <Link href="/admin/settings/listing-type">
                    <div className="mainmenu">
                      <li className="header-menu-btn drop">
                        <div className="menu-btn">
                          <small>Admin</small>
                        </div>
                        {/* <ul className="dropdown">
                        <Link href="/admin/form-options">
                          <li className="d-block nav-li">
                            <small>Manage Form-Options</small>
                          </li>
                        </Link>
                      </ul> */}
                      </li>
                    </div>
                  </Link>
                </Nav.Item>
              )}
              <Nav.Item className="nav-icon-wrapper">
                <Link href="/dashboard">
                  <a>
                    <OverlayTrigger
                      placement={'bottom'}
                      overlay={<Tooltip className="nav-icon-tooltip">Dashboard</Tooltip>}>
                      <MdDashboard className="nav-icon" />
                    </OverlayTrigger>
                  </a>
                </Link>
              </Nav.Item>
              {!props.isSpaceOwner && (
                <Nav.Item className="nav-icon-wrapper">
                  <Link href="/parkings">
                    <a>
                      <OverlayTrigger
                        placement={'bottom'}
                        overlay={<Tooltip className="nav-icon-tooltip">Find Parking</Tooltip>}>
                        <FaParking className="nav-icon" />
                      </OverlayTrigger>
                    </a>
                  </Link>
                </Nav.Item>
              )}
              <Nav.Item>
                <div className="mainmenu">
                  <li className="drop">
                    <div className="menu-btn">
                      <FaUserCircle className="nav-icon-avatar" />
                    </div>

                    <ul className="dropdown">
                      {props.isSpaceOwner ? (
                        <>
                          <Link href="/listings/add">
                            <li className="d-block nav-li">
                              <small>Add Listings</small>
                            </li>
                          </Link>
                          <Link href="/listings/my">
                            <li className="d-block nav-li">
                              <small>My Listings</small>
                            </li>
                          </Link>
                          <Link href="/parkings/orders">
                            <li className="d-block nav-li">
                              <small>Parking Orders</small>
                            </li>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link href="/bookings/my">
                            <li className="d-block nav-li">
                              <small>My Bookings</small>
                            </li>
                          </Link>
                        </>
                      )}
                      <Link href="/inbox">
                        <li className="d-block nav-li">
                          <small>Inbox</small>
                        </li>
                      </Link>
                      <li
                        className="d-block nav-li"
                        onClick={() => {
                          localStorage.setItem('isSpaceOwner', !props.isSpaceOwner);
                          props.dispatch(toggleUserType());
                        }}>
                        <small>Switch to {props.isSpaceOwner ? 'Driver' : 'SpaceOwner'}</small>
                      </li>
                      <li className="d-block nav-li" onClick={() => handleLogout()}>
                        <small>Logout</small>
                      </li>
                    </ul>
                  </li>
                </div>
              </Nav.Item>
            </>
          ) : (
            props.initial && (
              <Nav.Item>
                <Link href="/">
                  <Button variant="outline-dark">Login</Button>
                </Link>
              </Nav.Item>
            )
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = ({ auth, user }) => {
  return {
    auth,
    isSpaceOwner: user.isSpaceOwner,
    // userId: auth.data.attributes.sub,
    admin: auth.authenticated ? auth.data.admin : false,
    initial: auth.initial
  };
};

export default connect(mapStateToProps)(NavC);
