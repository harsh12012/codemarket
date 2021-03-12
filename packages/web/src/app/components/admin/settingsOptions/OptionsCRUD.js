import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCRUDPropertyType } from '@parkyourself-frontend/shared/hooks/adminSettings';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { Edit, Eye } from 'react-feather';
import Table from './OptionsTable';

export default function FormOptionCRUD({ id }) {
  const {
    payload,
    oneData,
    loading,
    handleDelete,
    handleChangeFormOption,
    handleSubmit,
    handleAddNew,
    handleEdit,
    form,
    setForm,
    disabled,
    handlePublish
  } = useCRUDPropertyType(id);
  const [preview, setPreview] = useState(false);

  const handleSubmitWeb = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <>
      <Modal size="lg" centered show={form.form} onHide={() => setForm({ ...form, form: false })}>
        <Modal.Body>
          <Form onSubmit={handleSubmitWeb} className="pt-3">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={({ target: { value } }) => handleChangeFormOption(value)}
                value={payload.options[payload.index] ? payload.options[payload.index].value : ''}
                type="text"
                name="value"
                placeholder="Name"
                required
              />
            </Form.Group>
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
                ) : form.edit ? (
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
                onClick={() => setForm({ ...form, form: false })}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {preview ? (
        <Edit size={30} className="cursor-pointer ml-3" onClick={() => setPreview(false)} />
      ) : (
        <>
          <Button variant="primary" onClick={handleAddNew}>
            Add New
          </Button>
          <Eye size={30} className="cursor-pointer ml-3" onClick={() => setPreview(true)} />
        </>
      )}
      {loading && (
        <div className="text-center pt-5">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
      {preview ? (
        <Form className="pt-4 pb-3">
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>{oneData.title}</Form.Label>
            <Form.Control as="select" custom>
              {oneData.options.map((o, i) =>
                o.published ? (
                  <option key={i} value={o.value}>
                    {o.label}
                  </option>
                ) : null
              )}
            </Form.Control>
          </Form.Group>
        </Form>
      ) : (
        <Table
          oneData={oneData}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handlePublish={handlePublish}
          disabled={disabled}
        />
      )}
    </>
  );
}

FormOptionCRUD.propTypes = {
  id: PropTypes.any.isRequired
};
