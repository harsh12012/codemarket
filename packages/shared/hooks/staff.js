import { useState, useEffect } from 'react';
import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { client } from '../graphql';

const getStaffsInGroup = gql`
  query getStaff($listingId: ID!) {
    getStaff(listingId: $listingId) {
      role
      staffId
      _id
      createdAt
      user {
        _id
        name
        email
        createdAt
      }
    }
  }
`;

const list_Users_In_Group = gql`
  query ListUsersInGroup($groupName: String!) {
    listUsersInGroup(groupName: $groupName) {
      Username
      Attributes {
        Name
        Value
      }
    }
  }
`;

const list_Cognito_Users_By_Email = gql`
  query ListCognitoUsersByEmail($email: String!) {
    listCognitoUsersByEmail(email: $email) {
      Username
      Attributes {
        Name
        Value
      }
    }
  }
`;

const add_Staff_To_Listing = gql`
  mutation addStaff($listingId: ID!, $role: String!, $staffId: String!) {
    addStaff(listingId: $listingId, role: $role, staffId: $staffId) {
      role
      staffId
      user {
        _id
        name
        email
      }
    }
  }
`;

const remove_Staff_From_Listing = gql`
  mutation removeStaff($id: ID!, $listingId: ID!) {
    removeStaff(id: $id, listingId: $listingId)
  }
`;

const update_Staff_Role_In_Listing = gql`
  mutation updateStaffRole($id: ID!, $listingId: ID!, $role: String!) {
    updateStaffRole(id: $id, listingId: $listingId, role: $role)
  }
`;

const send_Email = gql`
  mutation SendEmail($userId: String!, $emails: [String], $subject: String!, $message: String!) {
    sendEmail(message: $message, subject: $subject, userId: $userId, emails: $emails) {
      _id
    }
  }
`;

const get_User_Roles = gql`
  query getOneFormOption($id: ID!) {
    getOneFormOption(id: $id) {
      _id
      options {
        label
        value
        published
      }
    }
  }
`;

export const useCRUDManageStaff = () => {
  const [addStaffToGroup] = useMutation(add_Staff_To_Listing);
  const [updateStaffInListing] = useMutation(update_Staff_Role_In_Listing);
  const [deleteStaff] = useMutation(remove_Staff_From_Listing);
  const [sendEmail] = useMutation(send_Email);

  const getListUsersInGroup = (groupName) => {
    try {
      const data = useQuery(getStaffsInGroup, {
        variables: {
          listingId: groupName
        },
        fetchPolicy: 'network-only'
      });
      return data;
    } catch (error) {
      error;
    }
  };

  const listCognitoUsersByEmail = (email) => {
    const data = useLazyQuery(list_Cognito_Users_By_Email, {
      variables: {
        email: email
      }
    });

    return data;
  };

  const handleAddStaffToGroup = async (listingId, staffId, role) => {
    try {
      const response = await addStaffToGroup({
        variables: {
          listingId: listingId,
          role: role,
          staffId: staffId
        }
      });

      return {
        data: response.data,
        error: null
      };
    } catch (error) {
      return {
        data: null,
        error: error
      };
    }
  };

  const handleUpdateStaffInListing = async (id, listingId, role) => {
    try {
      const response = await updateStaffInListing({
        variables: {
          id: id,
          listingId: listingId,
          role: role
        }
      });

      return {
        data: response.data,
        error: null
      };
    } catch (error) {
      return {
        data: null,
        error: error
      };
    }
  };

  const handleDeleteStaffFromGroup = async (id, listingId) => {
    try {
      const response = await deleteStaff({
        variables: {
          id,
          listingId
        }
      });

      return {
        data: response.data,
        error: null
      };
    } catch (error) {
      return {
        error: error,
        data: null
      };
    }
  };

  const handleSendInviteInMail = async (email) => {
    try {
      const response = await sendEmail({
        variables: {
          message: 'Invitation to Parkyourself Staff',
          subject: 'Invitation to Parkyourself',
          userId: 'parkyourself',
          emails: [email]
        }
      });

      return {
        data: response.data,
        error: null
      };
    } catch (error) {
      return {
        data: null,
        error: error
      };
    }
  };

  const getAllUsersRoles = () => {
    const response = useQuery(get_User_Roles, {
      variables: {
        id: '603178d8bea6152b3f42deee'
      }
    });
    return response;
  };

  return {
    getListUsersInGroup,
    listCognitoUsersByEmail,
    handleAddStaffToGroup,
    handleDeleteStaffFromGroup,
    handleSendInviteInMail,
    handleUpdateStaffInListing,
    getAllUsersRoles
  };
};
