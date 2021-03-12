import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { client } from '../graphql';

const Create_Payment_Intent = gql`
  query StripeCreatePaymentIntent(
    $driverId: String!
    $name: String!
    $email: String!
    $type: String!
    $ownerId: String!
    $amount: Float!
    $fee: Float!
  ) {
    stripeCreatePaymentIntent(
      driverId: $driverId
      name: $name
      email: $email
      type: $type
      ownerId: $ownerId
      amount: $amount
      fee: $fee
    ) {
      id
      secret
      transferGroup
    }
  }
`;

export function useStripeCreatePaymentIntent() {
  const { driverId, name, email, type } = useSelector(({ auth, user }) =>
    auth.authenticated
      ? {
          driverId: auth.data.attributes.sub,
          name: auth.data.attributes.name,
          email: auth.data.attributes.email,
          type: user.profileType
        }
      : { driverId: '', name: '', email: '', type: user.profileType }
  );
  const createIntent = async ({ ownerId, amount, fee }) => {
    const res = await client.query({
      query: Create_Payment_Intent,
      variables: {
        driverId,
        name,
        email,
        type,
        ownerId,
        amount,
        fee
      },
      fetchPolicy: 'network-only'
    });
    return res;
  };

  return { createIntent };
}

const stripe_Create_Payment_Intent_Offline = gql`
  query StripeCreatePaymentIntentOffline(
    $payment_method: String!
    $driverId: String!
    $type: String!
    $ownerId: String!
    $amount: Float!
    $fee: Float!
  ) {
    stripeCreatePaymentIntentOffline(
      payment_method: $payment_method
      driverId: $driverId
      type: $type
      ownerId: $ownerId
      amount: $amount
      fee: $fee
    ) {
      id
      secret
      transferGroup
    }
  }
`;

export function useStripeCreatePaymentIntentOffline() {
  const { driverId, type } = useSelector(({ auth, user }) =>
    auth.authenticated
      ? {
          driverId: auth.data.attributes.sub,
          type: user.profileType
        }
      : { driverId: '', type: user.profileType }
  );

  const createIntentOffline = async ({
    payment_method = '',
    ownerId = '',
    amount = 0,
    fee = 0
  }) => {
    const res = await client.query({
      query: stripe_Create_Payment_Intent_Offline,
      variables: {
        payment_method,
        driverId,
        type,
        ownerId,
        amount,
        fee
      },
      fetchPolicy: 'network-only'
    });
    return res;
  };

  return { createIntentOffline };
}

const Create_Setup_Intent = gql`
  query StripeCreateSetupIntent(
    $driverId: String!
    $name: String!
    $email: String!
    $type: String!
  ) {
    stripeCreateSetupIntent(driverId: $driverId, name: $name, email: $email, type: $type)
  }
`;

const stripe_List_User_Cards = gql`
  query StripeListUserCards($driverId: String!, $type: String!) {
    stripeListUserCards(driverId: $driverId, type: $type)
  }
`;

const stripe_Detach_Payment_Method = gql`
  query StripeDetachPaymentMethod($payment_method: String!) {
    stripeDetachPaymentMethod(payment_method: $payment_method)
  }
`;

export function useCardCRUD() {
  const { driverId, name, email, type } = useSelector(({ auth, user }) =>
    auth.authenticated
      ? {
          driverId: auth.data.attributes.sub,
          name: auth.data.attributes.name,
          email: auth.data.attributes.email,
          type: user.profileType
        }
      : { driverId: '', name: '', email: '', type: user.profileType }
  );
  const { data, loading, refetch } = useQuery(stripe_List_User_Cards, {
    variables: { driverId, type },
    fetchPolicy: 'network-only'
  });

  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (data && data.stripeListUserCards && JSON.parse(data.stripeListUserCards) !== null) {
      setCards(JSON.parse(data.stripeListUserCards));
    }
  }, [data]);

  const createSetupIntent = async () => {
    return await client.query({
      query: Create_Setup_Intent,
      variables: {
        driverId,
        name,
        email,
        type
      },
      fetchPolicy: 'network-only'
    });
  };

  const handleDeleteCard = async (id) => {
    await client.query({
      query: stripe_Detach_Payment_Method,
      variables: {
        payment_method: id
      },
      fetchPolicy: 'network-only'
    });
    setCards(cards.filter((c) => c.id !== id));
  };

  return { createSetupIntent, cards, handleDeleteCard, refetchCards: refetch, loading };
}
