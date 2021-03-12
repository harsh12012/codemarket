import React from 'react';
import { connect } from 'react-redux';
import AdminSettingOptions from '../../components/admin/AdminSettingOptions';

function AdminListingType({ userId }) {
  return <AdminSettingOptions userId={userId} id="5fccdb80d9db4a00080a0bda" />;
}

const mapStateToProps = ({ auth }) => {
  return {
    userId: auth.authenticated ? auth.data.attributes.sub : null
  };
};

export default connect(mapStateToProps)(AdminListingType);
