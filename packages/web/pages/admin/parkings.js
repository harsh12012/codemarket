import React from 'react';
import AdminLayout from '../../src/app/components/other/AdminLayout';
import ListingTab from '../../src/app/components/listings/myListing/ListingTab';

const AdminPage = () => {
  return (
    <div>
      <AdminLayout>
        <ListingTab title="Parkings" />
      </AdminLayout>
    </div>
  );
};

export default AdminPage;
