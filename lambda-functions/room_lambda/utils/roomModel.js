const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: true,
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  userId: {
    type: String,
    required: [true, "User ID is required"],
  },
  images: [],
  youtube: [String],
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

roomSchema.index({ slug: 1 });

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
