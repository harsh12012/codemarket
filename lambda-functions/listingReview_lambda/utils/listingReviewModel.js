const mongoose = require("mongoose");

const listingReviewSchema = new mongoose.Schema({
  listingId:{
      type:String,
      required:true
  },
  ownerId:{
      type:String,
      required:true
  },
  ownerName:{
    type:String,
    required:true
  },
  driverId:{
      type:String,
      required:true
  },
  driverName:{
    type:String,
    required:true
  },
  rating:{
      type:Number,
      required:true
  },
  feedback:{
      type:String,
      required:true
  },
  createdAt:{
    type:String,
    default:new Date().toString()
  }
});

const ListingReview = mongoose.model("ListingReview", listingReviewSchema);

module.exports = ListingReview;