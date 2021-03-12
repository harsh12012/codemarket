import { useState, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from 'react-redux-loading';

const GET_USER_BUSINESS_PROFILE = gql`
  query GetUserBusinessProfile($userId: String!) {
    getUserBusinessProfile(userId: $userId) {
      _id
      userId
      businessName
      businessEmail
      businessMobile
      businessMobileCode
      createdAt
    }
  }
`;

const CREATE_BUSINESS_PROFILE = gql`
  mutation CreateBusinessProfile(
    $userId: String!
    $businessName: String!
    $businessEmail: String!
    $businessMobile: String!
    $businessMobileCode: String!
  ) {
    createBusinessProfile(
      userId: $userId
      businessName: $businessName
      businessEmail: $businessEmail
      businessMobile: $businessMobile
      businessMobileCode: $businessMobileCode
    ) {
      _id
      userId
      businessName
      businessEmail
      businessMobile
      businessMobileCode
      createdAt
    }
  }
`;

const UPDATE_BUSINESS_PROFILE = gql`
  mutation UpdateBusinessProfile(
    $id: ID!
    $userId: String
    $businessName: String
    $businessEmail: String
    $businessMobile: String
    $businessMobileCode: String
  ) {
    updateBusinessProfile(
      id: $id
      userId: $userId
      businessName: $businessName
      businessEmail: $businessEmail
      businessMobile: $businessMobile
      businessMobileCode: $businessMobileCode
    ) {
      _id
      userId
      businessName
      businessEmail
      businessMobile
      businessMobileCode
      createdAt
    }
  }
`;

const DELETE_BUSINESS_PROFILE = gql`
  mutation DeleteBusinessProfile($id: ID!) {
    deleteBusinessProfile(id: $id)
  }
`;

export function useGetUserBusinessProfile() {
  const userId = useSelector(({ auth }) =>
    auth.data.attributes.sub ? auth.data.attributes.sub : null
  );
  const data = useQuery(
    GET_USER_BUSINESS_PROFILE,
    { variables: { userId: userId } },
    { fetchPolicy: 'network-only' }
  );
  return data;
}

export const useCRUDBusinessProfile = () => {
  const userId = useSelector(({ auth }) =>
    auth.data.attributes.sub ? auth.data.attributes.sub : null
  );
  const [createBusinessProfile] = useMutation(CREATE_BUSINESS_PROFILE);
  const [deleteBusinessProfile] = useMutation(DELETE_BUSINESS_PROFILE);
  const [updateBusinessProfile] = useMutation(UPDATE_BUSINESS_PROFILE);

  const getUserBusinessProfile = () => {
    const data = useQuery(
      GET_USER_BUSINESS_PROFILE,
      { variables: { userId: userId } },
      { fetchPolicy: 'network-only' }
    );
    return data;
  };

  const handleCreateBusinessProfile = async (data, user_id) => {
    try {
      console.log('id', typeof user_id);
      const response = await createBusinessProfile({
        variables: {
          userId: user_id,
          businessName: data.businessName,
          businessEmail: data.businessEmail,
          businessMobile: data.businessMobile,
          businessMobileCode: data.businessMobileCode
        }
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleValidateBusinessProfileAndCreate = async (data, user_id) => {
    let errFields = {};
    Object.keys(data).map((key) => {
      if (data[key] !== '' || data[key] === undefined) {
        errFields[key] = false;
      } else {
        errFields[key] = true;
      }
    });

    if (Object.values(errFields).includes(true)) {
      return {
        error: true,
        errorFields: errFields,
        data: null
      };
    } else {
      const response = await handleCreateBusinessProfile(data, user_id);
      if (response) {
        console.log('Create Business Profile', response);
        return {
          error: false,
          errorFields: null,
          data: response.createBusinessProfile
        };
      }
    }
  };

  const handleDeleteBusinessProfile = async (id) => {
    try {
      const response = await deleteBusinessProfile({
        variables: { id: id }
      });

      console.log('Business Profile Deleted', response.data);
      return {
        error: null,
        data: response.data
      };
    } catch (error) {
      console.log(error);
      return {
        error: error
      };
    }
  };

  const handleUpdateBusinessProfile = async (data, user_id, id) => {
    try {
      const response = await updateBusinessProfile({
        variables: {
          id: id,
          userId: user_id,
          businessName: data.businessName,
          businessEmail: data.businessEmail,
          businessMobile: data.businessMobile,
          businessMobileCode: data.businessMobileCode
        }
      });

      return {
        error: null,
        data: response.data.updateBusinessProfile
      };
    } catch (error) {
      return {
        error: error,
        data: null
      };
    }
  };

  return {
    getUserBusinessProfile,
    handleValidateBusinessProfileAndCreate,
    handleDeleteBusinessProfile,
    handleUpdateBusinessProfile
  };
};
