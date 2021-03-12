import React from 'react';
import successImg from '../assets/images/good-job.png';
import { Modal, Button } from 'react-bootstrap';
import Link from 'next/link';

const BookingSuccessModal = ({ show, handleClose, viewCodeHandler }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      {/* <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <div className="booking-success">
          <img src={successImg} alt="success" />
          <h1 className="title">Good Job</h1>
          <p className="description">Your parking area has been successfully booked</p>
          <Button variant="primary" onClick={() => {}}>
            Send Gift
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={viewCodeHandler}>
          View Code
        </Button>
        <Link
          href="/parkings"
          onClick={() => {
            handleClose();
          }}>
          <Button variant="primary">Go To Home</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingSuccessModal;
