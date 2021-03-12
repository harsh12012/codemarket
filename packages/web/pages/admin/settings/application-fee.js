import React from 'react';
import AdminLayout from '../../../src/app/components/other/AdminLayout';
import EditFee from '../../../src/app/components/admin/fee/EditFee';

const AdminPage = (props) => {
  return (
    <div>
      <AdminLayout>
        <EditFee />
      </AdminLayout>
    </div>
  );
};

export default AdminPage;
