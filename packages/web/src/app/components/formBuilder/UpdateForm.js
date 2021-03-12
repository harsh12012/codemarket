import React, { useState } from "react";
import { connect } from "react-redux";
import { FormEdit, FormBuilder } from "react-formio";
import { useMutation, gql } from "@apollo/client";
import { showLoading, hideLoading } from "react-redux-loading";
import slugify from "slugify";
import { setViewForm } from "../../redux/actions/formBuilder";

const UPDATE_ONE_FORM = gql`
  mutation UpdateOneForm(
    $id: ID!
    $title: String!
    $slug: String!
    $formJSON: String!
  ) {
    updateOneForm(id: $id, title: $title, slug: $slug, formJSON: $formJSON) {
      _id
      title
      slug
      formJSON
      userId
    }
  }
`;

const UpdateForm = (props) => {
  const [updateOneForm] = useMutation(UPDATE_ONE_FORM);
  const [formJSON, setFormJSON] = useState(null);
  const [title, setTitle] = useState(props.data.title);
  const [disabled, setDisabled] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    props.dispatch(showLoading());
    try {
      setDisabled(true);
      const response = await updateOneForm({
        variables: {
          id: props.data._id,
          title: title,
          slug: slugify(title, { lower: true }),
          formJSON: JSON.stringify(formJSON),
        },
      });
      alert("Saved");
      setDisabled(false);
      props.dispatch(hideLoading());
      props.dispatch(setViewForm());
    } catch (error) {
      console.log(error);
      setDisabled(false);
      props.dispatch(hideLoading());
      if (error.message.includes("E11000")) {
        return alert("Title is already present!");
      }
      alert("Something went wrong please try again");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Form Title"
          name="title"
          type="text"
          required
        />{" "}
        <button
          disabled={true}
          type="submit"
          className="btn btn-primary btn-sm pl-3 pr-3"
        >
          Their is bug so I have disabled save button
        </button>{" "}
        <button
          onClick={() => props.dispatch(setViewForm())}
          disabled={disabled}
          type="button"
          className="btn btn-danger btn-sm pl-3 pr-3"
        >
          Cancel
        </button>
      </form>
      <FormEdit
        form={{ display: "form" }}
        form={JSON.parse(props.data.formJSON)}
        onChange={(schema) => {
          console.log(schema);
          setFormJSON(schema);
        }}
      />
    </div>
  );
};

const mapStateToProps = ({ formBuilder }) => {
  return {
    data: formBuilder.data,
  };
};

export default connect(mapStateToProps)(UpdateForm);
