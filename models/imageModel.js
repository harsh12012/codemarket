const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  imageUrl: {
    type: String,
    required: [true, "Image Url is required"],
  },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
