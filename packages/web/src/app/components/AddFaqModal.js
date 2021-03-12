import React, { useEffect, useState } from 'react';
import { Modal, Button, Form,ProgressBar,InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import $ from "jquery";
import CheckBoxItem from './CheckBoxItem';

const AddFaqModal = ({ show, handleClose, handleSave,handleUpdate=()=>{},edit=false,prevData=null}) => {
  //   const [activeIndex,setActiveIndex] = useState(1);
  // const [progress,setProgress] = useState(0);
  const [validated, setValidated] = useState(false);


  const [faqData, setFaqData] = useState({
    roles: [],
    topic: '',
    question: '',
    answer:''
  });

  const {roles,topic,question,answer} = faqData;

  // const backButtonHandler =  ()=>{
  //   try {
  //     if(activeIndex!=1){
  //       setActiveIndex(activeIndex-1);
  //       setProgress(progress-25);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const onSubmitHandler = async () => {
    try {
      // if(activeIndex!=5){
        if ((roles.length>0) && (topic) && (question) && ( answer)) { 
              // setActiveIndex(activeIndex+1);
            // setProgress(progress+25);
            if(edit){
              handleUpdate({...faqData,id:prevData._id});
            }else{
            handleSave(faqData);
            }
            // setActiveIndex(1);
            // setProgress(0); 
            setValidated(false);
            onCloseHandler();
        } else {
          setValidated(true);
        }
        
      // }else{
      //   if(edit){
      //     handleUpdate({...faqData,id:prevData._id});
      //   }else{
      //   handleSave(faqData);
      //   }
        // setActiveIndex(1);
        // setProgress(0); 
        // onCloseHandler();
      // }
      
    } catch (error) {
      alert('Problem Adding FAQ', 'Please try again');
    }
  };

  const onChangeFaqData = (event) => {
    setFaqData({ ...faqData, [event.target.name]: event.target.value });
  };

  const onCloseHandler = ()=>{
    console.log("in close handler");
    $('.business-profile-modal').on('hidden.bs.modal', function(e)
    { 
        $(this).removeData();
    }) ;
    handleClose();
  }

  const toggleRoles = (role) => {
    console.log(roles);
    console.log(role);
    if (!roles) {
      setFaqData({
        ...faqData,
        roles: [role],
      });
    } else {
      if (roles.includes(role)) {
        setFaqData({
          ...faqData,
          roles: roles.filter((item) => item != role),
        });
      } else {
        setFaqData({ ...faqData, roles: [...roles, role] });
      }
    }

    console.log(roles);
  };

  useEffect(()=>{
    console.log(edit);
    if(edit && prevData){
    //  setProgress(0);
    // setActiveIndex(1);
      setFaqData({roles:prevData.roles,topic:prevData.topic,question:prevData.question,answer:prevData.answer});
}
},[]);

  return (
    <Modal show={show} onHide={onCloseHandler} className="faq-modal">
      <Modal.Header closeButton>
        <Modal.Title>{edit?"Edit FAQ":"Create FAQ"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {/* <ProgressBar now={progress} /> */}
        <Form validated={validated} className="vehicle-form">
          
          {/* {activeIndex==1 &&  */}
          <div className="question-item">
          <h4 className="heading">Which role is the FAQ for?</h4>
          <CheckBoxItem
                label="Driver"
                onClick={() => {
                  toggleRoles('Driver');
                }}
                checked={roles ? roles.includes("Driver") : false}
              />
              <CheckBoxItem
                label="Space Owner"
                onClick={() => {
                  toggleRoles("Space Owner");
                }}
                checked={roles ? roles.includes("Space Owner") : false}
              />
              <CheckBoxItem
                label="Admin"
                onClick={() => {
                  toggleRoles("Admin");
                }}
                checked={roles ? roles.includes("Admin") : false}
              />
              {validated && roles.length==0 && 
            <p className="invalid-feedback-text">
              Please select atleast one role.
            </p>
            }
          </div>
    {/* } */}
    {/* {activeIndex==2 &&  */}
    <div className="question-item">
    <h4 className="heading">What is the Topic of FAQ?</h4>
          <Form.Group controlId='formBasicEmail'>
            <Form.Control
              type='text'
              name='topic'
              placeholder='Topic'
              value={topic}
              onChange={(event) => {
                onChangeFaqData(event);
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
    <div className="question-item"><h4 className="heading">Enter the question/phrase for FAQ</h4>
    <Form.Group controlId='formBasicEmail'>
            <Form.Control
              type='text'
              name='question'
              placeholder='Question/Phrase'
              value={question}
              onChange={(event) => {
                onChangeFaqData(event);
              }}
              required
            />
            <Form.Control.Feedback type='invalid'>
              This field is required
            </Form.Control.Feedback>
          </Form.Group>
            </div>
            {/* } */}


            {/* {activeIndex==4 &&  */}
            <div className="question-item"><h4 className="heading">Enter the Answer for FAQ</h4>
    <Form.Group controlId='formBasicEmail'>
            <Form.Control
              type='text'
              name='answer'
              placeholder='Answer'
              value={answer}
              onChange={(event) => {
                onChangeFaqData(event);
              }}
              required
            />
            <Form.Control.Feedback type='invalid'>
              This field is required
            </Form.Control.Feedback>
          </Form.Group>
            </div>
            {/* } */}

          {/* {activeIndex==5 && 
          <div className="question-item">
            <h4 className="heading">Save FAQ</h4>
          <Button variant="primary" onClick={onSubmitHandler}>Save</Button>
          </div>
          } */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onCloseHandler}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmitHandler}>Save</Button>

        {/* {activeIndex!=1 && 
        <Button variant='primary' onClick={()=>{backButtonHandler()}}>
          Back
        </Button>
}
{activeIndex!=5 && 
        <Button variant='success' onClick={()=>{onSubmitHandler()}}>
          Next
        </Button>
} */}
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
  
  export default connect(mapStateToProps)(AddFaqModal);
