const DB = require('../../utils/DB');
const OwnerReview = require('./utils/ownerReviewModel');
DB();

exports.handler = async (event) => {
  try {
    switch (event.type) {
      case 'getOwnerReviews':
        return await OwnerReview.find({ownerId:event.arguments.ownerId}).exec();
      case 'getOwnerReviewsByDriverId':
        return await OwnerReview.find({ driverId: event.arguments.driverId }).exec();
      case 'createOwnerReview':
        return await OwnerReview.create(event.arguments);
      case 'updateOwnerReview':
        return await OwnerReview.findByIdAndUpdate(
          event.arguments.id,
          event.arguments,
          {
            new: true,
            runValidators: true,
          }
        );
      case 'deleteOwnerReview':
        return await OwnerReview.findByIdAndDelete(event.arguments.id);
      default:
        return null;
    }
  } catch (error) {
    throw error;
  }
};
