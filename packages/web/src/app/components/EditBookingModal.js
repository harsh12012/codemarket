import React, { useEffect, useState } from 'react';
import { Modal, Button, Form,ProgressBar,InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import $ from "jquery";
import RadioItem from './RadioItem';
import StartEndDateTimePicker from './StartEndDateTimePicker';


const EditBookingModal = ({id,show, handleClose,handleUpdate,prevStart,prevEnd,profileType}) => {
  const [validated, setValidated] = useState(false);


  const [bookingData, setBookingData] = useState({
    start:prevStart,
    end:prevEnd,
    profileCategory:profileType,
  });

  const {start,end,profileCategory} = bookingData;


  const onSubmitHandler = async () => {
    try {
        if (start && end  && profileCategory) { 
              handleUpdate({...bookingData,id:id});
            setValidated(false);
            onCloseHandler();
        } else {
          setValidated(true);
        }
    } catch (error) {
      alert('Problem Updating Booking', 'Please try again');
    }
  };

  const onChangeBookingData = (event) => {
    setBookingData({ ...bookingData, [event.target.name]: event.target.value });
  };

  const onCloseHandler = ()=>{
    console.log("in close handler");
    $('.business-profile-modal').on('hidden.bs.modal', function(e)
    { 
        $(this).removeData();
    }) ;
    handleClose();
  }

  return (
    <Modal show={show} onHide={onCloseHandler} className="faq-modal">
      <Modal.Header closeButton>
        <Modal.Title>Edit Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form validated={validated} className="vehicle-form">
          
          <div className="question-item">
          <h4 className="heading">Profile Type</h4>
          <RadioItem
            name="profileCategory"
                label="Personal"
                onClick={() => {
                  setBookingData({...bookingData,profileCategory:'personal'});
                }}
                checked={profileCategory==="personal"}
              />
              <RadioItem
              name="profileCategory"
                label="Business"
                onClick={() => {
                    setBookingData({...bookingData,profileCategory:'business'});
                  }}
                checked={profileCategory==="business"}
              />
    
              {validated && !profileCategory && 
            <p className="invalid-feedback-text">
              Please select profile type.
            </p>
            }
          </div>

    <div className="question-item"><h4 className="heading">Change Timings</h4>
    <StartEndDateTimePicker start={start} end={end} onChange={(start,end)=>{setBookingData({...bookingData,start:start,end:end})}} />
            </div>
          
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onCloseHandler}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmitHandler}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};


  
  export default EditBookingModal;
