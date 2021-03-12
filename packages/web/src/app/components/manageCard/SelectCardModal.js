import React from "react";
import { connect } from "react-redux";
import { Spinner, Modal, Card } from "react-bootstrap";

const SelectCardModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {props.cards.map((c, i) => {
            return (
              <div key={i} className="mt-2">
                <Card
                  className="cursor-pointer"
                  onClick={() => props.setSelectedCard(c)}
                >
                  <Card.Body>
                    <h6>
                      <span className="text-capitalize">{c.card.brand} </span>{" "}
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
          {props.loading && (
            <div className="text-center mt-5">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = ({ auth, user }) => {
  return {
    authenticated: auth.authenticated,
    name: auth.authenticated ? auth.data.attributes.name : null,
    email: auth.authenticated ? auth.data.attributes.email : null,
    driverId: auth.authenticated ? auth.data.attributes.sub : null,
    type: user.profileType,
  };
};

export default connect(mapStateToProps)(SelectCardModal);
