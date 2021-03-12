import { useState, useEffect } from 'react';
import { useQuery, gql, useMutation, enableExperimentalFragmentVariables } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from 'react-redux-loading';

const GET_USER_SPACEOWNER_PROFILE = gql`
  query GetUserSpaceOwnerProfile($userId: String!) {
    getUserSpaceOwnerProfile(userId: $userId) {
      _id
      userId
      address
      businessName
      facebook
      twitter
      instagram
    }
  }
`;

const CREATE_SPACEOWNER_PROFILE = gql`
  mutation CreateSpaceOwnerProfile(
    $userId: String!
    $address: String!
    $businessName: String!
    $facebook: String!
    $twitter: String!
    $instagram: String!
  ) {
    createSpaceOwnerProfile(
      userId: $userId
      address: $address
      businessName: $businessName
      facebook: $facebook
      twitter: $twitter
      instagram: $instagram
    ) {
      _id
      userId
      address
      businessName
      facebook
      twitter
      instagram
    }
  }
`;

const UPDATE_SPACEOWNER_PROFILE = gql`
  mutation UpdateSpaceOwnerProfile(
    $id: ID!
    $userId: String
    $address: String
    $businessName: String
    $facebook: String
    $twitter: String
    $instagram: String
  ) {
    updateSpaceOwnerProfile(
      id: $id
      userId: $userId
      address: $address
      businessName: $businessName
      facebook: $facebook
      twitter: $twitter
      instagram: $instagram
    ) {
      _id
      userId
      address
      businessName
      facebook
      twitter
      instagram
    }
  }
`;

const DELETE_SPACEOWNER_PROFILE = gql`
  mutation DeleteSpaceOwnerProfile($id: ID!) {
    deleteSpaceOwnerProfile(id: $id)
  }
`;

const initialPayload = {
  id: '',
  mobile: false,
  edit: false,
  address: '',
  businessName: '',
  facebook: '',
  twitter: '',
  instagram: ''
};

export function useSpaceOwnerProfile() {
  const [createSpaceOwnerProfile] = useMutation(CREATE_SPACEOWNER_PROFILE);
  const [updateSpaceOwnerProfile] = useMutation(UPDATE_SPACEOWNER_PROFILE);
  const [deleteSpaceOwnerProfile] = useMutation(DELETE_SPACEOWNER_PROFILE);
  const userId = useSelector(({ auth }) => (auth.authenticated ? auth.data.attributes.sub : null));

  const { data } = useQuery(GET_USER_SPACEOWNER_PROFILE, {
    variables: { userId }
  });
  const [profile, setProfile] = useState(null);
  const [payload, setPayload] = useState({});

  useEffect(() => {
    if (data && data.getUserSpaceOwnerProfile) {
      // console.log(data);
      setProfile(data.getUserSpaceOwnerProfile);
      // setProfile({ ...profile, profile: data.getUserSpaceOwnerProfile });
    }
  }, [data]);

  // const getSpaceOwnerProfileData = (id) => {
  //   client
  //     .query({
  //       query: GET_USER_SPACEOWNER_PROFILE,
  //       variables: { userId: userId }
  //     })
  //     .then(({ data }) => {
  //       setProfile(data.getUserSpaceOwnerProfile);
  //     })
  //     .catch((err) => {
  //     });
  // };

  const addProfile = async (payload) => {
    console.log(payload);
    if (payload.edit) {
      try {
        const response = await updateSpaceOwnerProfile({
          variables: {
            userId: userId,
            id: payload.id,
            address: payload.address,
            businessName: payload.businessName,
            facebook: payload.facebook,
            twitter: payload.twitter,
            instagram: payload.instagram
          }
        });

        console.log(response.data);
        setProfile(response.data.updateSpaceOwnerProfile);
        // data = response.data.createSpaceOwnerProfile;
        setPayload(initialPayload);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      // console.log('add', payload);
      try {
        const response = await createSpaceOwnerProfile({
          variables: {
            userId: userId,
            address: payload.address,
            businessName: payload.businessName,
            facebook: payload.facebook,
            twitter: payload.twitter,
            instagram: payload.instagram
          }
        });
        console.log(response.data);
        setProfile(response.data.createSpaceOwnerProfile);
        // data = response.data.updateSpaceOwnerProfile;
        setPayload(initialPayload);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteSpaceOwner = async (userId) => {
    try {
      const response = await deleteSpaceOwnerProfile({
        variables: { id: userId }
      });
      console.log(response.data);
      setProfile(null);
      setPayload({});
    } catch (err) {
      console.log(err);
    }
  };
  return {
    deleteSpaceOwner,
    payload,
    setPayload,
    addProfile,
    profile
  };
}
