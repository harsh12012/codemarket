import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import slugify from 'slugify';
import { Storage } from 'aws-amplify';
import { useMutation, gql } from '@apollo/client';
import { v4 as uuid } from 'uuid';
import { showLoading, hideLoading } from 'react-redux-loading';
import config from '@parkyourself-frontend/shared/aws-exports';
import { Modal, Button } from 'react-bootstrap';
import { client } from '../../graphql/index';
import RoomTable from './ImageSliderTable';
import { Trash, XCircle } from 'react-feather';

const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

const CREATE_ONE_IMAGE_SLIDER = gql`
  mutation CreateOneImageSlider(
    $userId: String!
    $title: String!
    $slug: String!
    $images: [String]
  ) {
    createOneImageSlider(userId: $userId, title: $title, slug: $slug, images: $images) {
      _id
      title
      images
      slug
      published
    }
  }
`;
const UPDATE_ONE_IMAGE_SLIDER = gql`
  mutation UpdateOneImageSlider($id: ID!, $title: String, $slug: String, $images: [String]) {
    updateOneImageSlider(id: $id, title: $title, slug: $slug, images: $images) {
      _id
      title
      slug
      images
      published
    }
  }
`;
const DELETE_ONE_IMAGE_SLIDER = gql`
  mutation DeleteOneImageSlider($id: ID!) {
    deleteOneImageSlider(id: $id)
  }
`;
const GET_ALL_IMAGE_SLIDERS = gql`
  query GetAllImageSliders {
    getAllImageSliders {
      _id
      title
      slug
      images
      published
    }
  }
`;

const PUBLISH_UPDATE_ONE_IMAGE_SLIDER = gql`
  mutation UpdateOneImageSlider($id: ID!, $published: Boolean) {
    updateOneImageSlider(id: $id, published: $published) {
      _id
      title
      slug
      images
      published
    }
  }
`;

