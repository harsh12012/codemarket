import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import cardImg from '../assets/images/card.png';
import CheckBoxItem from './CheckBoxItem';
import Cleave from 'cleave.js/react';

const AddCreditDebitCardModal = ({ show, handleClose, handleSave }) => {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    nameOnCard: '',
    setDefault: false
  });

  const { number, expiry, nameOnCard, setDefault } = cardDetails;

  const [validated, setValidated] = useState(false);

  const onSaveHandler = () => {
    if (number && expiry && nameOnCard) {
      handleSave(cardDetails);
      handleClose();
    } else {
      setValidated(true);
    }
  };

  const onChangeCardDetails = (event) => {
    setCardDetails({ ...cardDetails, [event.target.name]: event.target.value });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Credit/Debit Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="card-img">
          <img src={cardImg} alt="card-image" style={{ width: '100%' }} />
        </div>
        <Form validated={validated}>
          <div className="form-group">
            <Cleave
              placeholder="Enter your card number"
              options={{ creditCard: true }}
              className="form-control"
              name="number"
              onChange={(event) => {
                onChangeCardDetails(event);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
          </div>
          <div className="form-group">
            <Cleave
              placeholder="MM/YY"
              options={{ date: true, datePattern: ['m', 'y'] }}
              className="form-control"
              name="expiry"
              onChange={(event) => {
                onChangeCardDetails(event);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
          </div>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              name="nameOnCard"
              placeholder="Name on Card"
              value={nameOnCard}
              onChange={(event) => {
                onChangeCardDetails(event);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
          </Form.Group>

          <CheckBoxItem
            label="Set as Default"
            name="setDefault"
            onClick={(event) => {
              setCardDetails({
                ...cardDetails,
                setDefault: !setDefault
              });
            }}
            checked={setDefault}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSaveHandler}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCreditDebitCardModal;
