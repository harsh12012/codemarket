import React from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../src/app/components/other/AdminLayout';
import UserProfile from '../../../src/app/components/admin/users/UserProfile';

const AdminPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <AdminLayout>
        <UserProfile id={id} />
      </AdminLayout>
    </div>
  );
};

export default AdminPage;
