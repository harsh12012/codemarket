import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  Platform,
  NativeModules,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Auth, Hub } from 'aws-amplify';
import Analytics from '@aws-amplify/analytics';
import PushNotification from '@aws-amplify/pushnotification';
import { PushNotificationIOS } from '@react-native-community/push-notification-ios';
import reducer from '@parkyourself-frontend/shared/redux/reducers';
import middleware from '@parkyourself-frontend/shared/redux/middleware';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist5';
import { PersistGate } from 'redux-persist5/integration/react';
import { ApolloProvider } from '@apollo/client';
import { client } from '@parkyourself-frontend/shared/graphql';
import AsyncStorage from '@react-native-community/async-storage';
import { setAuthUser, initialAuthUser } from '@parkyourself-frontend/shared/redux/actions/auth';
import { toggleLoadingModal } from '@parkyourself-frontend/shared/redux/actions/user';
import RNBootSplash from 'react-native-bootsplash';
import config from '@parkyourself-frontend/shared/aws-exports';
import MainStack from './src/navigation/MainStack';
import LoadingModal from './src/components/common/LoadingModal';

PushNotification.configure(config);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['tempListing', 'redirect', 'findParking', 'booking']
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);

PushNotification.onRegister(async (token) => {
  await AsyncStorage.setItem('deviceToken', token);
  console.log(`PushNotification.onRegister: ================== ${token}`);
  PushNotification.updateEndpoint(token);
});

if (Platform.OS === 'android') {
  // In case PushNotification.onRegister didn't work
  NativeModules.RNPushNotification.getToken(async (token) => {
    await AsyncStorage.setItem('deviceToken', token);
    console.log(`NativeModules.RNPushNotification.getToken: ${token}`);
  });
}

PushNotification.onNotification((notification) => {
  console.log('in app notification', notification);
  if (Platform.OS === 'ios') {
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  }
});

PushNotification.onNotificationOpened((notification) => {
  console.log('the notification is opened', notification);
});

if (Platform.OS === 'ios') {
  PushNotification.requestIOSPermissions();
}

const App = (props) => {
  const [endpointId, setEndpointId] = useState('no endpoint');
  const [token, setToken] = useState('no token');
  const [userId, setUserId] = useState('no endpoint');

  const onClick = async () => {
    const myendpointId = Analytics.getPluggable('AWSPinpoint')._config.endpointId;
    console.log('myendpointId', myendpointId);
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    console.log('deviceToken', deviceToken);
    setEndpointId(myendpointId);
    setToken(deviceToken);
    Analytics.updateEndpoint({
      address: deviceToken
    });
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <LoadingModal />
          {/* <SafeAreaView>
            <Text style={{ paddingTop: 100 }}>endpointId = {endpointId}</Text>
            <Text>token = {token}</Text>
            <TouchableOpacity
              onPress={onClick}
              style={{
                backgroundColor: 'blue',
                padding: 10,
                marginHorizontal: '10%',
                marginTop: 10
              }}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>
                CLICK GET TOKEN AND ENPOINT
              </Text>
            </TouchableOpacity>
          </SafeAreaView> */}
          <GetData />
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const GetData = connect()((props) => {
  const getAuthData = async () => {
    try {
      await RNBootSplash.hide({ fade: true });
      props.dispatch(toggleLoadingModal(true));
      const user = await Auth.currentAuthenticatedUser();
      // console.log('User', user);
      if (user) {
        // Alert.alert('User', 'Got user');
        const data = {
          attributes: user.attributes,
          signInUserSession: user.signInUserSession,
          admin: user.signInUserSession.accessToken.payload['cognito:groups']
            ? user.signInUserSession.accessToken.payload['cognito:groups'].indexOf('superadmin') >
              -1
            : false
        };
        props.dispatch(toggleLoadingModal(false));
        props.dispatch(setAuthUser(data));
      }

      props.dispatch(initialAuthUser());
    } catch (error) {
      props.dispatch(initialAuthUser());
      props.dispatch(toggleLoadingModal(false));
      // Alert.alert('No Data Found', error.message);
      // console.log('Error', error);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then((url2) => {
        handleOpenURL({ url: url2 });
      });
    } else {
      Linking.addEventListener('url', handleOpenURL);
    }
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          getAuthData();
          break;
        case 'cognitoHostedUI_failure':
          Alert.alert('Sign In Failed', `Please try again`);
          props.dispatch(toggleLoadingModal(false));
          break;
        default:
          return null;
      }
    });
    getAuthData();
    return () => Linking.removeEventListener('url', handleOpenURL);
  }, []);

  const handleOpenURL = (event) => {
    if (event.url && event.url.includes('?code')) {
      props.dispatch(toggleLoadingModal(true));
    }
  };
  return null;
});
