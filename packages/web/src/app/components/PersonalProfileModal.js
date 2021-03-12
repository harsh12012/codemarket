import React, { useEffect, useState } from 'react';
import { Modal, Button, Form,ProgressBar,InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Auth } from "aws-amplify";
import $ from "jquery";
import { toast } from 'react-toastify';
import { setAuthUser } from '../redux/actions/auth';

const PersonalProfileModal = (props) => {
    const { show, handleClose,userData,} = props;
  const [validated, setValidated] = useState(false);


  const [codeSent,setCodeSent] = useState(false);

  const [personalData, setPersonalData] = useState({
    name: userData.name,
    email: userData.email,
    code : ''
  });

  const {name,email,code} = personalData;


  const onSubmitHandler = async () => {
      // if(activeIndex!=4){
        if (name && email) { 
            if(name===userData.name && email === userData.email){
                toast.info("No Information has been changed");
            onCloseHandler();
            return;
            }
        setValidated(false);
        try {
            const user = await Auth.currentAuthenticatedUser();
            console.log(user);
            await Auth.updateUserAttributes(user, { email: email,name:name });
            setCodeSent(true);
          } catch (error) {
            toast.warn("Something went wrong");
          }
        } else {
          setValidated(true);
        }
  };

  const onVerify = async ()=>{
      try {
          if(code.length>0){
            await Auth.verifyCurrentUserAttributeSubmit("email", code);
            const user = await Auth.currentAuthenticatedUser();
            if (user) {
                const data = {
                  attributes: user.attributes,
                  signInUserSession: user.signInUserSession,
                };
        
                props.dispatch(setAuthUser(data));
                // props.dispatch(initializeUser());
              }
            toast.success("Profile Updated Successfully");
            onCloseHandler();
          }else{
              toast.warn("Length of code can't be zero");
          }
      } catch (error) {
          toast.warn("Failed to verify code.");
          onCloseHandler();
      }
  }

  const onChangePersonalData = (event) => {
    setPersonalData({ ...personalData, [event.target.name]: event.target.value });
  };

  const onCloseHandler = ()=>{
    console.log("in close handler");
    $('.business-profile-modal').on('hidden.bs.modal', function(e)
    { 
        $(this).removeData();
    }) ;
    handleClose();
  }

  useEffect(()=>{setCodeSent(false)},[]);

  return (
    <Modal show={show} onHide={onCloseHandler} className="business-profile-modal">
      <Modal.Header closeButton>
        <Modal.Title>Edit Personal Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {codeSent? <Form validated={validated} className="vehicle-form">
          <div className="question-item">
          <h4 className="heading">We have sent a confirmation code to {email}</h4>
          <Form.Group controlId='formBasicEmail'>
            <Form.Control
              type='text'
              name='code'
              placeholder='Enter your code here'
              value={code}
              onChange={(event) => {
                onChangePersonalData(event);
              }}
              required
            />
            <Form.Control.Feedback type='invalid'>
              This field is required
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" onClick={onVerify}>Verify</Button>
          </div>
          </Form>:
        <Form validated={validated} className="vehicle-form">
          
          {/* {activeIndex==1 &&  */}
          <div className="question-item">
          <h4 className="heading">Your Name</h4>
          <Form.Group controlId='formBasicEmail'>
            <Form.Control
              type='text'
              name='name'
              placeholder='Name'
              value={name}
              onChange={(event) => {
                onChangePersonalData(event);
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
    <h4 className="heading">Your Email</h4>
          <Form.Group controlId='formBasicEmail'>
            <Form.Control
              type='text'
              name='email'
              placeholder='Email'
              value={email}
              onChange={(event) => {
                onChangePersonalData(event);
              }}
              required
            />
            <Form.Control.Feedback type='invalid'>
              This field is required
            </Form.Control.Feedback>
          </Form.Group>
          </div>
    {/* } */}

        </Form>}
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


const mapStateToProps = ({auth})=>{
    return {
      userData:auth.data.attributes
    }
  }
  
  export default connect(mapStateToProps)(PersonalProfileModal);
