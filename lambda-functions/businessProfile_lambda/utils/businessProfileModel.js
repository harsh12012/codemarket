const mongoose = require("mongoose");

const businessProfileSchema = new mongoose.Schema({
  userId:{
      type: String,
      required: true,
  },
  businessName:{
      type:String,
      required:true
  },
  businessEmail:{
      type:String,
      required:true
  },
  businessMobile:{
      type:String,
      required:true
  },
  businessMobileCode:{
      type:String,
      required:true
  },
  createdAt: {
      type:String,
      default:new Date().toString()
  }
});

const BusinessProfile = mongoose.model("BusinessProfile", businessProfileSchema);

module.exports = BusinessProfile;