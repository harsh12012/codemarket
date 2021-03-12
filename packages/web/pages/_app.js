import React, { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ReduxLoadingBar from 'react-redux-loading';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import Amplify, { Auth } from 'aws-amplify';
import reducer from '@parkyourself-frontend/shared/redux/reducers';
import middleware from '@parkyourself-frontend/shared/redux/middleware';
import { ApolloProvider } from '@apollo/client';
import { client } from '@parkyourself-frontend/shared/graphql';
import aws_exports from '@parkyourself-frontend/shared/aws-exports';
import { setAuthUser, initialAuthUser } from '@parkyourself-frontend/shared/redux/actions/auth';
import { loadUserType } from '@parkyourself-frontend/shared/redux/actions/user';

// CSS Imports
import 'bootstrap/dist/css/bootstrap.min.css';

import '../src/app/assets/css/App.css';
import '../styles/styles.scss';
import '../src/app/assets/css/stripestyles.css';

import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import 'react-date-picker/dist/DatePicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-day-picker/lib/style.css';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

// react-toastify
import 'react-toastify/dist/ReactToastify.css';

Amplify.configure({
  ...aws_exports,
  ssr: true,
  oauth: {
    ...aws_exports.oauth,
    redirectSignIn: true ? 'https://d3fmot6d29rs7w.cloudfront.net/' : 'http://localhost:3000/',
    redirectSignOut: true ? 'https://d3fmot6d29rs7w.cloudfront.net/' : 'http://localhost:3000/'
  }
});

const stripePromise = loadStripe(
  'pk_test_517LnJnDPrb5EfwdRchW3z9AVO6xddwRZtSHqD311B4HW5j9Ouh9dmzU6UDiwH5Hwgh7jWSaqiQn7phQGitMPS0C500jhmK4yHw'
);

const store = createStore(reducer, middleware);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Elements stripe={stripePromise}>
          <ReduxLoadingBar style={{ color: 'red', zIndex: 9989, position: 'fixed', top: 0 }} />
          <GetData />
          <Component {...pageProps} />
        </Elements>
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;

const GetData = connect()((props) => {
  const getAuthData = async () => {
    try {
      let user = await Auth.currentAuthenticatedUser();
      if (user) {
        const data = {
          attributes: user.attributes,
          signInUserSession: user.signInUserSession,
          admin: user.signInUserSession.accessToken.payload['cognito:groups']
            ? user.signInUserSession.accessToken.payload['cognito:groups'].indexOf('superadmin') >
              -1
            : false
        };
        props.dispatch(setAuthUser(data));
        if (localStorage.getItem('isSpaceOwner')) {
          props.dispatch(
            loadUserType(localStorage.getItem('isSpaceOwner') === 'true' ? true : false)
          );
        }

        // props.dispatch(initialAuthUser());
      }
    } catch (error) {
      props.dispatch(initialAuthUser());
      // console.log("Erro", error);
      // router.push("/");
    }
  };

  useEffect(() => {
    getAuthData();
  }, []);
  return null;
});
