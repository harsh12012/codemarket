/**
 * @format
 */

import { AppRegistry, Linking } from 'react-native';
import Amplify from 'aws-amplify';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import config from '@parkyourself-frontend/shared/aws-exports';
import App from './App';
import { name as appName } from './app.json';

async function urlOpener(url, redirectUrl) {
  await InAppBrowser.isAvailable();
  const { type, url: newUrl } = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false
  });
  let splitUrl = newUrl;
  if (splitUrl && splitUrl.includes('?code')) {
    splitUrl = `parkyourself://?${newUrl.split('#_=_')[0].split('?')[1] || ''}`;
  }
  if (type === 'success') {
    Linking.openURL(splitUrl);
  }
}

Amplify.configure({
  ...config,
  oauth: {
    ...config.oauth,
    redirectSignIn: 'parkyourself://',
    redirectSignOut: 'parkyourself://',
    urlOpener
  }
});

AppRegistry.registerComponent(appName, () => App);
