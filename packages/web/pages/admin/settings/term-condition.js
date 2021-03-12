import React from "react";
import AdminLayout from "../../../src/app/components/other/AdminLayout";
import EditTermCondition from "../../../src/app/components/admin/termsConditions/EditTermCondition";

const AdminPage = (props) => {
  return (
    <div>
      <AdminLayout>
        <EditTermCondition />
      </AdminLayout>
    </div>
  );
};

export default AdminPage;
