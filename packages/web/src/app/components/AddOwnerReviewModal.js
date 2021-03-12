import React, { useEffect, useState } from 'react';
import { Modal,Table ,Form,Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings';

const AddOwnerReviewModal = ({ownerName,handleClose,show,handleSave})=>{

    const [review,setReview] = useState({rating:0,feedback:''});

    const{rating,feedback} = review;

    const [validated,setValidated] = useState(false);

    const onSubmitHandler = ()=>{
        try {
            if(rating>=0 && feedback){
                handleSave(review);
                handleClose();
            }else{
                setValidated(true);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const onChangeRating = (value)=>{console.log(value); setReview({...review,rating:value})};

    return <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Review your experience</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <h1 className="heading">Owner Name: {ownerName}</h1>
              <p className="lead">How was your experience with {ownerName}?</p>
              <p className="lead">Provide a rating:</p>
              <StarRatings
          rating={rating}
          
          starRatedColor="blue"
          starHoverColor="yellow"
          changeRating={onChangeRating}
          numberOfStars={5}
          name='rating'
        />
        <br/>
              <p className="lead" style={{marginTop:'10px'}}>Provide a feedback:</p>
              <Form validated={validated}>
              <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Control as="textarea" rows={4} value={feedback} onChange={(event)=>{setReview({...review,feedback:event.target.value})}}/>
                <Form.Control.Feedback type="invalid">
                    Please enter your feedback
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="success" onClick={onSubmitHandler}>Submit</Button>
              </Modal.Footer>
              </Modal>
              
};

const mapStateToProps = ()=>({
   
})

export default  connect(mapStateToProps)(AddOwnerReviewModal);