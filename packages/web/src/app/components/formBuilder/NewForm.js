import React, { useState } from "react";
import { connect } from "react-redux";
import { FormBuilder } from "react-formio";
import { useMutation, gql } from "@apollo/client";
import { showLoading, hideLoading } from "react-redux-loading";
import slugify from "slugify";
import { setViewForm, newData } from "../../redux/actions/formBuilder";

const CREATE_ONE_FORM = gql`
  mutation CreateOneForm(
    $userId: String!
    $title: String!
    $slug: String!
    $formJSON: String!
  ) {
    createOneForm(
      userId: $userId
      title: $title
      slug: $slug
      formJSON: $formJSON
    ) {
      _id
      title
      slug
      formJSON
    }
  }
`;

const NewForm = (props) => {
  const [createOneForm] = useMutation(CREATE_ONE_FORM);
  const [formJSON, setFormJSON] = useState(null);
  const [title, setTitle] = useState("");
  const [disabled, setDisabled] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    props.dispatch(showLoading());
    try {
      setDisabled(true);
      const response = await createOneForm({
        variables: {
          userId: props.userId,
          title: title,
          slug: slugify(title, { lower: true }),
          formJSON: JSON.stringify(formJSON),
        },
      });
      console.log(response.data.createOneForm);
      props.dispatch(newData(response.data.createOneForm));
      setDisabled(false);
      props.dispatch(hideLoading());
      props.dispatch(setViewForm());
    } catch (error) {
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
          disabled={disabled}
          type="submit"
          className="btn btn-primary btn-sm pl-3 pr-3"
        >
          Save
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
      <FormBuilder
        form={{ display: "form" }}
        onChange={(schema) => setFormJSON(schema)}
      />
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
    userId: auth.authenticated ? auth.data.attributes.sub : null,
  };
};

export default connect(mapStateToProps)(NewForm);
