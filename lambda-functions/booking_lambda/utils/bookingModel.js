const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
const Long = mongoose.Schema.Types.Long;

const bookingSchema = new mongoose.Schema({
  driverId: String,
  driverName: String,
  driverEmail: String,
  listingId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Listing',
  },
  ownerId: String,
  ownerName: String,
  ownerEmail: String,
  address: String,
  images: [String],
  start: Date,
  startDate: Long,
  end: Date,
  endDate: Long,
  status: String,
  profileCategory: String,
  vehicle: String,
  payment: Number,
  duration: Long,
  ownerPayment: Number,
  paymentMethod: String,
  paymentIntent: String,
  transferGroup: String,
  qrCode: String,
  spaceLabel: String,
  createdBy: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
