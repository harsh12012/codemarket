import React from "react";
import AdminLayout from "../../../src/app/components/other/AdminLayout";
import EditPolicy from "../../../src/app/components/admin/policies/EditPolicy";

const AdminPage = (props) => {
  return (
    <div>
      <AdminLayout>
        <EditPolicy />
      </AdminLayout>
    </div>
  );
};

export default AdminPage;
