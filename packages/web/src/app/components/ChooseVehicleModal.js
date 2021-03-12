import React, { useEffect, useState } from 'react';
import { Modal,Table ,Form,Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { client } from '../graphql';
import { gql } from '@apollo/client';
import { loadUserVehicles } from '../redux/actions/vehicle';
import { toggleLoading } from '../redux/actions/user';

const GET_USER_VEHICLES = gql`
  query GetUserVehicles($userId: String!) {
    getUserVehicles(userId: $userId) {
      _id
      userId
      profileType
      licensePlate
      type
      make
      model
      year
      size
      color
      image
      createdAt
    }
  }
`;


const ChooseVehicleModal = ({profileType, handleClose,show,handleSave,addNewVehicle,userId,loadUserVehicles,toggleLoading})=>{

  

    const [vehicles,setVehicles] = useState([]);
    const [vehicle,setVehicle] = useState(null);
    const [loading,setLoading] = useState(true);

    const [validated,setValidated] = useState(false);

    const onSubmitHandler = ()=>{
        try {
            if(vehicle){
                handleSave(vehicle);
                setValidated(false);
                handleClose();
            }else{
                setValidated(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      const getVehicles = () => {
        console.log("Getting vehicles");
        toggleLoading();
        client
          .query({
            query: GET_USER_VEHICLES,
            variables: { userId: userId },
          })
          .then(({ data }) => {
            console.log(data.getUserVehicles);
            setVehicles(data.getUserVehicles);
            setVehicle(data.getUserVehicles[0]);
            loadUserVehicles(data.getUserVehicles);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            toggleLoading();
            setLoading(false);
          });
      }
      getVehicles();
    },[]);

    return <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Select A Vehicle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {loading?<div className="loading">Loading...</div>:<>
            {vehicles.filter(item=>item.profileType==profileType).length>0 && vehicle ? <>
              <h1 className="heading">{profileType=="personal"? "Choose one of your Personal Vehicles":"Choose one of your Business Vehicles"}</h1>
              <Form validated={validated}>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Control
                  as="select"
                  custom
                  value={vehicle._id}
                  onChange={(event) => {
                    setVehicle(vehicles.filter(item=>item._id==event.target.value)[0]);
                  }}
                  required
                >
                    {vehicles.filter(item=>item.profileType==profileType).map((item)=><option key={item._id} value={item._id} label={`${item.licensePlate} ${item.make} ${item.model}`}></option>)}
                  
                  
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    Please select a vehicle
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
            </>
            :<div className="lead">No Existing Vehicles</div>
                }</>}
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="primary" onClick={addNewVehicle}>Add New Vehicle</Button>
                  <Button variant="success" onClick={onSubmitHandler} disabled={vehicles.filter(item=>item.profileType==profileType).length==0}>Save Changes</Button>
              </Modal.Footer>
              </Modal>
              
};

const mapStateToProps = ({vehicle,user,auth})=>({
    // vehicles:vehicle.vehicles,
    profileType:user.profileType,
    userId:auth.data.attributes.sub
})

export default  connect(mapStateToProps,{loadUserVehicles,toggleLoading})(ChooseVehicleModal);