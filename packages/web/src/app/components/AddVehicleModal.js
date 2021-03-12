import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, ProgressBar } from 'react-bootstrap';
import { Trash, XCircle } from 'react-feather';
import { v4 as uuid } from 'uuid';
import config from '@parkyourself-frontend/shared/aws-exports';
import { Storage } from 'aws-amplify';
import { connect } from 'react-redux';
import $ from 'jquery';
import { gql } from '@apollo/client';
import { client } from '../graphql';

const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

const GET_VEHICLE = gql`
  query GetVehicle($id: ID!) {
    getVehicle(id: $id) {
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

const AddVehicleModal = ({
  show,
  handleClose,
  handleSave,
  handleUpdate = () => {},
  edit = false,
  id = '',
  userId,
  profileType
}) => {
  // const [activeIndex,setActiveIndex] = useState(1);
  // const [progress,setProgress] = useState(0);
  var date = new Date();
  var years = [];
  const [vehicle, setVehicle] = useState({
    image: '',
    licensePlate: '',
    type: '',
    make: '',
    model: '',
    year: date.getFullYear(),
    size: 'motorcycle',
    color: ''
  });
  const { image, licensePlate, type, make, model, year, size, color } = vehicle;

  const [validated, setValidated] = useState(false);

  const [tempImage, setTempImage] = useState('');
  const [imageFile, setImageFile] = useState('');

  const handleFileChange = (e) => {
    console.log(e.target.files);
    let img = '';
    if (edit) {
      img = image;
    }
    let tempFile = e.target.files[0];
    img = URL.createObjectURL(tempFile);
    setTempImage(img);
    setImageFile(tempFile);
  };

  const handleRemoveImage = () => {
    setTempImage('');
    setImageFile('');
  };

  const onChangeVehicle = (event) => {
    setVehicle({ ...vehicle, [event.target.name]: event.target.value });
  };

  for (var i = new Date().getFullYear(); i >= new Date().getFullYear() - 20; i--) {
    years.push(i);
  }

  const saveImage = async () => {
    if (!tempImage) return '';
    let file = imageFile;
    let fileName = 'vehicle-image';
    let extension = 'jpg';
    // let extension = file.name.split('.')[1].toLowerCase();
    let { type: mimeType } = file;
    let key = `images/${uuid()}${fileName}.${extension}`;
    let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;

    await Storage.put(key, file, {
      contentType: mimeType
    });

    return url;
  };

  const onSubmitHandler = async () => {
    try {
      // if(activeIndex!=9){
      if (licensePlate && type && make && model && year && size) {
        // setActiveIndex(activeIndex+1);
        // setProgress(progress+13);
        if (edit) {
          handleUpdate({
            ...vehicle,
            image: await saveImage(),
            id: id,
            userId: userId,
            profileType: profileType
          });
        } else {
          handleSave({
            ...vehicle,
            image: await saveImage(),
            userId: userId,
            profileType: profileType
          });
        }
        // setActiveIndex(1);
        // setProgress(0);
        setVehicle({
          image: '',
          licensePlate: '',
          type: '',
          make: '',
          model: '',
          year: date.getFullYear(),
          size: 'motorcycle',
          color: ''
        });

        onCloseHandler();
        setValidated(false);
      } else {
        setValidated(true);
      }
    } catch (error) {
      alert('Problem adding vehicle', 'Please try again');
      console.log(error);
    }
  };

  // const backButtonHandler =  ()=>{
  //   try {
  //     if(activeIndex!=1){
  //       setActiveIndex(activeIndex-1);
  //       setProgress(progress-13);
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

  useEffect(() => {
    console.log(edit, id);
    if (edit && id) {
      const getVehicleData = () => {
        // let vehicleData =  vehicles.filter((item)=>item._id===id)[0];
        // const {licensePlate,type,make,model,year,size,image} = vehicleData;
        // setVehicle({licensePlate:licensePlate,type:type,make:make,model:model,year:year,size:size,image:image});
        // setTempImage(image);

        client
          .query({ query: GET_VEHICLE, variables: { id: id } })
          .then(({ data }) => {
            if (data.getVehicle) {
              const { licensePlate, type, make, model, year, size, image } = data.getVehicle;
              console.log('image :', image);
              setVehicle({
                licensePlate: licensePlate,
                type: type,
                make: make,
                model: model,
                year: year,
                size: size,
                image: image
              });
              setTempImage(image);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getVehicleData();
    } else {
      // setActiveIndex(1);
      // setProgress(0);
      setVehicle({
        image: '',
        licensePlate: '',
        type: '',
        make: '',
        model: '',
        year: date.getFullYear(),
        size: 'motorcycle',
        color: ''
      });
    }
  }, [edit, id]);

  return (
    <Modal show={show} onHide={onCloseHandler} className="add-vehicle-modal">
      <Modal.Header closeButton>
        <Modal.Title>Add A Vehicle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <ProgressBar now={progress} /> */}
        <Form validated={validated} className="vehicle-form">
          {/* {activeIndex==1 &&  */}
          <div className="question-item">
            <h4 className="heading">What's your License Plate Number?</h4>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="licensePlate"
                placeholder="License Plate"
                value={licensePlate}
                onChange={(event) => {
                  onChangeVehicle(event);
                }}
                required
              />
              <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
            </Form.Group>
          </div>
          {/* } */}
          {/* {activeIndex==2 &&  */}
          <div className="question-item">
            <h4 className="heading">What's your Vehicle Type?</h4>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="type"
                placeholder="Vehicle Type"
                value={type}
                onChange={(event) => {
                  onChangeVehicle(event);
                }}
                required
              />
              <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
            </Form.Group>
          </div>
          {/* } */}
          {/* {activeIndex==3 && */}
          <div className="question-item">
            <h4 className="heading">Your Vehicle's Make</h4>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="make"
                placeholder="Make"
                value={make}
                onChange={(event) => {
                  onChangeVehicle(event);
                }}
                required
              />
              <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
            </Form.Group>
          </div>
          {/* } */}

          {/* {activeIndex==4 &&  */}
          <div className="question-item">
            <h4 className="heading">Your Vehicle's Model</h4>

            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="model"
                placeholder="Model"
                value={model}
                onChange={(event) => {
                  onChangeVehicle(event);
                }}
                required
              />
              <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
            </Form.Group>
          </div>
          {/* } */}

          {/* {activeIndex==5 &&  */}
          <div className="question-item">
            <h4 className="heading">Your Vehicle's Year</h4>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Control
                as="select"
                name="year"
                custom
                value={year}
                onChange={(event) => {
                  onChangeVehicle(event);
                }}>
                {years.map((y) => (
                  <option>{y}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
          {/* } */}

          {/* {activeIndex==6 &&  */}

          <div className="question-item">
            <h4 className="heading">Choose your Vehicle Size</h4>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Control
                as="select"
                name="size"
                custom
                value={size}
                onChange={(event) => {
                  onChangeVehicle(event);
                }}>
                <option value="motorcycle">Motorcycle</option>
                <option value="compact">Compact</option>
                <option value="midsized">Mid Sized</option>
                <option value="large">Large</option>
                <option value="oversized">Oversized</option>
              </Form.Control>
            </Form.Group>
          </div>
          {/* } */}

          {/* {activeIndex==7 &&  */}
          <div className="question-item">
            <h4 className="heading">Tell us your vehicle color</h4>

            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="color"
                placeholder="Color"
                value={color}
                onChange={(event) => {
                  onChangeVehicle(event);
                }}
                required
              />
            </Form.Group>
          </div>
          {/* } */}

          {/* {activeIndex==8 &&  */}
          <div className="question-item">
            <h4 className="heading">Add Photo of your Vehicle</h4>
            <Form.File
              name="image"
              onChange={handleFileChange}
              id="custom-file"
              label="Upload vehicle image"
              custom
              accept="image/png, image/jpeg, image/jpg"
              style={{ marginBottom: '10px' }}
            />
            {tempImage && (
              <div className="d-inline-block w--50 p-1">
                <button
                  // disabled={disabled}
                  type="button"
                  onClick={() => handleRemoveImage()}
                  className="btn btn-primary btn-sm p-0 rounded-pill shadow position-absolute right-0"
                  style={{
                    zIndex: '3',
                    borderRadius: '50%',
                    backgroundColor: 'red',
                    border: 'none'
                  }}>
                  <XCircle size={20} />
                </button>
                <img style={{ width: '100%', marginBottom: '10px' }} src={tempImage} />
              </div>
            )}
          </div>
          {/* } */}

          {/* {activeIndex==9 && 
          <div className="question-item">
            <h4 className="heading">Save your Vehicle</h4>
          <Button variant="primary" onClick={onSubmitHandler}>Save</Button>
          </div>
          } */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCloseHandler}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmitHandler}>
          Save
        </Button>

        {/* {activeIndex!=1 && 
        <Button variant='primary' onClick={()=>{backButtonHandler()}}>
          Back
        </Button>
}
{activeIndex!=9 && 
        <Button variant='success' onClick={()=>{onSubmitHandler()}}>
          Next
        </Button>
} */}
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = ({ auth, user }) => {
  return {
    userId: auth.data.attributes.sub,
    profileType: user.profileType
  };
};

export default connect(mapStateToProps)(AddVehicleModal);
