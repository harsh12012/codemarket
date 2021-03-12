import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import slugify from 'slugify';
import { useMutation, gql } from '@apollo/client';
import { showLoading, hideLoading } from 'react-redux-loading';
import { XCircle, PlusCircle } from 'react-feather';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { client } from '../../graphql/index';
import Table from './FormOptionTable';

const CREATE_ONE = gql`
  mutation CreateOneFormOption(
    $createdBy: String!
    $title: String!
    $options: [FormOptionInput]
    $formName: String!
  ) {
    createOneFormOption(
      createdBy: $createdBy
      title: $title
      formName: $formName
      options: $options
    ) {
      _id
      title
      options {
        label
        value
        published
      }
      formName
      published
    }
  }
`;

const UPDATE_ONE = gql`
  mutation UpdateOneFormOption(
    $id: ID!
    $title: String
    $options: [FormOptionInput]
    $formName: String
    $updatedBy: String
  ) {
    updateOneFormOption(
      id: $id
      title: $title
      formName: $formName
      options: $options
      updatedBy: $updatedBy
    ) {
      _id
      title
      options {
        label
        value
        published
      }
      formName
      published
    }
  }
`;

const DELETE_ONE = gql`
  mutation DeleteOneFormOption($id: ID!) {
    deleteOneFormOption(id: $id)
  }
`;

const GET_ALL = gql`
  query GetAllFormOptions {
    getAllFormOptions {
      _id
      title
      options {
        label
        value
        published
      }
      formName
      published
    }
  }
`;

const PUBLISH_UPDATE_ONE = gql`
  mutation UpdateOneFormOption($id: ID!, $published: Boolean, $updatedBy: String) {
    updateOneFormOption(id: $id, published: $published, updatedBy: $updatedBy) {
      _id
      title
      options {
        label
        value
        published
      }
      formName
      published
    }
  }
`;

