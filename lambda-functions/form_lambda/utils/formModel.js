const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: true,
  },
  slug: String,
  formJSON: String,
  userId: {
    type: String,
    required: [true, "User ID is required"],
  },
  published: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

formSchema.index({ slug: 1 });

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
