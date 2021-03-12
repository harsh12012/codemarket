import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, ProgressBar, InputGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import $ from 'jquery';
import { toast } from 'react-toastify';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import StartEndDateTimePicker from './StartEndDateTimePicker';
import { changeToRoundOfDate } from '@parkyourself-frontend/shared/utils/time';

var voucher_codes = require('voucher-code-generator');
const currentDate = new Date();
const AddPromoCodeModal = ({
  show,
  handleClose,
  handleSave,
  handleUpdate,
  edit = false,
  id,
  promoCodes
}) => {
  // const [activeIndex,setActiveIndex] = useState(1);
  // const [progress,setProgress] = useState(0);
  const [promoCode, setPromoCode] = useState({
    code: '',
    discount: 0,
    quantity: 0,
    remaining: 0,
    startDate: changeToRoundOfDate(currentDate, 0),
    endDate: new Date(changeToRoundOfDate(currentDate, 23).setDate(currentDate.getDate() + 1))
  });
  const { code, discount, quantity, startDate, endDate } = promoCode;

  const [validated, setValidated] = useState(false);

  const onChangePromoCode = (event) => {
    setPromoCode({ ...promoCode, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = async () => {
    try {
      // if(activeIndex!=5){
      if (code && discount !== '' && discount >= 0 && startDate && endDate && quantity > 0) {
        //   setActiveIndex(activeIndex+1);
        // setProgress(progress+25);
        setValidated(false);
        //   } else {
        //     setValidated(true);
        //   }
        // }else{
        if (edit) {
          let data = promoCodes.filter((item) => item._id === id)[0];
          handleUpdate({
            ...promoCode,
            id: id,
            discount: discount / 100,
            _id: id,
            remaining:
              data.quantity === data.remaining
                ? promoCode.quantity
                : Number(promoCode.quantity) - (Number(data.quantity) - Number(data.remaining))
          });
        } else {
          handleSave({ ...promoCode, discount: discount / 100, remaining: promoCode.quantity });
        }
        // setActiveIndex(1);
        // setProgress(0);
        // setPromoCode({code:'',expiresAt:new Date(),
        // maxLimit:1,
        // discount:0});
        onCloseHandler();
      } else {
        setValidated(true);
      }
    } catch (error) {
      toast.warn('Something Went Wrong');
    }
  };

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

  const onCloseHandler = () => {
    console.log('in close handler');
    $('.add-vehicle-modal').on('hidden.bs.modal', function (e) {
      $(this).removeData();
    });
    handleClose();
  };

  // const generateRandomCode = ()=>{
  //     const result = voucher_codes.generate({
  //       length: 10,
  //       count: 1
  //   });
  //   // console.log(result);
  //     setPromoCode({...promoCode,code:result[0]});
  // }

  useEffect(() => {
    console.log(edit, id);
    if (edit && id) {
      const getPromoCodeData = () => {
        let data = promoCodes.filter((item) => item._id === id)[0];
        setPromoCode({
          code: data.code,
          discount: data.discount * 100,
          quantity: data.quantity,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
          remaining: data.remaining
        });
      };
      getPromoCodeData();
    } else {
      // setActiveIndex(1);
      // setProgress(0);
      setPromoCode({
        code: '',
        discount: 0,
        quantity: 0,
        remaining: 0,
        startDate: changeToRoundOfDate(currentDate, 0),
        endDate: new Date(changeToRoundOfDate(currentDate, 23).setDate(currentDate.getDate() + 1))
      })
    }
  }, [edit, id]);

  return (
    <Modal show={show} onHide={onCloseHandler} className="add-vehicle-modal">
      <Modal.Header closeButton>
        <Modal.Title>{edit ? 'Edit Promo Code' : 'Create Promo Code'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <ProgressBar now={progress} /> */}
        <Form validated={validated} className="vehicle-form">
          <div className="question-item">
            <h4 className="heading">Enter your Promotional Code </h4>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="code"
                placeholder="Promo Code"
                value={code}
                onChange={(event) => {
                  onChangePromoCode(event);
                }}
                maxLength={10}
                required
              />

              <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
            </Form.Group>
            {/* <Button variant="primary" onClick={generateRandomCode}>Generate Random Code</Button> */}
          </div>
          <div className="question-item">
            <h4 className="heading">Enter a discount percentage you want to offer</h4>
            <InputGroup className="mb-3">
              <Form.Control
                type="number"
                name="discount"
                placeholder="Discount"
                min="1"
                max="100"
                value={discount}
                onChange={(event) => {
                  onChangePromoCode(event);
                }}
                required
              />
              <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </div>
          {/* {activeIndex==3 && <div className="question-item"><h4 className="heading">Enter a Maximum Redeem Limit</h4>
          <Form.Group controlId='formBasicEmail'>
            <Form.Control
              type='number'
              min="1"
              name='maxLimit'
              placeholder='Maximum Limit'
              value={maxLimit}
              onChange={(event) => {
                onChangePromoCode(event);
              }}
              required
            />
            <Form.Control.Feedback type='invalid'>
              This field is required
            </Form.Control.Feedback>
            </Form.Group>
            </div>} */}

          {/* {activeIndex==4 && <div className="question-item"><h4 className="heading">Enter a Expiry Date</h4>
         <DateTimePicker value={expiresAt} onChange={(value)=>{setPromoCode({...promoCode,expiresAt:value})}} />
          
            </div>} */}

          {/* {activeIndex==5 && <div className="question-item"><h4 className="heading">Save your Promo Code</h4>
          <Button variant="primary" onClick={onSubmitHandler}>Save</Button>
          </div>} */}

          <StartEndDateTimePicker
            start={promoCode.startDate}
            end={promoCode.endDate}
            onChange={(start, end) => {
              console.log(start, end);
              setPromoCode({
                ...promoCode,
                startDate: start,
                endDate: end
              });
            }}
          />

          <div className="question-item">
            <h4 className="heading">Enter Quantity </h4>
            <FormControl
              placeholder="Quantity"
              type="number"
              min="1"
              value={quantity}
              name="quantity"
              required
              onChange={(event) => {
                onChangePromoCode(event);
              }}
            />
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCloseHandler}>
          Close
        </Button>
        {/* {activeIndex!=1 && 
        <Button variant='primary' onClick={()=>{backButtonHandler()}}>
          Back
        </Button> */}

        <Button
          variant="success"
          onClick={() => {
            onSubmitHandler();
          }}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = ({ vehicle, auth, user }) => {
  return {
    vehicles: vehicle.vehicles,
    userId: auth.data.attributes.sub,
    profileType: user.profileType
  };
};

export default connect(mapStateToProps)(AddPromoCodeModal);
