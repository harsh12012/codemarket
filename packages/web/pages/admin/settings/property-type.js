import React from "react";
import AdminLayout from "../../../src/app/components/other/AdminLayout";
import OptionsCRUD from "../../../src/app/components/admin/settingsOptions/OptionsCRUD";

const AdminPage = (props) => {
  return (
    <div>
      <AdminLayout>
        <OptionsCRUD id="5fcd2fb3ad371d00086e767d" />
      </AdminLayout>
    </div>
  );
};

export default AdminPage;
