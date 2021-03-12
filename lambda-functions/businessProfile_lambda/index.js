const DB = require('../../utils/DB');
const BusinessProfile = require('./utils/businessProfileModel');
DB();

exports.handler = async (event) => {
  try {
    switch (event.type) {
      case 'getBusinessProfiles':
        return await BusinessProfile.find();
      case 'getUserBusinessProfile':
        return await BusinessProfile.findOne({ userId: event.arguments.userId }).exec();
      case 'createBusinessProfile':
        return await BusinessProfile.create(event.arguments);
      case 'updateBusinessProfile':
        return await BusinessProfile.findByIdAndUpdate(
          event.arguments.id,
          event.arguments,
          {
            new: true,
            runValidators: true,
          }
        );
      case 'deleteBusinessProfile':
        return await BusinessProfile.findByIdAndDelete(event.arguments.id);
      default:
        return null;
    }
  } catch (error) {
    throw error;
  }
};
