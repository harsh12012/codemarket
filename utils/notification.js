const AWS = require('aws-sdk');
const DB = require('../utils/DB');
const User = require('../lambda-functions/user_lambda/utils/userModel');

DB();

const region = process.env.REGION || 'us-east-1';

AWS.config.update({ region: region });

const pinpoint = new AWS.Pinpoint();

const applicationId =
  process.env.PINPOINT_APP_ID || 'c8f60bb963054bc8a8ceb2bda77acb67';

function CreateMessageRequest({
  title,
  message,
  action = 'OPEN_APP',
  silent = false,
  endpoints,
}) {
  var messageRequest = {
    Endpoints: {
      ...endpoints,
    },
    MessageConfiguration: {
      DefaultMessage: {
        Body: message,
        Substitutions: {},
      },
      DefaultPushNotificationMessage: {
        Title: title,
        Body: message,
        Action: action,
        // Url: url,
        SilentPush: silent,
        Data: {},
      },
    },
  };
  return messageRequest;
}

async function sendNotification(data) {
  const tempUser = await User.findOne({ username: data.username });
  if (tempUser && tempUser.endpoints.length > 0) {
    const endpointsArray = tempUser.endpoints;
    let endpoints = {};
    endpointsArray.map((e) => {
      endpoints[e] = {};
    });
    console.log(endpoints);
    var messageRequest = CreateMessageRequest({ ...data, endpoints });

    var params = {
      ApplicationId: applicationId,
      MessageRequest: messageRequest,
    };

    // const res =
    await pinpoint.sendMessages(params).promise();
    // console.log('res', res);
  }
}

module.exports = sendNotification;

// const data = {
//   title: 'Test message sent from Amazon Pinpoint',
//   message:
//     'This is a sample message sent from Amazon Pinpoint by using the ' +
//     'AWS SDK for JavaScript in Node.js',
//   action: 'OPEN_APP',
//   silent: false,
//   username: 'ac7e598c-86dc-4668-9eef-8f21b0b6b3ed',
//   endpoint: '7dd28850-769b-11eb-9777-87de3795ba1a',
// };

// sendNotification(data);
