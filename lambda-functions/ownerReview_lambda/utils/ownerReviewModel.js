const mongoose = require("mongoose");

const ownerReviewSchema = new mongoose.Schema({
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

const OwnerReview = mongoose.model("OwnerReview", ownerReviewSchema);

module.exports = OwnerReview;