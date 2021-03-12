import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { gql, useQuery, useMutation, useSubscription } from '@apollo/client';
import MessagesList from './MessagesList';
import SendMessage from './SendMessage';

const GET_MESSAGES = gql`
  query GetDriverOwnerMessagesByListingId(
    $listingId: String!
    $driverId: String!
    $ownerId: String!
  ) {
    getDriverOwnerMessagesByListingId(
      listingId: $listingId
      driverId: $driverId
      ownerId: $ownerId
    ) {
      _id
      body
      listingId
      listingAddress
      driverId
      driverName
      ownerId
      ownerName
      senderName
      createdAt
    }
  }
`;

const CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $body: String!
    $listingId: String!
    $listingAddress: String!
    $driverId: String!
    $driverName: String!
    $ownerId: String!
    $ownerName: String!
    $senderName: String!
  ) {
    createMessage(
      body: $body
      listingId: $listingId
      listingAddress: $listingAddress
      driverId: $driverId
      driverName: $driverName
      ownerId: $ownerId
      ownerName: $ownerName
      senderName: $senderName
    ) {
      _id
      body
      listingId
      listingAddress
      driverId
      driverName
      ownerId
      ownerName
      senderName
      createdAt
    }
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription AddMessage($listingId: String!, $driverId: String!, $ownerId: String!) {
    addMessage(listingId: $listingId, driverId: $driverId, ownerId: $ownerId) {
      _id
      body
      listingId
      listingAddress
      driverId
      driverName
      ownerId
      ownerName
      senderName
      createdAt
    }
  }
`;

const ChatBox = (props) => {
  const { listingId, ownerId, ownerName, userData, listingAddress, driverId } = props;
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { listingId: listingId, driverId: driverId, ownerId: ownerId }
  });
  const [createMessage] = useMutation(CREATE_MESSAGE);
  const { data: addMessage } = useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { listingId: listingId, driverId: driverId, ownerId: ownerId }
  });
  const [messages, setMessages] = useState([]);
  const [disabled, setDisabled] = useState(false);

  // const [driver,setDriver] = useState({name:'',id:''});

  const onCreate = async (body) => {
    try {
      setDisabled(true);
      // console.log('on create : ', body);

      let dId = '';
      let dName = '';

      if (messages.length == 0) {
        dId = userData.sub;
        dName = userData.name;
      } else {
        dId = messages[0].driverId;
        dName = messages[0].driverName;
      }

      await createMessage({
        variables: {
          body: body,
          listingId: listingId,
          listingAddress: listingAddress,
          driverId: dId,
          driverName: dName,
          ownerId: ownerId,
          ownerName: ownerName,
          senderName: userData.name
        }
      });
      setDisabled(false);
    } catch (error) {
      alert('Something went wrong please try again');
      console.log(error);
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (data) {
      setMessages(data.getDriverOwnerMessagesByListingId);
    }
  }, [data]);

  const addNewMessage = (message) => {
    setMessages([...messages, addMessage.addMessage]);
    window.scrollTo({ behavior: 'smooth', top: myRef.current.offsetTop });
  };

  useEffect(() => {
    if (addMessage) {
      addNewMessage(addMessage.addMessage);
    }
  }, [addMessage]);
  let myRef = useRef();

  return (
    <div>
      <MessagesList messages={messages} username={props.userName} />
      <div ref={myRef} className="mb-5 pb-5"></div>
      <SendMessage disabled={disabled} onCreate={onCreate} />
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
    userName: auth.authenticated ? auth.data.attributes.name : null,
    userData: auth.data.attributes
  };
};

export default connect(mapStateToProps)(ChatBox);
