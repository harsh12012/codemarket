/* eslint-disable import/prefer-default-export */
import { useQuery, gql, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Storage } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import guid from '../utils/guid';
import config from '../aws-exports';

const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

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

const CREATE_VEHICLE = gql`
  mutation CreateVehicle(
    $userId: String!
    $profileType: String!
    $licensePlate: String!
    $type: String!
    $make: String!
    $model: String!
    $year: String!
    $size: String!
    $color: String
    $image: String
  ) {
    createVehicle(
      userId: $userId
      profileType: $profileType
      licensePlate: $licensePlate
      type: $type
      make: $make
      model: $model
      year: $year
      size: $size
      color: $color
      image: $image
    ) {
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

const UPDATE_VEHICLE = gql`
  mutation UpdateVehicle(
    $id: ID!
    $userId: String!
    $profileType: String!
    $licensePlate: String!
    $type: String!
    $make: String!
    $model: String!
    $year: String!
    $size: String!
    $color: String
    $image: String
  ) {
    updateVehicle(
      id: $id
      userId: $userId
      profileType: $profileType
      licensePlate: $licensePlate
      type: $type
      make: $make
      model: $model
      year: $year
      size: $size
      color: $color
      image: $image
    ) {
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

const DELETE_VEHICLE = gql`
  mutation DeleteVehicle($id: ID!) {
    deleteVehicle(id: $id)
  }
`;

const initialPayload = {
  id: '',
  mobile: false,
  edit: false,
  licensePlate: 'licensePlate',
  type: 'type',
  make: 'make',
  model: 'model',
  year: '2021',
  size: 'Large',
  color: 'red',
  image: '',
  imageFile: null
};

export function useCRUDVehicle() {
  const [createVehicle] = useMutation(CREATE_VEHICLE);
  const [updateVehicle] = useMutation(UPDATE_VEHICLE);
  const [deleteVehicle] = useMutation(DELETE_VEHICLE);
  const { userId, profileType } = useSelector(({ auth, user }) =>
    auth.authenticated && auth.data.attributes.sub
      ? { userId: auth.data.attributes.sub, profileType: user.profileType }
      : { userId: '', profileType: '' }
  );
  const { data } = useQuery(GET_USER_VEHICLES, {
    variables: { userId }
  });
  const [allData, setAllData] = useState({ vehicles: [] });
  const [disabled, setDisabled] = useState(false);
  const [payload, setPayload] = useState(initialPayload);
  useEffect(() => {
    if (data && data.getUserVehicles) {
      setAllData({ ...allData, vehicles: data.getUserVehicles });
    }
  }, [data]);

  const deleteVehicleHandler = async (id) => {
    try {
      await deleteVehicle({
        variables: { id }
      });
      setAllData({
        ...allData,
        vehicles: allData.vehicles.filter((v) => v._id != id)
      });
    } catch (error) {
      //   console.log(error);
    }
  };

  const addVehicleHandler = async () => {
    try {
      setDisabled(true);
      let image = payload.image;
      if (payload.imageFile && payload.imageFile !== null) {
        if (payload.mobile) {
          let response = await fetch(payload.imageFile);
          let blob = await response.blob();
          let extension = 'jpeg';
          let key = `images/vehicles/${guid()}-${guid()}.${extension}`;
          image = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
          // setPayload({ ...payload, image: url });
          await Storage.put(key, blob, {
            contentType: 'image/jpeg'
          });
        } else {
          let { type: mimeType } = payload.imageFile;
          const extension = mimeType.split('/').pop();
          let key = `images/vehicles/${uuid()}${uuid()}.${extension}`;
          image = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
          // setPayload({ ...payload, image: url });
          await Storage.put(key, payload.imageFile, {
            contentType: mimeType
          });
        }
      }
      if (payload.edit) {
        const response1 = await updateVehicle({
          variables: { ...payload, payload, userId, profileType, image }
        });
        setAllData({
          ...allData,
          vehicles: allData.vehicles.map((v) =>
            v._id === payload.id ? response1.data.updateVehicle : v
          )
        });
      } else {
        const response2 = await createVehicle({
          variables: { ...payload, payload, userId, profileType, image }
        });
        setAllData({
          ...allData,
          vehicles: [...allData.vehicles, response2.data.createVehicle]
        });
      }
      setDisabled(false);
      setPayload(initialPayload);
    } catch (error) {
      // Alert.alert('Error', error.message);
      setDisabled(false);
    }
  };

  return { allData, deleteVehicleHandler, addVehicleHandler, payload, setPayload, disabled };
}
