const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User Id is required"],
  },
  emails: {
    type: [String],
  },
  subject: {
    type: String,
    required: [true, "Subject is required"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