function ImageSliderCRUD(props) {
  const [createOneImageSlider] = useMutation(CREATE_ONE_IMAGE_SLIDER);
  const [updateOneImageSlider] = useMutation(UPDATE_ONE_IMAGE_SLIDER);
  const [deleteOneImageSlider] = useMutation(DELETE_ONE_IMAGE_SLIDER);
  const [publishImageSliderMutation] = useMutation(PUBLISH_UPDATE_ONE_IMAGE_SLIDER);
  const [payload, setPayload] = useState({
    _id: '',
    images: [],
    title: ''
  });
  const [edit, setEdit] = useState(false);
  const [disabled, updateDisabled] = useState(false);
  const [allRooms, setAllRooms] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [tempImages, setTempImages] = useState([]);
  const [tempVideos, setTempVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getRooms = async () => {
    props.dispatch(showLoading());

    client
      .query({
        query: GET_ALL_IMAGE_SLIDERS
      })
      .then(({ data }) => {
        setAllRooms(data.getAllImageSliders);
        props.dispatch(hideLoading());
      })
      .catch((err) => {
        console.log(err);
        props.dispatch(hideLoading());
      });
  };

  useEffect(() => {
    getRooms();
  }, []);

  // upload the image to S3 and then save it in the GraphQL API
  async function handleSubmit(e) {
    e.preventDefault();
    updateDisabled(true);
    props.dispatch(showLoading());
    try {
      let imageArray = [];
      for (let i = 0; i < imageFiles.length; i++) {
        let file = imageFiles[i];
        let fileName = file.name.split('.')[0].toLowerCase();
        let extension = file.name.split('.')[1].toLowerCase();
        let { type: mimeType } = file;
        let key = `images/${uuid()}${fileName}.${extension}`;
        let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
        imageArray.push(url);
        await Storage.put(key, file, {
          contentType: mimeType
        });
      }

      const response = await createOneImageSlider({
        variables: {
          userId: props.userId,
          title: payload.title,
          slug: slugify(payload.title, { lower: true }),
          price: payload.price,
          description: payload.description,
          images: imageArray
        }
      });
      updateDisabled(false);
      props.dispatch(hideLoading());
      setAllRooms([...allRooms, response.data.createOneImageSlider]);
      setPayload({
        id: '',
        title: ''
      });
      setShowModal(false);
      alert('Succesfully created room!');
    } catch (error) {
      updateDisabled(false);
      props.dispatch(hideLoading());
      if (error.message.includes('E11000')) {
        return alert('Title is already present!');
      }
      alert('Something went wrong please try again');
    }
  }

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    let imageArray = [];
    let videoArray = [];
    let imageFileArray = [];
    let videoFileArray = [];
    if (edit) imageArray = [...payload.images];
    let tempFiles = [...imageFiles, ...e.target.files];
    for (let i = 0; i < tempFiles.length; i++) {
      let extension = tempFiles[i].name.split('.').pop().toLowerCase();
      if (extension === 'mp4' || extension === 'webm' || extension === 'ogg') {
        videoArray.push(URL.createObjectURL(tempFiles[i]));
        videoFileArray.push(tempFiles[i]);
      } else {
        imageArray.push(URL.createObjectURL(tempFiles[i]));
        imageFileArray.push(tempFiles[i]);
      }
    }
    tempFiles = [...imageFileArray, ...videoFileArray];
    setTempImages(imageArray);
    setTempVideos(videoArray);
    setImageFiles(tempFiles);
  };

  const handleDelete = async (id) => {
    try {
      updateDisabled(true);
      if (window.confirm('Are you sure you want to delete this item!')) {
        props.dispatch(showLoading());
        const response = await deleteOneImageSlider({
          variables: {
            id: id
          }
        });
        setAllRooms(allRooms.filter((r) => r._id !== id));
        updateDisabled(false);
        props.dispatch(hideLoading());
      } else {
        return updateDisabled(false);
      }
    } catch (error) {
      props.dispatch(hideLoading());
      updateDisabled(false);
      alert('Something went wrong!');
    }
  };

  const handleEdit = (room) => {
    setPayload(room);
    setTempImages(room.images);
    setTempVideos([]);
    setImageFiles([]);
    setEdit(true);
    setShowModal(true);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    updateDisabled(true);
    try {
      props.dispatch(showLoading());
      let imageArray = [...payload.images];
      for (let i = 0; i < imageFiles.length; i++) {
        let file = imageFiles[i];
        let fileName = file.name.split('.')[0].toLowerCase();
        let extension = file.name.split('.')[1].toLowerCase();
        let { type: mimeType } = file;
        let key = `images/${uuid()}${fileName}.${extension}`;
        let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
        imageArray.push(url);
        await Storage.put(key, file, {
          contentType: mimeType
        });
      }

      let res = await updateOneImageSlider({
        variables: {
          title: payload.title,
          slug: slugify(payload.title, { lower: true }),
          price: payload.price,
          description: payload.description,
          images: imageArray,
          id: payload._id
        }
      });
      setAllRooms(allRooms.map((r) => (r._id === payload._id ? res.data.updateOneImageSlider : r)));
      props.dispatch(hideLoading());
      updateDisabled(false);
      setShowModal(false);
    } catch (error) {
      alert('Something went wrong!');
      updateDisabled(false);
      props.dispatch(hideLoading());
    }
  };

  const handlePublish = async ({ published, id }) => {
    try {
      updateDisabled(true);
      props.dispatch(showLoading());
      let res = await publishImageSliderMutation({
        variables: {
          id: id,
          published: published
        }
      });
      setAllRooms(
        allRooms.map((r) => (r._id === res.data.updateOneRoom._id ? res.data.updateOneRoom : r))
      );
      updateDisabled(false);
      props.dispatch(hideLoading());
    } catch (error) {
      updateDisabled(false);
      props.dispatch(hideLoading());
      alert('Something went wrong!');
    }
  };

  const handleRemoveImage = (value, type) => {
    if (type === 'video') {
      let tempVideoArray = [...tempVideos];
      let tempFilesArray = [...imageFiles];
      let inx = tempVideoArray.indexOf(value);
      let videoIndex = tempImages.length - payload.images.length - 1;
      videoIndex = videoIndex > -1 ? videoIndex + inx + 1 : inx;
      tempFilesArray.splice(videoIndex, 1);
      tempVideoArray.splice(inx, 1);
      setImageFiles(tempFilesArray);
      setTempVideos(tempVideoArray);
    } else {
      let tempImageArray = [...tempImages];
      let tempFilesArray = [...imageFiles];
      let index = tempImageArray.indexOf(value);
      if (index !== -1) {
        if (edit) {
          let tempEditImageArray = [...payload.images];
          if (index + 1 > payload.images.length) {
            tempFilesArray.splice(index, 1);
          }
          tempEditImageArray.splice(index, 1);
          setPayload({
            ...payload,
            images: tempEditImageArray
          });
        }
        tempImageArray.splice(index, 1);
        if (!edit) tempFilesArray.splice(index, 1);
        setTempImages(tempImageArray);
        setImageFiles(tempFilesArray);
      }
    }
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
          <form onSubmit={edit ? handleSubmitEdit : handleSubmit}>
            <div className="single__account">
              <div className="input__box">
                <span>Slider Title</span>
                <input
                  onChange={handleChange}
                  value={payload.title}
                  type="title"
                  name="title"
                  placeholder="Slider Title"
                  required
                />
              </div>
              <div className="mb-3">
                <span>Images & Videos</span>
                <br />
                <label
                  style={{
                    pointerEvents: disabled ? 'none' : 'auto'
                  }}
                  className="btn btn-primary btn-sm pl-3 pr-3 rounded-pill shadow"
                  htmlFor="upload-image">
                  Select File
                </label>
                <input
                  onChange={handleFileChange}
                  // accept="image/*"
                  accept="image/png, image/jpeg, image/jpg, image/gif, video/mp4, video/webm, video/ogg"
                  multiple
                  type="file"
                  name="images"
                  id="images"
                  className="m-2 d-none"
                  // ref={btn}
                  id="upload-image"
                  placeholder="Images"
                  required={!edit}
                />
                <br />
                {tempImages &&
                  tempImages.map((url, i) => {
                    let extension = url.split('.').pop().toLowerCase();

                    return (
                      <div className="d-inline-block w--50 p-1" key={i}>
                        <button
                          disabled={disabled}
                          type="button"
                          onClick={() => handleRemoveImage(url)}
                          className="btn btn-primary btn-sm p-0 rounded-pill shadow position-absolute right-0"
                          style={{
                            zIndex: '3',
                            borderRadius: '50%',
                            backgroundColor: 'red',
                            border: 'none'
                          }}>
                          <XCircle size={20} />
                        </button>
                        {extension === 'mp4' || extension === 'webm' || extension === 'ogg' ? (
                          <video style={{ width: '100%' }} controls>
                            <source src={url} type={`video/${extension}`} />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img style={{ width: '100%' }} src={url} />
                        )}
                      </div>
                    );
                  })}
                {tempVideos &&
                  tempVideos.map((url, i) => {
                    return (
                      <div className="d-inline-block w--50 p-1" key={i}>
                        <button
                          disabled={disabled}
                          type="button"
                          onClick={() => handleRemoveImage(url, 'video', i)}
                          className="btn btn-primary btn-sm p-0 rounded-pill shadow position-absolute right-0"
                          style={{
                            zIndex: '3',
                            borderRadius: '50%',
                            backgroundColor: 'red',
                            border: 'none'
                          }}>
                          <XCircle size={20} />
                        </button>
                        <video style={{ width: '100%' }} controls>
                          <source
                            src={tempVideos[i]}
                            // type={`video/${extension}`}
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    );
                  })}
              </div>
              <Button disabled={disabled} type="submit" variant="primary">
                {edit ? 'Update Slider' : 'Create Slider'}
              </Button>{' '}
              <Button
                disabled={disabled}
                type="button"
                variant="primary"
                onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Button
        variant="primary"
        onClick={() => {
          setPayload({
            _id: '',
            title: '',
            images: []
          });
          setImageFiles([]);
          setTempImages([]);
          setTempVideos([]);
          setEdit(false);
          setShowModal(true);
        }}>
        Add New Room
      </Button>
      <RoomTable
        allRooms={allRooms}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handlePublish={handlePublish}
        disabled={disabled}
      />
    </>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
    userId: auth.authenticated ? auth.data.attributes.sub : null
  };
};

export default connect(mapStateToProps)(ImageSliderCRUD);
