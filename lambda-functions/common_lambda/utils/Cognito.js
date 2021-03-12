const AWS = require('aws-sdk');
const UserPoolId = process.env.USER_POOL_ID;

AWS.config.region = 'us-east-1';

AWS.config.apiVersions = {
  cognitoidentityserviceprovider: '2016-04-18',
};

const adminCreateUser = ({ password, email, name, picture }) => {
  return new AWS.CognitoIdentityServiceProvider()
    .adminCreateUser({
      UserPoolId: UserPoolId,
      Username: email,
      TemporaryPassword: password,
      MessageAction: 'SUPPRESS',
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'email_verified',
          Value: 'true',
        },
        {
          Name: 'name',
          Value: name,
        },
        {
          Name: 'picture',
          Value: picture
            ? picture
            : 'https://parkyourselfbucket154227-dev.s3.amazonaws.com/public/default/default.jpg',
        },
      ],
    })
    .promise();
};

const adminCreateNativeUserAndLink = async ({
  email,
  name,
  picture,
  providerName,
  providerUserId,
}) => {
  let password =
    Math.random().toString(36).slice(2) +
    Math.random().toString(36).toUpperCase().slice(2);
  let newPassword =
    Math.random().toString(36).slice(2) +
    Math.random().toString(36).toUpperCase().slice(2);

  const user = await adminCreateUser({ name, email, picture, password });
  // console.log('adminCreateUser', user);
  await adminSetUserPassword({
    username: user.User.Username,
    password: newPassword,
  });
  await linkProviderToUser({
    username: user.User.Username,
    providerName,
    providerUserId,
  });
  return user.User.Username;
};

const adminSetUserPassword = ({ username, password }) => {
  return new AWS.CognitoIdentityServiceProvider()
    .adminSetUserPassword({
      UserPoolId: UserPoolId,
      Username: username,
      Password: password,
      Permanent: true,
    })
    .promise();
};

const adminToggleUserStatus = (data) => {
  var params = {
    UserPoolId: UserPoolId,
    Username: data.username,
  };
  if (data.status) {
    return new AWS.CognitoIdentityServiceProvider()
      .adminEnableUser(params)
      .promise();
  } else {
    return new AWS.CognitoIdentityServiceProvider()
      .adminDisableUser(params)
      .promise();
  }
};

const listAllUsers = (data) => {
  var params = {
    UserPoolId: UserPoolId,
    Limit: data.limit,
    Filter: data.filter ? data.filter : '', //`email ^= \"${data.email ? data.email : ""}"`,
  };
  if (data.paginationToken) params.PaginationToken = data.paginationToken;
  return new AWS.CognitoIdentityServiceProvider().listUsers(params).promise();
};

const createGroup = (data) => {
  var params = {
    GroupName: data.groupName,
    UserPoolId: UserPoolId,
  };
  return new AWS.CognitoIdentityServiceProvider().createGroup(params).promise();
};

const deleteGroup = (data) => {
  var params = {
    GroupName: data.groupName,
    UserPoolId: UserPoolId,
  };
  return new AWS.CognitoIdentityServiceProvider().deleteGroup(params).promise();
};

const listUsersInGroup = (data) => {
  var params = {
    GroupName: data.groupName,
    UserPoolId: UserPoolId,
  };
  return new AWS.CognitoIdentityServiceProvider()
    .listUsersInGroup(params)
    .promise();
};

const adminAddUserToGroup = (data) => {
  var params = {
    GroupName: data.groupName,
    UserPoolId: UserPoolId,
    Username: data.username,
  };
  return new AWS.CognitoIdentityServiceProvider()
    .adminAddUserToGroup(params)
    .promise();
};

const adminRemoveUserFromGroup = (data) => {
  var params = {
    GroupName: data.groupName,
    UserPoolId: UserPoolId,
    Username: data.username,
  };
  return new AWS.CognitoIdentityServiceProvider()
    .adminRemoveUserFromGroup(params)
    .promise();
};

const adminUpdateUserAttributes = (data) => {
  var params = {
    UserPoolId: UserPoolId,
    Username: data.username,
    UserAttributes: [
      {
        Name: data.name,
        Value: data.value,
      },
    ],
  };
  return new AWS.CognitoIdentityServiceProvider()
    .adminUpdateUserAttributes(params)
    .promise();
};

const listUsers = (data) => {
  var params = {
    UserPoolId: data.userPoolId || UserPoolId,
    Filter: `email = \"${data.email}"`,
  };
  return new AWS.CognitoIdentityServiceProvider().listUsers(params).promise();
};

const linkProviderToUser = async ({
  username,
  providerName,
  providerUserId,
}) => {
  const params = {
    DestinationUser: {
      ProviderAttributeValue: username,
      ProviderName: 'Cognito',
    },
    SourceUser: {
      ProviderAttributeName: 'Cognito_Subject',
      ProviderAttributeValue: providerUserId,
      ProviderName: providerName,
    },
    UserPoolId: UserPoolId,
  };
  return new AWS.CognitoIdentityServiceProvider()
    .adminLinkProviderForUser(params)
    .promise();
};

const test = async () => {
  const data = {
    // GroupName: data.groupName,
    UserPoolId: 'us-east-1_biMepTpwK',
    username: 'Google_101516729143320988639',
    limit: 20,
    paginationToken: null,
    status: false,
  };
  const ress = await adminCreateUser();
  // const ress = await adminToggleUserStatus(data);
  // const ress = await listAllUsers(data);
  // const ress = await createGroup();
  // const ress = await deleteGroup();
  // const ress = await listUsersInGroup();
  // const ress = await adminAddUserToGroup();
  // const ress = await adminRemoveUserFromGroup();
  // const ress = await adminUpdateUserAttributes();
  console.log('test function');
  // console.log("ress", ress.Users[0]);
  console.log('ress', ress);
};

// test();
// node lambda-functions/common_lambda/utils/Cognito.js

module.exports = {
  adminCreateNativeUserAndLink: adminCreateNativeUserAndLink,
  adminCreateUser: adminCreateUser,
  linkProviderToUser: linkProviderToUser,
  adminToggleUserStatus: adminToggleUserStatus,
  listAllUsers: listAllUsers,
  createGroup: createGroup,
  deleteGroup: deleteGroup,
  listUsersInGroup: listUsersInGroup,
  adminAddUserToGroup: adminAddUserToGroup,
  adminRemoveUserFromGroup: adminRemoveUserFromGroup,
  adminUpdateUserAttributes: adminUpdateUserAttributes,
  listUsers: listUsers,
};
