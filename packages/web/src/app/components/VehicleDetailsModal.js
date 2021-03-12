import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import placeholderImg from '../assets/images/placeholder-img.jpg';

const VehicleDetailsModal = ({ vehicles, id, handleClose, show }) => {
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    setVehicle(vehicles.filter((item) => item._id == id)[0]);
  }, [id]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Loading...'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {vehicle ? (
          <>
            <img src={vehicle.image ? vehicle.image : placeholderImg} style={{ width: '100%' }} />
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>License Plate</td>
                  <td>{vehicle.licensePlate}</td>
                </tr>
                <tr>
                  <td>Vehicle Type</td>
                  <td>{vehicle.type}</td>
                </tr>
                <tr>
                  <td>Make</td>
                  <td>{vehicle.make}</td>
                </tr>
                <tr>
                  <td>Model</td>
                  <td>{vehicle.model}</td>
                </tr>
                <tr>
                  <td>Year</td>
                  <td>{vehicle.year}</td>
                </tr>
                <tr>
                  <td>Size</td>
                  <td>{vehicle.size}</td>
                </tr>
                <tr>
                  <td>Color</td>
                  <td>{vehicle.color ? vehicle.color : 'No Color Provided'}</td>
                </tr>
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

const mapStateToProps = ({ vehicle }) => ({
  vehicles: vehicle.vehicles
});

export default connect(mapStateToProps)(VehicleDetailsModal);
