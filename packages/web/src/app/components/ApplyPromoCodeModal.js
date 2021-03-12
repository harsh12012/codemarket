import { useCRUDPromoCodes } from '@parkyourself-frontend/shared/hooks/promocode';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ApplyPromoCodeModal = ({ show, onCloseHandler,listingId=null }) => {
  const [promoCode, setPromoCode] = useState('');
  const {checkPromoCodeIsValid} = useCRUDPromoCodes()

  
  const onSubmitHandler = () => {
    const [checkPromoCode,] = await checkPromoCodeIsValid(promoCode,listingId)
  };

  return (
    <Modal show={show} onHide={onCloseHandler} className="apply-promo-code-modal">
      <Modal.Header closeButton>
        <Modal.Title>Apply Promo Code</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1 className="heading">Promo Code</h1>
        <Form>
          <Form.Group>
            <Form.Control
              placeholder="Enter your promo code here"
              value={promoCode}
              onChange={(event) => setPromoCode(event.target.value)}
            />

            <Form.Control.Feedback type="invalid">
              Apply your promo code and get a discount
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onSubmitHandler}>
          Apply{' '}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApplyPromoCodeModal;
