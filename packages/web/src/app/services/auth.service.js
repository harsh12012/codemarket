import {Auth} from 'aws-amplify';

const forgetPasswordService = async (email) => {
  return await Auth.forgotPassword(email);
};

const resetPasswordService = async (email, code, password) => {
  return await Auth.forgotPasswordSubmit(email, code, password);
};

const signInService = async (email, password) => {
  return await Auth.signIn(email, password);
};

export default {
  forgetPasswordService,
  resetPasswordService,
  signInService,
};
