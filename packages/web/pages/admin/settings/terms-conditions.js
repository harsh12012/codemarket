import React from 'react';
import AdminLayout from '../../../src/app/components/other/AdminLayout';
import TermsEdit from '../../../src/app/components/admin/termsConditions/EditTermCondition';

const AdminPage = (props) => {
  return (
    <div>
      <AdminLayout>
        <TermsEdit />
      </AdminLayout>
    </div>
  );
};

export default AdminPage;
