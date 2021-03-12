import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import moment from 'moment';

const PromoCodeDetailsModal = ({ promoCode, handleClose, show }) => {

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {promoCode ? `Promo Code : ${promoCode.code}` : 'Promo Code Details'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {promoCode ? (
          <>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>Code</td>
                  <td>{promoCode.code}</td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td>{promoCode.discount * 100}%</td>
                </tr>
                <tr>
                  <td>Start Date</td>
                  <td>{moment(Date.parse(promoCode.startDate)).format('llll')}</td>
                </tr>
                <tr>
                  <td>End Date</td>
                  <td>{moment(Date.parse(promoCode.endDate)).format('llll')}</td>
                </tr>
                <tr>
                  <td>Quantity</td>
                  <td>{promoCode.quantity}</td>
                </tr>
                <tr>
                  <td>Remaining</td>
                  <td>{promoCode.remaining}</td>
                </tr>
                {/* <tr>
      <td>Valid</td>
      <td>{promoCode.isValid?"True":"False"}</td>
    </tr>
    <tr>
      <td>Max Redeem Limit</td>
      <td>{promoCode.maxLimit}</td>
    </tr> */}
                <tr>
                  <td>Created At</td>
                  <td>{moment(Date.parse(promoCode.createdAt)).format('llll')}</td>
                </tr>
                {/* <tr>
      <td>Expires At</td>
      <td>{moment(Date.parse(promoCode.expiresAt)).format('llll')}</td>
    </tr> */}
              </tbody>
            </Table>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PromoCodeDetailsModal;
