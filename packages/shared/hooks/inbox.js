import { useState, useEffect } from 'react';
import { useQuery, useMutation, gql, useSubscription } from '@apollo/client';
import { useSelector } from 'react-redux';

const GET_INBOX = gql`
  query MyQuery($userId: String!) {
    getInbox(userId: $userId) {
      _id
      lastMessage {
        _id
        createdAt
        listingLocation
        message
        receiverId
        receiverName
        senderId
        senderName
      }
    }
  }
`;

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

  return { loading, data, error };
}

export function useGetInbox({ userId }) {
  const { loading, data, error } = useQuery(GET_INBOX, {
    variables: {
      userId
    },
    fetchPolicy: 'cache-and-network' // 'cache-and-network' //'network-only'
  });

  return { loading, data, error };
}

const MESSAGE_SUBSCRIPTION = gql`
  subscription mySubscription($receiverId: String, $senderId: String) {
    newMessageSub(receiverId: $receiverId, senderId: $senderId) {
      _id
      createdAt
      listingLocation
      message
      receiverId
      receiverName
      senderId
      senderName
    }
  }
`;

const GET_ALL_MESSAGES = gql`
  query MyQuery($user1Id: String!, $user2Id: String!, $limit: Int, $page: Int) {
    getAllMessages(user1Id: $user1Id, user2Id: $user2Id, limit: $limit, page: $page) {
      count
      messages {
        _id
        createdAt
        listingLocation
        message
        receiverId
        receiverName
        senderId
        senderName
      }
    }
  }
`;

const SEND_ONE_MESSAGE = gql`
  mutation MyMutation(
    $listingLocation: String!
    $message: String!
    $receiverId: String!
    $receiverName: String!
    $senderId: String!
    $senderName: String!
  ) {
    sendOneMessage(
      listingLocation: $listingLocation
      message: $message
      receiverId: $receiverId
      receiverName: $receiverName
      senderId: $senderId
      senderName: $senderName
    ) {
      senderName
      senderId
      receiverName
      receiverId
      message
      listingLocation
      createdAt
      _id
    }
  }
`;

export function useChatBox({ user1Id, user2Id, listingLocation }) {
  const [sendOneMessage] = useMutation(SEND_ONE_MESSAGE);
  const [filter, setFilter] = useState({
    limit: 30,
    page: 1
  });

  const { loading, data, error } = useQuery(GET_ALL_MESSAGES, {
    variables: {
      ...filter,
      user1Id,
      user2Id
    },
    fetchPolicy: 'network-only'
  });

  const { data: newMessage } = useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { receiverId: user1Id, senderId: user2Id }
  });

  useEffect(() => {
    if (newMessage) {
      setAllData({ ...allData, messages: [newMessage.newMessageSub, ...allData.messages] });
    }
  }, [newMessage]);

  const [allData, setAllData] = useState({
    count: 0,
    messages: []
  });
  const senderName = useSelector(({ auth }) =>
    auth.authenticated ? auth.data.attributes.name : null
  );

  useEffect(() => {
    if (data && data.getAllMessages) {
      if (filter.page > 1) {
        setAllData({
          ...allData,
          messages: [...allData.messages, ...data.getAllMessages.messages]
        });
      } else {
        setAllData(data.getAllMessages);
      }
    }
  }, [data]);

  const onSend = async (message) => {
    const { data: tempMessage } = await sendOneMessage({
      variables: {
        listingLocation,
        message,
        receiverId: user2Id,
        receiverName: 'listing',
        senderId: user1Id,
        senderName
      }
    });
    setAllData({ ...allData, messages: [tempMessage.sendOneMessage, ...allData.messages] });
  };

  const loadMore = () => setFilter({ ...filter, page: filter.page + 1 });

  return { filter, setFilter, allData, loading, onSend, error, loadMore };
}
