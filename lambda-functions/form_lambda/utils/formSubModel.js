const mongoose = require("mongoose");

const formSubSchema = new mongoose.Schema({
  formId: {
    type: String,
    required: [true, "Title is required"],
  },
  formSlug: String,
  data: String,
  submitedBy: {
    type: String,
    required: [true, "User ID is required"],
  },
  submitedAt: {
    type: Date,
    default: Date.now(),
  },
});

formSubSchema.index({ formId: 1 });
formSubSchema.index({ formSlug: 1 });

const FormSub = mongoose.model("FormSub", formSubSchema);

module.exports = FormSub;
