import React,{useState} from 'react'
import { Modal,Form,Button,InputGroup } from 'react-bootstrap'
import { toast } from 'react-toastify';
import moment from 'moment';

const AddMoreTimeModal = ({show,handleClose,address,_id,start,end,handleLateCheckout}) => {

    const [addTime,setAddTime] = useState({value:0,unit:'days'});

    const [validated,setValidated] = useState(false);

    const {value,unit} = addTime;

    const lateCheckoutHandler = ()=>{
        if(value==0){
          alert("Time can't be zero");
          return;
        }
        if(value && unit){
          setValidated(false);
              let ed = moment(end).add(value,unit)._d;
              handleLateCheckout({id:_id,end:ed,start:start});
              handleClose();
        }else{
            setValidated(true);
        }
    }

    return (
        <Modal show={show} onHide={handleClose} className="faq-modal">
      <Modal.Header closeButton>
        <Modal.Title>Add More Time</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <p className="lead">For Your current booking for location {address} on {moment(start).format('lll')} to {moment(end).format('lll')} is going to include with more time by below chosen time option.</p>
            <p className="lead">Choose below time you need to add more additional time.</p>
            <Form validated={validated}>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Enter additional time"
                  type="number"
                  min="1"
                  name="addTime"
                  required
                  value={value ? value : ""}
                  onChange={(event) => {
                    console.log(event.target.value);
                    setAddTime({...addTime,value:event.target.value});
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  This field is required
                </Form.Control.Feedback>
                <InputGroup.Append>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Control
                      as="select"
                      custom
                      value={unit}
                      onChange={(event) => {
                        console.log(event.target.value);
                    setAddTime({...addTime,unit:event.target.value});
                      }}
                    >
                      <option value="minutes">Minutes</option>
                      <option value="hours">Hours</option>
                      <option value="days">Days</option>
                    </Form.Control>
                  </Form.Group>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
                <Button variant="primary" onClick={lateCheckoutHandler}>Save</Button>
          </Modal.Footer>
          </Modal>
    )
}

export default AddMoreTimeModal;