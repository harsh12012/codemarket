import React from 'react';
import AdminLayout from '../../../../src/app/components/other/AdminLayout';
import FAQs from '../../../../src/pages/FAQs';


const AdminPage = (props) => {
  return (
    <div>
      <AdminLayout>
          <FAQs admin={true} />
      </AdminLayout>
    </div>
  );
};

export default AdminPage;
