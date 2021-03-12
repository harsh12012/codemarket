import React from "react";
import AdminLayout from "../../src/app/components/other/AdminLayout";
import FormOptionCRUD from "../../src/app/components/formOptions/FormOptionCRUD";

function FormOptionsPage(props) {
  return (
    <AdminLayout>
      <FormOptionCRUD />
    </AdminLayout>
  );
}
export default FormOptionsPage;
