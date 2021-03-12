import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Spinner, Button, Modal } from 'react-bootstrap';
import { CheckCircle, X } from 'react-feather';
import { useStripeCreatePaymentIntent } from '@parkyourself-frontend/shared/hooks/stripe';

const CheckoutForm = ({
  createBookingHandler,
  validateInputs,
  amount,
  fee,
  driverId,
  name,
  email,
  type,
  ownerId
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(' ');
  const [show, setShow] = useState(false);
  const { createIntent } = useStripeCreatePaymentIntent();

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    const status = await validateInputs();
    if (status) {
      setShow(true);
    }
    // else {
    // toast.warn("Booking can't be done right now");
    // alert("Please select all fields");
    // }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setDisabled(true);
    try {
      const { data } = await createIntent({
        ownerId,
        amount,
        fee
      });
      const { secret } = data.stripeCreatePaymentIntent;

      const result = await stripe.confirmCardPayment(secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name
          }
        }
      });

      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        // console.log(result.error.message);
        alert(result.error.message);
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          handleClose();
          createBookingHandler(
            data.stripeCreatePaymentIntent.id,
            data.stripeCreatePaymentIntent.transferGroup
          );
          // alert("Payment was successful");
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
        }
      }
      setDisabled(false);
    } catch (error) {
      setDisabled(false);
      console.log('error ', error);
    }
  };

  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  return (
    <>
      <div className="text-center">
        <Button variant="primary" onClick={handleShow}>
          Book Now
        </Button>
      </div>

      <Modal show={show} onHide={() => {}} centered>
        <Modal.Body>
          <div className="position-absolute" style={{ right: '10px', top: '10px' }}>
            <X
              onClick={handleClose}
              className="cursor-pointer"
              style={{ pointerEvents: disabled ? 'none' : 'auto' }}
            />
          </div>
          <div className="text-center py-3">
            <CheckCircle className="text-success mb-2" size={50} />
            <h3>{`Pay $${amount} to book the space now`}</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            <button className="stripe-button" type="submit" disabled={error ? true : false}>
              {disabled ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                `Pay $${amount}`
              )}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ auth, user }) => {
  return {
    authenticated: auth.authenticated,
    name: auth.authenticated ? auth.data.attributes.name : null,
    email: auth.authenticated ? auth.data.attributes.email : null,
    driverId: auth.authenticated ? auth.data.attributes.sub : null,
    type: user.profileType
  };
};

export default connect(mapStateToProps)(CheckoutForm);
