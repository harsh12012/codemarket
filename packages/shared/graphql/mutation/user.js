import { gql } from '@apollo/client';

const ADD_USER_ENPOINT = gql`
  mutation MyMutation($username: String!, $endpoint: String!) {
    addUserEndpoint(username: $username, endpoint: $endpoint)
  }
`;

const REMOVE_USER_ENPOINT = gql`
  mutation MyMutation($username: String!, $endpoint: String!) {
    removeUserEndpoint(username: $username, endpoint: $endpoint)
  }
`;

export default {
  ADD_USER_ENPOINT,
  REMOVE_USER_ENPOINT
};
