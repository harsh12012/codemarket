import React from "react";
import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";
// import AccessDenied from './AccessDenied';

const AuthContainer = ({ authenticated, children }) => {
  if (!authenticated) {
    return null//<Redirect href="/" />;
  }
  return <>{children}</>;
};

const mapStateToProps = ({ auth }) => ({
  authenticated: auth.authenticated,
});

export default connect(mapStateToProps)(AuthContainer);
