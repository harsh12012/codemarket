const AWS = require('aws-sdk');
const cognitoIdp = new AWS.CognitoIdentityServiceProvider();

const markUserEmailAsVerified = async (username, userPoolId) => {
  console.log('marking email as verified for user with username: ' + username);
  const params = {
    UserAttributes: [
      {
        Name: 'email_verified',
        Value: 'true',
      },
      // other user attributes like phone_number or email themselves, etc
    ],
    UserPoolId: userPoolId,
    Username: username,
  };

  const result = await new Promise((resolve, reject) => {
    cognitoIdp.adminUpdateUserAttributes(params, (err, data) => {
      if (err) {
        console.log(
          'Failed to mark user email as verified with error:\n' +
            err +
            '\n. Manual action is required to mark user email as verified otherwise he/she cannot login with email & password'
        );
        reject(err);
        return;
      }
      resolve(data);
    });
  });

  return result;
};

exports.handler = async (event, context, callback) => {
  console.log('event data:\n' + JSON.stringify(event));

  const isEmailVerified = event.request.userAttributes.email_verified;
  if (isEmailVerified === 'false') {
    await markUserEmailAsVerified(event.userName, event.userPoolId);
  }

  return callback(null, event);
};
