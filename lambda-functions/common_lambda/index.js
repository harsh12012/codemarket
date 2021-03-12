const cognito = require('./utils/Cognito');
const { mailer } = require('../../utils/mailer');

exports.handler = async (event) => {
  try {
    switch (event.type) {
      case 'listUsersInGroup':
        return (await cognito.listUsersInGroup(event.arguments)).Users;
      case 'adminListAllUsers':
        return await cognito.listAllUsers(event.arguments);
      case 'listCognitoUsersByEmail':
        return (await cognito.listUsers(event.arguments)).Users;
      case 'createGroup':
        return await cognito.createGroup(event.arguments);
      case 'deleteGroup':
        return await cognito.deleteGroup(event.arguments);
      case 'adminAddUserToGroup':
        return await cognito.adminAddUserToGroup(event.arguments);
      case 'adminRemoveUserFromGroup':
        return await cognito.adminRemoveUserFromGroup(event.arguments);
      case 'adminUpdateUserAttributes':
        return await cognito.adminUpdateUserAttributes(event.arguments);
      case 'adminToggleUserStatus':
        return await cognito.adminToggleUserStatus(event.arguments);
      case 'adminAddUserToGroupRole':
        await cognito.adminAddUserToGroup(event.arguments);
        await cognito.adminUpdateUserAttributes({
          name: 'custom:role',
          value: event.arguments.role,
          username: event.arguments.username,
        });
        // Send Email to driver and space owner
        const tempData = {
          emails: [event.arguments.email],
          subject: 'You are added as staff member',
          message: 'You are added as staff member to a parking on parkyourself',
        };
        return await mailer(tempData);
      default:
        return null;
    }
  } catch (error) {
    throw error;
  }
};
