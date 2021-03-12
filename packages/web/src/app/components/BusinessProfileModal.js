import React, { useEffect, useState } from 'react';
import { Modal, Button, Form,ProgressBar,InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import $ from "jquery";

const countryCodes = [
    { code: "+93", country: "Afghanistan" },
    { code: "+358", country: "Aland Islands" },
    { code: "+355", country: "Albania" },
    { code: "+213", country: "Algeria" },
    { code: "+54", country: "Argentina" },
    { code: "+61", country: "Australia" },
    { code: "+43", country: "Austria" },
    { code: "+1", country: "Bahamas" },
    { code: "+973", country: "Bahrain" },
    { code: "+880", country: "Bangladesh" },
    { code: "+1", country: "Barbados" },
    { code: "+375", country: "Belarus" },
    { code: "+32", country: "Belgium" },
    { code: "+975", country: "Bhutan" },
    { code: "+55", country: "Brazil" },
    { code: "+359", country: "Bulgaria" },
    { code: "+855", country: "Cambodia" },
    { code: "+1", country: "Canada" },
    { code: "+236", country: "Central African Republic" },
    { code: "+56", country: "Chile" },
    { code: "+86", country: "China" },
    { code: "+57", country: "Colombia" },
    { code: "+506", country: "Costa Rica" },
    { code: "+53", country: "Cuba" },
    { code: "+420", country: "Czech Republic" },
    { code: "+45", country: "Denmark" },
    { code: "+1", country: "Dominica" },
    { code: "+1", country: "Dominican Republic" },
    { code: "+593", country: "Ecuador" },
    { code: "+20", country: "Egypt" },
    { code: "+251", country: "Ethiopia" },
    { code: "+679", country: "Fiji" },
    { code: "+358", country: "Finland" },
    { code: "+33", country: "France" },
    { code: "+995", country: "Georgia" },
    { code: "+49", country: "Germany" },
    { code: "+30", country: "Greece" },
    { code: "+299", country: "Greenland" },
    { code: "+224", country: "Guinea" },
    { code: "+852", country: "Hong Kong" },
    { code: "+36", country: "Hungary" },
    { code: "+91", country: "India" },
    { code: "+98", country: "Iran" },
    { code: "+964", country: "Iraq" },
    { code: "+39", country: "Italy" },
    { code: "+1", country: "Jamaica" },
    { code: "+81", country: "Japan" },
    { code: "+254", country: "Kenya" },
    { code: "+965", country: "Kuwait" },
    { code: "+961", country: "Lebanon" },
    { code: "+218", country: "Libya" },
    { code: "+352", country: "Luxembourg" },
    { code: "+853", country: "Macau" },
    { code: "+389", country: "Macedonia" },
    { code: "+60", country: "Malaysia" },
    { code: "+230", country: "Mauritius" },
    { code: "+52", country: "Mexico" },
    { code: "+95", country: "Myanmar" },
    { code: "+264", country: "Namibia" },
    { code: "+31", country: "Netherlands" },
    { code: "+64", country: "New Zealand" },
    { code: "+234", country: "Nigeria" },
    { code: "+850", country: "North Korea" },
    { code: "+47", country: "Norway" },
    { code: "+968", country: "Oman" },
    { code: "+92", country: "Pakistan" },
    { code: "+507", country: "Panama" },
    { code: "+63", country: "Philippines" },
    { code: "+351", country: "Portugal" },
    { code: "+974", country: "Qatar" },
    { code: "+242", country: "Republic of the Congo" },
    { code: "+7", country: "Russia" },
    { code: "+378", country: "San Marino" },
    { code: "+966", country: "Saudi Arabia" },
    { code: "+65", country: "Singapore" },
    { code: "+252", country: "Somalia" },
    { code: "+27", country: "South Africa" },
    { code: "+34", country: "Spain" },
    { code: "+94", country: "Sri Lanka" },
    { code: "+41", country: "Switzerland" },
    { code: "+886", country: "Taiwan" },
    { code: "+66", country: "Thailand" },
    { code: "+90", country: "Turkey" },
    { code: "+256", country: "Uganda" },
    { code: "+380", country: "Ukraine" },
    { code: "+971", country: "United Arab Emirates" },
    { code: "+44", country: "United Kingdom" },
    { code: "+1", country: "United States" },
    { code: "+39", country: "Vatican" },
    { code: "+58", country: "Venezuela" },
    { code: "+84", country: "Vietnam" },
    { code: "+967", country: "Yemen" },
    { code: "+260", country: "Zambia" },
    { code: "+263", country: "Zimbabwe" },
  ];


const BusinessProfileModal = ({ show, handleClose, handleSave,handleUpdate,edit,businessProfile,userId }) => {
    // const [activeIndex,setActiveIndex] = useState(1);
  // const [progress,setProgress] = useState(0);
  const [validated, setValidated] = useState(false);


  const [businessData, setBusinessData] = useState({
    businessName: '',
    businessEmail: '',
    businessMobile: '',
    businessMobileCode: countryCodes[0].code
  });

  const {businessName,businessEmail,businessMobile,businessMobileCode} = businessData;

  // const backButtonHandler =  ()=>{
  //   try {
  //     if(activeIndex!=1){
        // setActiveIndex(activeIndex-1);
        // setProgress(progress-34);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const onSubmitHandler = async () => {
    try {
      // if(activeIndex!=4){
        if (businessName &&  businessEmail && businessMobile && businessMobileCode) { 
          // setActiveIndex(activeIndex+1);
        // setProgress(progress+34);
        if(edit){
          handleUpdate({...businessData,id:businessProfile.data._id,userId:userId });
        }else{
        handleSave({...businessData,userId:userId  });
        }
        setValidated(false);
        onCloseHandler();
        } else {
          setValidated(true);
        }
        
      // }else{
        
        // setActiveIndex(1);
        // setProgress(0); 
        // onCloseHandler();
      // }
      
    } catch (error) {
      alert('Problem adding vehicle', 'Please try again');
    }
  };

  const onChangeBusinessData = (event) => {
    setBusinessData({ ...businessData, [event.target.name]: event.target.value });
  };

  const onCloseHandler = ()=>{
    console.log("in close handler");
    $('.business-profile-modal').on('hidden.bs.modal', function(e)
    { 
        $(this).removeData();
    }) ;
    handleClose();
  }

  useEffect(()=>{
    console.log(edit);
    if(edit){
      const getBusinessData = ()=>{
        const {businessName,businessEmail,businessMobile,businessMobileCode} = businessProfile.data;
        setBusinessData({businessName:businessName,businessEmail:businessEmail,businessMobile:businessMobile,businessMobileCode:businessMobileCode});

      }
      getBusinessData();
    }else{
      // setActiveIndex(1);
        // setProgress(0);
    
  }},[edit]);

  return (
    <Modal show={show} onHide={onCloseHandler} className="business-profile-modal">
      <Modal.Header closeButton>
        <Modal.Title>{edit?"Edit Business Profile":"Create Business Profile"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {/* <ProgressBar now={progress} /> */}
        <Form validated={validated} className="vehicle-form">
          
          {/* {activeIndex==1 &&  */}
          <div className="question-item">
          <h4 className="heading">What's the name of your business?</h4>
          <Form.Group controlId='formBasicEmail'>
            <Form.Control
              type='text'
              name='businessName'
              placeholder='Business Name'
              value={businessName}
              onChange={(event) => {
                onChangeBusinessData(event);
              }}
              required
            />
            <Form.Control.Feedback type='invalid'>
              This field is required
            </Form.Control.Feedback>
          </Form.Group>
          </div>
    {/* } */}
    {/* {activeIndex==2 &&  */}
    <div className="question-item">
    <h4 className="heading">Tell us your business email?</h4>
          <Form.Group controlId='formBasicEmail'>
            <Form.Control
              type='text'
              name='businessEmail'
              placeholder='Business Email'
              value={businessEmail}
              onChange={(event) => {
                onChangeBusinessData(event);
              }}
              required
            />
            <Form.Control.Feedback type='invalid'>
              This field is required
            </Form.Control.Feedback>
          </Form.Group>
          </div>
    {/* } */}
    {/* {activeIndex==3 &&  */}
    <div className="question-item"><h4 className="heading">Tell us your business mobile number</h4>
    <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Control
                      as="select"
                      name="businessMobileCode"
                      custom
                      value={businessMobileCode}
                      onChange={(event) => {
                        onChangeBusinessData(event);
                      }}
                    >
                      {countryCodes.map((item) => (
                        <option key={item.country}>{item.code}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </InputGroup.Prepend>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  name="businessMobile"
                  type="number"
                  min="0"
                  placeholder="Mobile Number"
                  value={businessMobile}
                  onChange={(event) => {
                    onChangeBusinessData(event);
                  }}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  This field is required
                </Form.Control.Feedback>
              </InputGroup>
            </div>
            {/* } */}

          {/* {activeIndex==4 && 
          <div className="question-item"><h4 className="heading">Save your Business Profile</h4>
          <Button variant="primary" onClick={onSubmitHandler}>Save</Button>
          </div>
          } */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onCloseHandler}>
          Close
        </Button>
        {/* {activeIndex!=1 && 
        <Button variant='primary' onClick={()=>{backButtonHandler()}}>
          Back
        </Button>
} */}
{/* {activeIndex!=4 &&  */}
        <Button variant='success' onClick={()=>{onSubmitHandler()}}>
          Save
        </Button>
{/* } */}
      </Modal.Footer>
    </Modal>
  );
};


const mapStateToProps = ({businessProfile,auth})=>{
    return {
      businessProfile,
      userId:auth.data.attributes.sub
    }
  }
  
  export default connect(mapStateToProps)(BusinessProfileModal);
