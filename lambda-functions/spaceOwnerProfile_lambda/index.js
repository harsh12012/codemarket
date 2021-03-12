const DB = require('../../utils/DB');
const SpaceOwnerProfile = require('./utils/spaceOwnerProfileModel');
DB();

exports.handler = async (event) => {
  try {
    switch (event.type) {
      case 'getSpaceOwnerProfiles':
        return await SpaceOwnerProfile.find();
      case 'getUserSpaceOwnerProfile':
        return await SpaceOwnerProfile.findOne({ userId: event.arguments.userId }).exec();
      case 'createSpaceOwnerProfile':
        return await SpaceOwnerProfile.create(event.arguments);
      case 'updateSpaceOwnerProfile':
        return await SpaceOwnerProfile.findByIdAndUpdate(
          event.arguments.id,
          event.arguments,
          {
            new: true,
            runValidators: true,
          }
        );
      case 'deleteSpaceOwnerProfile':
        return await SpaceOwnerProfile.findByIdAndDelete(event.arguments.id);
      default:
        return null;
    }
  } catch (error) {
    throw error;
  }
};
