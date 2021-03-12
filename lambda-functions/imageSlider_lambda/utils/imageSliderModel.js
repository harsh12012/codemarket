const mongoose = require("mongoose");

const imageSliderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: true,
  },
  slug: String,
  userId: {
    type: String,
    required: [true, "User ID is required"],
  },
  images: [String],
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

imageSliderSchema.index({ slug: 1 });

const ImageSlider = mongoose.model("ImageSlider", imageSliderSchema);

module.exports = ImageSlider;
