const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  userId:{
    type: String,
    required: true,
  },
  profileType:{
    type: String,
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt:{
    type:String,
    default:new Date().toString()
  }
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;