const DB = require('../../utils/DB');
const User = require('./utils/userModel');
const Cognito = require('../common_lambda/utils/Cognito');
DB();

exports.handler = async (event) => {
  try {
    if (event.triggerSource) {
      console.log('Pre Sign up Event', event);
      if (
        event.triggerSource == 'PreSignUp_ExternalProvider' ||
        event.triggerSource == 'PreSignUp_AdminCreateUser'
      ) {
        event.response.autoConfirmUser = true;
        event.response.autoVerifyEmail = true;
        event.request.userAttributes.email_verified = 'true';
      }
      if (event.userName.includes('acebook')) {
        event.request.userAttributes.picture =
          event.request.userAttributes.picture.data.url;
      }
      let existingUser = null;
      const userPoolId = event.userPoolId;
      const username = event.userName;
      const email = event.request.userAttributes.email;
      const name = event.request.userAttributes.name;
      const picture = event.request.userAttributes.picture;
      if (event.triggerSource == 'PreSignUp_ExternalProvider') {
        // event.response.autoConfirmUser = true;
        // event.response.autoVerifyEmail = true;
        // event.request.userAttributes.email_verified = 'true';
        let [providerName, providerUserId] = username.split('_');
        providerName = ['Google', 'Facebook'].find(
          (val) => providerName.toUpperCase() === val.toUpperCase()
        );
        existingUser = await Cognito.listUsers({
          userPoolId,
          email,
        });
        if (
          existingUser &&
          existingUser.Users &&
          existingUser.Users.length > 0
        ) {
          return await Cognito.linkProviderToUser({
            username: existingUser.Users[0].Username,
            providerName,
            providerUserId,
          });
        } else {
          return await Cognito.adminCreateNativeUserAndLink({
            name,
            email,
            picture,
            providerName,
            providerUserId,
          });
        }
      } else {
        // Also create stripe user here

        await User.create({
          username,
          name,
          email,
          picture,
          createdBy: event.triggerSource,
        });
        return event;
      }
    }
  } catch (error) {
    console.log('Error', error);
    throw error;
  }
};
