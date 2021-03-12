import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useMutation, gql } from "@apollo/client";
import { showLoading, hideLoading } from "react-redux-loading";
import { Button } from "react-bootstrap";
import RoomTable from "./FormTable";
import {
  updateFormData,
  setCreateForm,
  setUpdateForm,
  deleteFormData,
} from "../../redux/actions/formBuilder";

const DELETE_ONE_FORM = gql`
  mutation DeleteOneForm($id: ID!) {
    deleteOneForm(id: $id)
  }
`;

const PUBLISH_UPDATE_ONE_FORM = gql`
  mutation UpdateOneForm($id: ID!, $published: Boolean) {
    updateOneForm(id: $id, published: $published) {
      _id
      title
      slug
      published
      formJSON
    }
  }
`;

function FormCRUD(props) {
  const [deleteOneForm] = useMutation(DELETE_ONE_FORM);
  const [publishFormMutation] = useMutation(PUBLISH_UPDATE_ONE_FORM);
  const [payload, setPayload] = useState({
    _id: "",
    images: [],
    title: "",
    price: "",
    description: "",
  });
  const [edit, setEdit] = useState(false);
  const [disabled, updateDisabled] = useState(false);
  const [allRooms, setAllRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (id) => {
    try {
      updateDisabled(true);
      if (window.confirm("Are you sure you want to delete this item!")) {
        props.dispatch(showLoading());
        const response = await deleteOneForm({
          variables: {
            id: id,
          },
        });
        // setAllRooms(allRooms.filter((r) => r._id !== id));
        props.dispatch(deleteFormData(id));
        updateDisabled(false);
        props.dispatch(hideLoading());
      } else {
        return updateDisabled(false);
      }
    } catch (error) {
      props.dispatch(hideLoading());
      updateDisabled(false);
      alert("Something went wrong!");
    }
  };

  const handleEdit = (form) => {
    props.dispatch(setUpdateForm(form));
  };

  const handlePublish = async ({ published, id }) => {
    try {
      updateDisabled(true);
      props.dispatch(showLoading());
      let res = await publishFormMutation({
        variables: {
          id: id,
          published: published,
        },
      });
      // setAllRooms(
      //   allRooms.map((r) =>
      //     r._id === res.data.updateOneForm._id ? res.data.updateOneForm : r
      //   )
      // );
      props.dispatch(updateFormData(res.data.updateOneForm));
      updateDisabled(false);
      props.dispatch(hideLoading());
    } catch (error) {
      updateDisabled(false);
      props.dispatch(hideLoading());
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => props.dispatch(setCreateForm())}>
        Create New Form
      </Button>
      <RoomTable
        allRooms={props.allFormData}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handlePublish={handlePublish}
        disabled={disabled}
      />
    </>
  );
}

const mapStateToProps = ({ auth, formBuilder }) => {
  return {
    allFormData: formBuilder.allFormData,
    authenticated: auth.authenticated,
    userId: auth.authenticated ? auth.data.attributes.sub : null,
  };
};

export default connect(mapStateToProps)(FormCRUD);
