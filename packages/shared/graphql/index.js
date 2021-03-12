/* eslint-disable import/prefer-default-export */
import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';

import appSyncConfig from '../aws-exports';

const url = appSyncConfig.aws_appsync_graphqlEndpoint;
const region = appSyncConfig.aws_appsync_region;
const auth = {
  type: appSyncConfig.aws_appsync_authenticationType,
  apiKey: appSyncConfig.aws_appsync_apiKey
};

const httpLink = createHttpLink({ uri: url });

const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink(url, httpLink)
]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

// import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// import { createAppSyncLink } from 'aws-appsync';
// import aws_exports from '../aws-exports';

// const url = aws_exports.aws_appsync_graphqlEndpoint;
// const apiKey = aws_exports.aws_appsync_apiKey;

// const region = aws_exports.aws_appsync_region;

// const httpLink = createHttpLink({
//   uri: url
// });

// const awsLink = createAppSyncLink({
//   url: url,
//   region: region,
//   auth: {
//     type: aws_exports.aws_appsync_authenticationType,
//     apiKey: apiKey
//   }
//   // complexObjectsCredentials: () => Auth.currentCredentials(),
// });

// export const client = new ApolloClient({
//   // link,
//   link: awsLink.concat(httpLink),
//   cache: new InMemoryCache()
// });
