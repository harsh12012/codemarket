import { useState, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

const GET_STRIPE_PAYMENT_REPORT = gql`
    query Query($userId:String!){
        stripeGetPaymentReport(userId:$userId){
            totalEarnings,
            lastMonthEarnings,
            availableForWithdrawal,

        }
    }   
`


export const useGetStripePaymentReport = (userId) =>{
        const data = useQuery(GET_STRIPE_PAYMENT_REPORT,{
            variables:{
                userId:userId
            }
        })
        return data;
}