const mongoose = require("mongoose");

const formOptionSchema = new mongoose.Schema({
  title: String,
  formName: String,
  options: [],
  published: Boolean,
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

const FormOption = mongoose.model("FormOption", formOptionSchema);

module.exports = FormOption;
