import React from 'react'
import { Card, Modal,Button } from 'react-bootstrap';
import moment from 'moment';

const EarlyCheckInSuccessModal = ({show,handleClose,start,end,address}) => {

    return (
        <Modal show={show} onHide={handleClose} className="faq-modal">
      <Modal.Header closeButton>
        <Modal.Title>Early Check-In Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
    <p className="lead">Your early check-in for parking location {address} has been successfully confirmed. Updated timings are as below :</p>
            <br/>
            <br/>
            <Card>
                <Card.Body>
               Start : {moment(start).format('lll')}
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                End : {moment(end).format('lll')}
                </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>OK</Button>
          </Modal.Footer>
          </Modal>
    )
}

export default EarlyCheckInSuccessModal;