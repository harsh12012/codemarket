const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  fee: { type: Number, max: 100, min: 0 },
  decimal: { type: Number, max: 1, min: 0 },
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

const Fee = mongoose.model("Fee", feeSchema);

module.exports = Fee;
