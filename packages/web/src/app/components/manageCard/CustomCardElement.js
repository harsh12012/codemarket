import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Spinner, Button, Modal, Card } from 'react-bootstrap';
import { CheckCircle, Trash, X } from 'react-feather';
import { gql } from '@apollo/client';
import { client } from '../../graphql/index';
// import "./css/stripestyle.css";

const Create_Setup_Intent = gql`
  query StripeCreateSetupIntent(
    $driverId: String!
    $name: String!
    $email: String!
    $type: String!
  ) {
    stripeCreateSetupIntent(driverId: $driverId, name: $name, email: $email, type: $type)
  }
`;

const stripe_List_User_Cards = gql`
  query StripeListUserCards($driverId: String!, $type: String!) {
    stripeListUserCards(driverId: $driverId, type: $type)
  }
`;

const stripe_Get_Payment_Method = gql`
  query stripeGetPaymentMethod($payment_method: String!) {
    stripeGetPaymentMethod(payment_method: $payment_method)
  }
`;

const stripe_Detach_Payment_Method = gql`
  query StripeDetachPaymentMethod($payment_method: String!) {
    stripeDetachPaymentMethod(payment_method: $payment_method)
  }
`;

const CustomCardElement = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardError, setError] = useState(' ');
  const [cards, setCards] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getCardsList = async () => {
    setLoading(true);
    let tempCards = await client.query({
      query: stripe_List_User_Cards,
      variables: {
        driverId: props.driverId,
        type: props.type
      }
    });
    if (JSON.parse(tempCards.data.stripeListUserCards) !== null) {
      setCards(JSON.parse(tempCards.data.stripeListUserCards));
    }
    setLoading(false);
  };

  const getCard = async (payment_method) => {
    try {
      setLoading(true);
      let tempCard = await client.query({
        query: stripe_Get_Payment_Method,
        variables: {
          payment_method
        }
      });

      if (JSON.parse(tempCard.data.stripeGetPaymentMethod)) {
        setCards([...cards, JSON.parse(tempCard.data.stripeGetPaymentMethod)]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCardsList();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setDisabled(true);

    try {
      let { data } = await client.query({
        query: Create_Setup_Intent,
        variables: {
          driverId: props.driverId,
          name: props.name,
          email: props.email,
          type: props.type
        }
      });

      const client_secret = data.stripeCreateSetupIntent;

      const result = await stripe.confirmCardSetup(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: props.driverName
          }
        }
      });

      if (result.error) {
        alert(JSON.stringify(result.error.message));
      } else {
        getCard(result.setupIntent.payment_method);
        setShow(false);
        alert('Your card is saved');
      }
      setDisabled(false);
    } catch (error) {
      setDisabled(false);
      alert('Something went wrong!');
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

  const handleDeleteCard = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this card?')) {
        setDisabled(true);
        await client.query({
          query: stripe_Detach_Payment_Method,
          variables: {
            payment_method: id
          }
        });
        setCards(cards.filter((c) => c.id !== id));
        setDisabled(false);
      }
    } catch (error) {
      setDisabled(false);
      alert('Something went wrong!');
      console.log('error ', error);
    }
  };

  if (!props.authenticated) {
    return null;
  }

  return (
    <>
      <div className="container">
        <h2>My Saved Cards</h2>
        <Button
          variant="primary"
          onClick={handleShow}
          style={{ pointerEvents: disabled ? 'none' : 'auto' }}
          className="mb-3">
          Add New Card
        </Button>
        <div>
          {cards.map((c, i) => {
            return (
              <div key={i} className="mt-2">
                <div className="position-relative">
                  <div
                    className="position-absolute"
                    style={{ zIndex: 101, right: '10px', top: '10px' }}>
                    <Trash
                      style={{ pointerEvents: disabled ? 'none' : 'auto' }}
                      onClick={() => handleDeleteCard(c.id)}
                      className="cursor-pointer text-danger"
                    />
                  </div>
                </div>
                <Card>
                  <Card.Body>
                    <h6>
                      <span className="text-capitalize">{c.card.brand} </span>{' '}
                      {` **** **** **** ${c.card.last4}`}
                    </h6>
                    <p className="mb-0 pb-0">
                      Expiry {c.card.exp_month}/{c.card.exp_year}
                    </p>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
          {loading && (
            <div className="text-center mt-5">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          )}
        </div>
      </div>

      <Modal show={show} centered>
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
            <h3>{`Card is securely stored with stripe`}</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            <button
              className="stripe-button"
              type="submit"
              disabled={cardError ? true : false}
              style={{ pointerEvents: disabled ? 'none' : 'auto' }}>
              {disabled ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                `Save Card`
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

export default connect(mapStateToProps)(CustomCardElement);
