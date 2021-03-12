const mongoose = require("mongoose");
require("mongoose-long")(mongoose);
const Long = mongoose.Schema.Types.Long;

const testSchema = new mongoose.Schema({
  listingId: {
    type: mongoose.Schema.ObjectId,
    ref: "Listing",
  },
  start: Number,
  end: Number,
  startDate: {
    type: Long,
  },
  endDate: {
    type: Long,
  },
  createdAt: {
    type: String,
    default: new Date().toString(),
  },
  createdAtDate: {
    type: Date,
    default: new Date(),
  },
});

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
