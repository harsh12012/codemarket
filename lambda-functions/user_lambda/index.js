const mongoose = require('mongoose');
const DB = require('../../utils/DB');
const User = require('./utils/userModel');
const cognito = require('../common_lambda/utils/Cognito');
DB();

exports.handler = async (event) => {
  try {
    let tempUser = null;
    let tempCognitoUser = null;
    let userFlag = null;
    let tempId = null;
    let tempFilter = {};
    if (event.triggerSource) {
      // console.log('Pre Sign up Event', event);
      if (event.userName.includes('Facebook')) {
        event.request.userAttributes.picture =
          event.request.userAttributes.picture.data.url;
      }
      tempCognitoUser = await cognito.listUsers({
        email: event.request.userAttributes.email,
      });
      const username = event.userName;
      userFlag =
        tempCognitoUser &&
        tempCognitoUser.Users &&
        tempCognitoUser.Users[0] &&
        tempCognitoUser.Users[0].Username;

      if (!userFlag) {
        if (event.triggerSource == 'PreSignUp_ExternalProvider') {
          // let [providerName, providerUserId] = event.userName.split('_');
          let [providerName, providerUserId] = username.split('_');
          providerName = ['Google', 'Facebook'].find(
            (val) => providerName.toUpperCase() === val.toUpperCase()
          );
          let tempUsername = await cognito.adminCreateNativeUserAndLink({
            name: event.request.userAttributes.name,
            email: event.request.userAttributes.email,
            picture: event.request.userAttributes.picture,
            providerName,
            providerUserId,
          });
          // tempUser = {
          //   username: tempUsername,
          //   name: event.request.userAttributes.name,
          //   email: event.request.userAttributes.email,
          //   picture: event.request.userAttributes.picture,
          //   createdBy: event.triggerSource,
          // };
          // await User.create(tempUser);
          // return event;
          return 'ACCOUNT_LINKED';
        } else {
          tempUser = {
            username: event.userName,
            name: event.request.userAttributes.name,
            email: event.request.userAttributes.email,
            picture: event.request.userAttributes.picture,
            createdBy: event.triggerSource,
          };
          await User.create(tempUser);
          return event;
        }
      } else if (
        userFlag &&
        event.triggerSource == 'PreSignUp_ExternalProvider'
      ) {
        // Link User
        // let [providerName, providerUserId] = event.userName.split('_');
        let [providerName, providerUserId] = username.split('_');
        providerName = ['Google', 'Facebook'].find(
          (val) => providerName.toUpperCase() === val.toUpperCase()
        );
        await cognito.linkProviderToUser({
          username: tempCognitoUser.Users[0].Username,
          providerName,
          providerUserId,
        });
        // tempUser = {
        //   username: event.userName,
        //   name: event.request.userAttributes.name,
        //   email: event.request.userAttributes.email,
        //   picture: event.request.userAttributes.picture,
        //   createdBy: event.triggerSource,
        // };
        // await User.create(tempUser);
        // throw new Error('ACCOUNT_LINKED');
        return 'ACCOUNT_LINKED';
      } else if (
        (userFlag && event.triggerSource == 'PreSignUp_SignUp') ||
        event.triggerSource == 'PreSignUp_AdminCreateUser'
      ) {
        return 'User already exists with this email';
      }
    }

    switch (event.type) {
      case 'getAllUsers':
        return await User.find(
          event.arguments.filter ? JSON.parse(event.arguments.filter) : {}
        );
      case 'getAllUsersSearch':
        const {
          page = 1,
          limit = 10,
          status = 'open',
          search = '',
          lowerRange = null,
          higherRange = null,
          sortBy = '-createdAtDate',
          bookings = 0,
          listings = 0,
          active = null,
        } = event.arguments;

        if (active !== null) {
          tempFilter.active = active;
        }

        if (lowerRange !== null && higherRange !== null) {
          tempFilter.createdAtDate = {
            $gte: Date.parse(lowerRange),
            $lte: Date.parse(higherRange),
          };
        }

        const users = await User.find({
          ...tempFilter,
          status,
          bookings: { $gte: bookings },
          listings: { $gte: listings },
          $or: [
            {
              email: { $regex: search, $options: 'i' },
            },
            {
              name: { $regex: search, $options: 'i' },
            },
          ],
        })
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .sort(sortBy)
          .exec();

        const usersCount = await User.countDocuments({
          ...tempFilter,
          status,
          bookings: { $gte: bookings },
          listings: { $gte: listings },
          $or: [
            {
              email: { $regex: search, $options: 'i' },
            },
            {
              name: { $regex: search, $options: 'i' },
            },
          ],
        });

        return {
          users: users,
          count: usersCount,
        };
      case 'getOneUserId':
        return await User.findById(event.arguments.id);
      case 'getOneUserSub':
        return await User.findOne({
          username: event.arguments.username,
          status: 'open',
        });
      case 'toggleOneUserStatus':
        await cognito.adminToggleUserStatus(event.arguments);
        tempUser = await User.findOne({
          username: event.arguments.username,
          status: 'open',
        });
        tempId = tempUser._id;
        tempUser._id = mongoose.Types.ObjectId();
        tempUser.ref = mongoose.Types.ObjectId(tempId);
        tempUser.status = 'close';
        tempUser.isNew = true;
        tempUser.save();
        return await User.findByIdAndUpdate(
          tempId,
          {
            active: event.arguments.status,
            updatedBy: event.arguments.updatedBy,
            updatedAt: new Date(),
          },
          {
            new: true,
            runValidators: true,
          }
        );
      case 'updateOneUser':
        tempUser = await User.findOne({
          username: event.arguments.username,
          status: 'open',
        });
        tempId = tempUser._id;
        tempUser._id = mongoose.Types.ObjectId();
        tempUser.ref = mongoose.Types.ObjectId(tempId);
        tempUser.status = 'close';
        tempUser.isNew = true;
        tempUser.save();
        return await User.findByIdAndUpdate(
          tempId,
          { ...event.arguments, updatedAt: new Date() },
          {
            new: true,
            runValidators: true,
          }
        );
      case 'addUserEndpoint':
        const tempUser = await User.findOne({
          username: event.arguments.username,
          status: 'open',
        });
        let alreadyExist = [];
        alreadyExist = tempUser.endpoints.filter(
          (e) => e !== event.arguments.endpoint
        );
        if (alreadyExist.length > 0) {
          tempUser.endpoints.push(event.arguments.endpoint);
          await tempUser.save();
        }
        return true;
      case 'removeUserEndpoint':
        await User.update(
          {
            username: event.arguments.username,
            status: 'open',
          },
          {
            $pull: {
              endpoints: event.arguments.endpoint,
            },
          }
        );
        return true;
      default:
        return null;
    }
  } catch (error) {
    throw error;
  }
};
