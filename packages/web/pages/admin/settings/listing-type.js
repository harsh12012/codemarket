import React from 'react';
import AdminLayout from '../../../src/app/components/other/AdminLayout';
import OptionsCRUD from '../../../src/app/components/admin/settingsOptions/OptionsCRUD';

const AdminPage = (props) => {
  return (
    <div>
      <AdminLayout>
        <OptionsCRUD id="5fccdb80d9db4a00080a0bda" />
      </AdminLayout>
    </div>
  );
};

export default AdminPage;
