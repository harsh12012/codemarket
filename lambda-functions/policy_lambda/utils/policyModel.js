const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  details :{
    type: String, default: "sample data"
  },
  published: {
    type: Boolean,
    default: true,
  },
  createdBy: String,
  updatedBy: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
  },
});

const Policy = mongoose.model("Policy", policySchema);

module.exports = Policy;
