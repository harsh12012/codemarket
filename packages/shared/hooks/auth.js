import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';
import { setAuthUser } from '../redux/actions/auth';
import { useAddUserEndpoint } from './users';

export function useSignup() {}

export function useSignin({ mobile = false, onAlert = () => {}, getEndpoint = () => null }) {
  const [state, setState] = useState({
    email: '',
    verify: false,
    code: '',
    disabled: false,
    auth: false,
    forgetPassword: false
  });
  const dispatch = useDispatch();
  const addUserEndpoint = useAddUserEndpoint();

  const onSubmit = (payload) => {
    const { verify } = state;
    setState({ ...state, disabled: true });
    if (verify) {
      confirmSignUp(payload);
    } else {
      signIn(payload);
    }
  };
  const signIn = async (payload) => {
    const { password, email } = payload;
    try {
      const user = await Auth.signIn(email, password);
      setState({
        ...state,
        verify: false,
        disabled: false
      });

      if (mobile) {
        const endpoint = await getEndpoint();
        if (endpoint) {
          await addUserEndpoint({ username: user.attributes.sub, endpoint });
        }
      }

      const data = {
        attributes: user.attributes,
        signInUserSession: user.signInUserSession,
        admin: user.signInUserSession.accessToken.payload['cognito:groups']
          ? user.signInUserSession.accessToken.payload['cognito:groups'].indexOf('superadmin') > -1
          : false
      };
      dispatch(setAuthUser(data));
    } catch (error) {
      setState({ ...state, disabled: false });
      if (error.code === 'UserNotConfirmedException') {
        sendVerificationCode(email);
      } else {
        onAlert('Error', error.message);
      }
    }
  };

  const sendVerificationCode = async (email) => {
    try {
      await Auth.resendSignUp(email);
      setState({
        ...state,
        email,
        disabled: false,
        verify: true
      });
    } catch (error) {
      setState({
        ...state,
        disabled: false
      });
      onAlert('Error', error.message);
      //   Alert.alert('Error', error.message);
    }
  };

  const confirmSignUp = async (payload) => {
    const { email } = state;
    const { code } = payload;
    try {
      await Auth.confirmSignUp(email, code);
      setState({
        code: '',
        email: '',
        disabled: false,
        auth: true,
        verify: false
      });
      onAlert('Email Verified Successfully', 'Please Sign In now with your email and password');
    } catch (error) {
      setState({ ...state, disabled: false });
      onAlert('Error', error.message);
    }
  };
  return { state, setState, signIn, onSubmit };
}
