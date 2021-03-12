import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const CREATE_PROMO_CODE = gql`
  mutation createPromoCode(
    $code: String!
    $listingId: String!
    $discount: Float!
    $quantity: Int!
    $remaining: Int!
    $startDate: String!
    $endDate: String!
  ) {
    createPromoCode(
      listingId: $listingId
      code: $code
      discount: $discount
      quantity: $quantity
      remaining: $remaining
      startDate: $startDate
      endDate: $endDate
    ) {
      _id
      code
      listingId
      createdAt
      discount
      quantity
      remaining
      startDate
      endDate
    }
  }
`;

const UPDATE_PROMO_CODE = gql`
  mutation UpdatePromoCode(
    $code: String!
    $id: ID!
    $discount: Float!
    $quantity: Int!
    $remaining: Int!
    $startDate: String!
    $endDate: String!
  ) {
    updatePromoCode(
      id: $id
      code: $code
      discount: $discount
      quantity: $quantity
      remaining: $remaining
      startDate: $startDate
      endDate: $endDate
    ) {
      _id
      code
      listingId
      createdAt
      discount
      quantity
      remaining
      startDate
      endDate
    }
  }
`;

const DELETE_PROMO_CODE = gql`
  mutation DeletePromoCode($id: ID!) {
    deletePromoCode(id: $id)
  }
`;

const GET_PROMO_CODES_BY_LISTING_ID = gql`
  query GetPromoCodesByListingId($listingId: String!) {
    getPromoCodesByListingId(listingId: $listingId) {
      _id
      code
      listingId
      createdAt
      discount
      quantity
      remaining
      startDate
      endDate
    }
  }
`;

const CHECK_PROMO_CODE = gql`
  query checkPromoCodeIsValid($code: String!, $listingId: String!) {
    checkPromoCode(code: $code, listingId: $listingId) {
      isValid
      discount
      id
    }
  }
`;

export const useCRUDPromoCodes = () => {
  const [createPromoCode] = useMutation(CREATE_PROMO_CODE);
  const [updatePromoCode] = useMutation(UPDATE_PROMO_CODE);
  const [removePromoCode] = useMutation(DELETE_PROMO_CODE);

  const addPromoCode = async (promoCodeData) => {
    try {
      const response = await createPromoCode({
        variables: promoCodeData
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

  const handleUpdatePromoCode = async (data) => {
    try {
      const response = await updatePromoCode({
        variables: data
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

  const deletePromoCode = async (id) => {
    try {
      const response = await removePromoCode({
        variables: { id: id }
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

  const getPromoCodesByListingId = (listingId) => {
    const data = useQuery(GET_PROMO_CODES_BY_LISTING_ID, {
      variables: {
        listingId
      },
      fetchPolicy: 'network-only'
    });

    return data;
  };

  const checkPromoCodeIsValid = (code, listingId) => {
    console.log('called');
    const data = useLazyQuery(CHECK_PROMO_CODE, {
      variables: {
        code,
        listingId
      }
    });

    return data;
  };

  return {
    addPromoCode,
    handleUpdatePromoCode,
    deletePromoCode,
    getPromoCodesByListingId,
    checkPromoCodeIsValid
  };
};
