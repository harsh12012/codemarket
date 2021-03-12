import React from "react";
import { Modal, Button } from "react-bootstrap";
import CheckIn from "../../../pages/CheckIn";
import { X } from "react-feather";

const ORcodeModal = ({ show, handleClose }) => (
  <Modal centered size="lg" show={show} onHide={() => {}}>
    <Modal.Body>
      <div className="position-absolute" style={{ right: "10px", top: "10px" }}>
        <X onClick={handleClose} className="cursor-pointer" />
      </div>
      <div className="pt-4">
        <CheckIn />
      </div>
    </Modal.Body>
  </Modal>
);

export default ORcodeModal;
