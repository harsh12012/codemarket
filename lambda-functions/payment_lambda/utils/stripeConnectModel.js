const mongoose = require("mongoose");

const stripeConnectSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User Id is required"],
  },
  account: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const StripeConnect = mongoose.model("StripeConnect", stripeConnectSchema);

module.exports = StripeConnect;
