import React from 'react';
import AdminLayout from '../../../src/app/components/other/AdminLayout';
import UsersTabs from '../../../src/app/components/admin/users/UsersTabs';

const AdminPage = (props) => {
  return (
    <div>
      <AdminLayout>
        <UsersTabs />
      </AdminLayout>
    </div>
  );
};

export default AdminPage;