function FormOptionCRUD(props) {
  const [createOneFormOption] = useMutation(CREATE_ONE);
  const [updateOneFormOption] = useMutation(UPDATE_ONE);
  const [deleteOneFormOption] = useMutation(DELETE_ONE);
  const [publishFormOptionMutation] = useMutation(PUBLISH_UPDATE_ONE);
  const [payload, setPayload] = useState({});
  const [edit, setEdit] = useState(false);
  const [disabled, updateDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [tempFormOption, setTempFormOption] = useState({
    title: '',
    options: []
  });
  const [showModal, setShowModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const getAllData = async () => {
    props.dispatch(showLoading());
    setLoading(true);
    try {
      let { data } = await client.query({
        query: GET_ALL
      });
      // console.log("Data", data);
      setAllData(data.getAllFormOptions);
      props.dispatch(hideLoading());
      setLoading(false);
    } catch (error) {
      // console.log(error);
      props.dispatch(hideLoading());
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateDisabled(true);
    props.dispatch(showLoading());
    try {
      const response = await createOneFormOption({
        variables: {
          createdBy: props.userId,
          title: payload.title,
          formName: payload.formName,
          options: payload.options
        }
      });
      updateDisabled(false);
      props.dispatch(hideLoading());
      setAllData([...allData, response.data.createOneFormOption]);
      setPayload({
        id: '',
        title: ''
      });
      setShowModal(false);
      alert('Succesfully created!');
    } catch (error) {
      updateDisabled(false);
      props.dispatch(hideLoading());
      if (error.message.includes('E11000')) {
        return alert('Title is already present!');
      }
      alert('Something went wrong please try again');
    }
  };

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = async (id) => {
    try {
      updateDisabled(true);
      if (window.confirm('Are you sure you want to delete this item!')) {
        props.dispatch(showLoading());
        await deleteOneFormOption({
          variables: {
            id: id
          }
        });
        setAllData(allData.filter((r) => r._id !== id));
        updateDisabled(false);
        props.dispatch(hideLoading());
      } else {
        return updateDisabled(false);
      }
    } catch (error) {
      props.dispatch(hideLoading());
      updateDisabled(false);
      alert('Something went wrong!');
    }
  };

  const handleEdit = (data) => {
    setPayload(data);
    setEdit(true);
    setShowModal(true);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    updateDisabled(true);
    props.dispatch(showLoading());
    try {
      let res = await updateOneFormOption({
        variables: {
          title: payload.title,
          updatedBy: props.userId,
          options: [
            ...payload.options.map((i) => ({
              value: i.value,
              label: i.label,
              published: true
            }))
          ],
          id: payload._id,
          formName: payload.formName
        }
      });
      setAllData(allData.map((r) => (r._id === payload._id ? res.data.updateOneFormOption : r)));
      props.dispatch(hideLoading());
      updateDisabled(false);
      setShowModal(false);
    } catch (error) {
      console.log(error);
      updateDisabled(false);
      props.dispatch(hideLoading());
      if (error.message.includes('E11000')) {
        return alert('Title is already present!');
      }
      alert('Something went wrong please try again');
    }
  };

  const handlePublish = async ({ published, id }) => {
    try {
      updateDisabled(true);
      props.dispatch(showLoading());
      let res = await publishFormOptionMutation({
        variables: {
          id: id,
          published: published
        }
      });
      setAllData(
        allData.map((r) =>
          r._id === res.data.updateOneFormOption._id ? res.data.updateOneFormOption : r
        )
      );
      updateDisabled(false);
      props.dispatch(hideLoading());
    } catch (error) {
      updateDisabled(false);
      props.dispatch(hideLoading());
      alert('Something went wrong!');
    }
  };

  const handleChangeFormOption = (name, value, index) => {
    let tempA = [...payload.options];
    tempA = tempA.map((a, i) => {
      if (i === index) {
        let tempa = a;
        tempa[name] = value;
        if (name === 'label' && tempa.value === '') tempa.value = slugify(value, { lower: true });
        return tempa;
      } else {
        return a;
      }
    });
    setPayload({
      ...payload,
      options: tempA
    });
  };

  const removeFormOption = (index) => {
    let tempA = [...payload.options];
    tempA.splice(index, 1);
    setPayload({
      ...payload,
      options: tempA
    });
  };

  const handlePreview = (data) => {
    setTempFormOption(data);
    setShowPreviewModal(true);
  };

  return (
    <>
      <Modal
        size="lg"
        // centered
        show={showModal}
        onHide={() => setShowModal(false)}>
        <Modal.Body>
          <Form onSubmit={edit ? handleSubmitEdit : handleSubmit} className="pt-3">
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={payload.title}
                type="text"
                name="title"
                placeholder="Title"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Form Name</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={payload.formName}
                type="text"
                name="formName"
                placeholder="Form Name"
                required
              />
            </Form.Group>
            <Row>
              <Col md="auto">
                <Form.Label>Options</Form.Label>
              </Col>
              <Col md="auto" className="p-0">
                <PlusCircle
                  size={24}
                  className="text-primary cursor-pointer"
                  onClick={() =>
                    setPayload({
                      ...payload,
                      options: [...payload.options, { label: '', value: '', published: true }]
                    })
                  }
                />
              </Col>
            </Row>
            {payload.options &&
              payload.options.map((a, i) => {
                return (
                  <Row key={i} className="mt-1">
                    <Col sm={5}>
                      <Form.Control
                        onChange={(e) => handleChangeFormOption('label', e.target.value, i)}
                        value={a.label}
                        type="text"
                        name="aminityLabel"
                        placeholder={`Option ${i + 1} Label`}
                        required
                      />
                    </Col>
                    <Col sm={5}>
                      <Form.Control
                        placeholder="Last name"
                        onChange={(e) => handleChangeFormOption('value', e.target.value, i)}
                        value={a.value}
                        type="text"
                        name="aminityvalue"
                        placeholder={`Option ${i + 1} Value`}
                        required
                      />
                    </Col>
                    <Col sm={2}>
                      {payload.options.length > 1 && (
                        <XCircle
                          size={30}
                          className="text-danger cursor-pointer mt-1"
                          onClick={() => removeFormOption(i)}
                        />
                      )}
                    </Col>
                  </Row>
                );
              })}
            <div className="mt-3">
              <Button disabled={disabled} type="submit" variant="primary">
                {disabled ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : edit ? (
                  'Update'
                ) : (
                  'Create'
                )}
              </Button>{' '}
              <Button
                className="ml-2"
                disabled={disabled}
                type="button"
                variant="danger"
                onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal size="lg" centered show={showPreviewModal} onHide={() => setShowPreviewModal(false)}>
        <Modal.Body>
          <Form className="pt-4 pb-3">
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>
                _id - <b>{tempFormOption._id}</b>
              </Form.Label>
              <br />
              <Form.Label>{tempFormOption.title}</Form.Label>
              <Form.Control as="select" custom>
                {tempFormOption.options.map((o, i) => (
                  <option key={i} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button
              disabled={disabled}
              type="button"
              variant="primary"
              onClick={() => setShowPreviewModal(false)}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Button
        variant="primary"
        onClick={() => {
          setPayload({
            _id: '',
            title: '',
            formName: '',
            options: [{ label: '', value: '', published: true }]
          });
          setEdit(false);
          setShowModal(true);
        }}>
        Add New
      </Button>
      <Table
        allData={allData}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        setTempFormOption={setTempFormOption}
        handlePublish={handlePublish}
        disabled={disabled}
        handlePreview={handlePreview}
      />
    </>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
    userId: auth.authenticated ? auth.data.attributes.sub : null
  };
};

export default connect(mapStateToProps)(FormOptionCRUD);
