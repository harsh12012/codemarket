const mongoose = require("mongoose");

const templateEmailSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User ID is required"],
  },
  emails: {
    type: [String],
  },
  templateName: {
    type: String,
    required: [true, "templateName is required"],
  },
  businessName: {
    type: String,
    required: [true, "businessName is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const TemplateEmail = mongoose.model("TemplateEmail", templateEmailSchema);

module.exports = TemplateEmail;
