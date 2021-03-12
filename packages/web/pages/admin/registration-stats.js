import React from 'react';
import AdminLayout from '../../src/app/components/other/AdminLayout';
import UsersRegStatsTab from '../../src/app/components/admin/users/UsersRegStatsTab';

const AdminPage = (props) => {
  return (
    <div>
      <AdminLayout>
        <UsersRegStatsTab />
      </AdminLayout>
    </div>
  );
};

export default AdminPage;
