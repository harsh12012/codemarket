const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
const Long = mongoose.Schema.Types.Long;

const staffSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Staff must be existing user'],
  },
  staffId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const markerSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const locationDetailsSchema = new mongoose.Schema({
  listingType: {
    type: String,
  },
  propertyType: {
    type: String,
  },

  propertyName: {
    type: String,
  },
  country: {
    type: String,
  },
  address: {
    type: String,
  },
  unitNum: {
    type: Number,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  code: {
    type: String,
  },
  phone: {
    type: String,
  },
  marker: {
    type: markerSchema,
  },
  streetViewImages: [String],
  parkingEntranceImages: [String],
  parkingSpaceImages: [String],
  features: [String],
});

const spaceLabelSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  largestSize: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

const heightSchema = new mongoose.Schema({
  value: {
    type: Number,
  },
  unit: {
    type: String,
    required: true,
  },
});

const spaceDetailsSchema = new mongoose.Schema({
  parkingSpaceType: {
    type: String,
  },
  qtyOfSpaces: {
    type: String,
  },
  heightRestriction: {
    type: Boolean,
    required: true,
  },
  height1: {
    type: heightSchema,
  },
  height2: {
    type: heightSchema,
  },
  sameSizeSpaces: {
    type: Boolean,
    required: true,
  },
  largestSize: {
    type: String,
  },
  motorcycle: {
    type: Boolean,
    required: true,
  },
  compact: {
    type: Boolean,
    required: true,
  },
  midsized: {
    type: Boolean,
    required: true,
  },
  large: {
    type: Boolean,
    required: true,
  },
  oversized: {
    type: Boolean,
    required: true,
  },
  motorcycleSpaces: {
    type: Number,
  },
  compactSpaces: {
    type: Number,
  },
  midsizedSpaces: {
    type: Number,
  },
  largeSpaces: {
    type: Number,
  },
  oversizedSpaces: {
    type: Number,
  },
  isLabelled: {
    type: Boolean,
  },
  spaceLabels: [spaceLabelSchema],
  aboutSpace: {
    type: String,
  },
  accessInstructions: {
    type: String,
  },
});

const timeDurationSchema = new mongoose.Schema({
  value: {
    type: Long,
  },
  unit: {
    type: String,
    required: true,
  },
});

const daySchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
    required: true,
  },
  startHour: {
    type: Number,
  },
  startMinute: {
    type: Number,
  },
  endHour: {
    type: Number,
  },
  endMinute: {
    type: Number,
  },
});

const customTimeSchema = new mongoose.Schema({
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
});

const spaceAvailableSchema = new mongoose.Schema({
  monday: {
    type: daySchema,
    required: true,
  },
  tuesday: {
    type: daySchema,
    required: true,
  },
  wednesday: {
    type: daySchema,
    required: true,
  },
  thursday: {
    type: daySchema,
    required: true,
  },
  friday: {
    type: daySchema,
    required: true,
  },
  saturday: {
    type: daySchema,
    required: true,
  },
  sunday: {
    type: daySchema,
    required: true,
  },
  scheduleType: {
    type: String,
  },
  customTimeRange: [customTimeSchema],
  hasNoticeTime: {
    type: Boolean,
    required: true,
  },
  noticeTime: {
    type: timeDurationSchema,
    required: true,
  },
  advanceBookingTime: {
    type: timeDurationSchema,
    required: true,
  },
  minTime: {
    type: timeDurationSchema,
    required: true,
  },
  maxTime: {
    type: timeDurationSchema,
    required: true,
  },
  instantBooking: {
    type: Boolean,
    required: true,
  },
});

const pricingRatesSchema = new mongoose.Schema({
  perHourRate: {
    type: Number,
  },
  perDayRate: {
    type: Number,
  },
  perWeekRate: {
    type: Number,
  },
  perMonthRate: {
    type: Number,
  },
});

const pricingDetailsSchema = new mongoose.Schema({
  pricingType: {
    type: String,
  },
  pricingRates: {
    type: pricingRatesSchema,
    required: true,
  },
});

const listingSchema = new mongoose.Schema({
  thumbnail: String,
  ownerId: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  ownerEmail: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  locationDetails: {
    type: locationDetailsSchema,
    required: true,
  },
  spaceDetails: {
    type: spaceDetailsSchema,
    required: true,
  },
  spaceAvailable: {
    type: spaceAvailableSchema,
    required: true,
  },
  pricingDetails: {
    type: pricingDetailsSchema,
    required: true,
  },
  location: {
    type: markerSchema,
  },
  bookings: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
    // min: [1, 'A Listing rating must be above 1.0'],
    max: [5, 'A Listing rating must be below 5.0'],
    set: (val) => Math.round(val * 10) / 10,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  staff: [staffSchema],
});

listingSchema.index({ location: '2dsphere' });

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
