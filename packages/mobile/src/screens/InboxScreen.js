import React from 'react';
import { connect } from 'react-redux';
import { useQuery, useMutation, gql, useSubscription } from '@apollo/client';
import { useSelector } from 'react-redux';
import InboxComponent from '../components/inbox/Inbox';
import SpaceOwnerChat from '../screens/SpaceOwnerInbox';

function Inbox({ navigation, isSpaceOwner, userData }) {
  if (isSpaceOwner) {
    return <SpaceOwnerChat navigation={navigation} />;
  }
  return <InboxComponent navigation={navigation} userId={userData.sub} />;
}
const mapStateToProps = ({ user, auth }) => ({
  isSpaceOwner: user.isSpaceOwner,
  userData: auth.data.attributes
});
export default connect(mapStateToProps)(Inbox);

const GET_OWNER_INBOX = gql`
  query MyQuery($ownerId: String!) {
    getOwnerInbox(ownerId: $ownerId) {
      _id
      listingAddress
      messageCount
    }
  }
`;

export function useGetOwnerInbox() {
  const ownerId = useSelector(({ auth }) => (auth.authenticated ? auth.data.attributes.sub : null));
  const { loading, data, error } = useQuery(GET_OWNER_INBOX, {
    variables: {
      ownerId
    },
    fetchPolicy: 'cache-and-network' // 'cache-and-network' //'network-only'
  });

  // console.log(data, loading, error);

  return { loading, data, error };
}
