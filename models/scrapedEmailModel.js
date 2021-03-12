const mongoose = require("mongoose");

const scrapedEmailSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: [true, "Business Name is required"],
  },
  emails: {
    type: [String],
    required: [true, "Email is required"],
  },
});

const ScrapedEmail = mongoose.model("ScrapedEmail", scrapedEmailSchema);

module.exports = ScrapedEmail;
