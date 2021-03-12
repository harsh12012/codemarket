const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const createPaymentIntent = async (data) => {
  const transfer_group = uuidv4();
  const paymentIntent = await stripe.paymentIntents.create({
    customer: data.customer,
    payment_method_types: ['card'],
    amount: parseInt(data.amount * 100),
    currency: 'usd',
    transfer_group: transfer_group,
    // application_fee_amount: data.fee,
    // transfer_data: {
    //   destination: data.account,
    // },
  });
  // console.log(paymentIntent);
  // return paymentIntent.client_secret;
  return {
    secret: paymentIntent.client_secret,
    id: paymentIntent.id,
    transferGroup: transfer_group,
  };
};

const createPaymentIntentOffline = async (data) => {
  const transfer_group = uuidv4();
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(data.amount * 100),
    currency: 'usd',
    customer: data.customer,
    payment_method: data.payment_method,
    off_session: true,
    confirm: true,
    transfer_group: transfer_group,
    // application_fee_amount: data.fee,
    // transfer_data: {
    //   destination: data.account,
    // },
  });
  // console.log(paymentIntent.status);
  // return paymentIntent.status;
  return {
    secret: paymentIntent.status,
    id: paymentIntent.id,
    transferGroup: transfer_group,
  };
};

const createRefund = async (data) => {
  const refund = await stripe.refunds.create({
    payment_intent: data.paymentIntent,
  });
  // console.log(refund.status);
  return refund.status;
};

const createTransfer = async (data) => {
  const transfer = await stripe.transfers.create({
    amount: data.amount,
    currency: 'usd',
    destination: data.account,
    transfer_group: data.transfer_group,
  });
  // console.log(transfer);
  return transfer;
};

const createSetupIntent = async (data) => {
  const intent = await stripe.setupIntents.create({
    customer: data.customer,
  });
  // console.log(intent.client_secret);
  return intent.client_secret;
};

const createCustomer = async (data) => {
  const customer = await stripe.customers.create({
    email: data.email,
    name: data.name,
  });
  // console.log(customer.id);
  return customer.id;
};

const listPaymentMethods = async (data) => {
  const paymentMethods = await stripe.paymentMethods.list({
    customer: data.customer,
    type: 'card',
  });
  // console.log(paymentMethods.data);
  return paymentMethods.data;
};

const retrievePaymentMethod = async (data) => {
  const paymentMethod = await stripe.paymentMethods.retrieve(
    data.payment_method
  );
  // console.log(paymentMethod);
  return paymentMethod;
};

const detachPaymentMethod = async (data) => {
  const paymentMethod = await stripe.paymentMethods.detach(data.payment_method);
  // console.log(paymentMethod);
  return 'true';
};

const dataP = {
  account: 'acct_1HgQ2zIIQMfBcets',
  amount: 98765,
  fee: 136,
  email: 'contactvivekvt@gmail.com',
  name: 'Vivek Thakur',
  customer: 'cus_IIIc9GiqNJ8gy5',
  payment_method: 'pm_1HhtIxDPrb5EfwdRlUqwmrKT',
  paymentIntent: 'pi_1HoYYpDPrb5EfwdRvYREVUcG',
};

// createRefund(dataP);
// createPaymentIntent(dataP);
// createPaymentIntentOffline(dataP);
// createCustomer(dataP);
// createSetupIntent(dataP);
// listPaymentMethods(dataP);
// detachPaymentMethod(dataP);
// retrievePaymentMethod(dataP);

// node lambda-functions/payment_lambda/utils/stripePayment.js

module.exports = {
  createPaymentIntent: createPaymentIntent,
  createPaymentIntentOffline: createPaymentIntentOffline,
  createSetupIntent: createSetupIntent,
  createCustomer: createCustomer,
  listPaymentMethods: listPaymentMethods,
  retrievePaymentMethod: retrievePaymentMethod,
  detachPaymentMethod: detachPaymentMethod,
  createRefund: createRefund,
  createTransfer: createTransfer,
};
