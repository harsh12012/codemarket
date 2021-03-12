import React from "react";
import { Form } from "react-formio";

const UpdateForm = ({ data }) => {
  return (
    <div className="p-5">
      <h1 className="text-center">{data.title}</h1>
      <Form form={JSON.parse(data.formJSON)} onSubmit={console.log} />
    </div>
  );
};

export default UpdateForm;
