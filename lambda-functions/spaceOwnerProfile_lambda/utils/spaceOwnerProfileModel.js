const mongoose = require("mongoose");

const spaceOwnerProfileSchema = new mongoose.Schema({
  userId:{
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  businessName: {
    type: String,
  },
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  instagram: {
    type: String,
  },
  createdAt: {
    type:String,
    default:new Date().toString()
  }
});

const SpaceOwnerProfile = mongoose.model("SpaceOwnerProfile", spaceOwnerProfileSchema);

module.exports = SpaceOwnerProfile;