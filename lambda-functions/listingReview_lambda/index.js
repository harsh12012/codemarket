const DB = require('../../utils/DB');
const ListingReview = require('./utils/listingReviewModel');
DB();

exports.handler = async (event) => {
  try {
    switch (event.type) {
      case 'getListingReviews':
        return await ListingReview.find({listingId:event.arguments.listingId}).exec();
      case 'getListingReviewsByDriverId':
        return await ListingReview.find({ driverId: event.arguments.driverId }).exec();
      case 'createListingReview':
        return await ListingReview.create(event.arguments);
      case 'updateListingReview':
        return await ListingReview.findByIdAndUpdate(
          event.arguments.id,
          event.arguments,
          {
            new: true,
            runValidators: true,
          }
        );
      case 'deleteListingReview':
        return await ListingReview.findByIdAndDelete(event.arguments.id);
      default:
        return null;
    }
  } catch (error) {
    throw error;
  }
};
