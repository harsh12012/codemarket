import PropTypes from "prop-types";
import React, { Fragment } from "react";
import Header from "../containers/headers/Header";
import Footer from "../containers/footers/Footer";

const LayoutOne = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
};

LayoutOne.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.string,
};

export default LayoutOne;
