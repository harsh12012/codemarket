const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
const Long = mongoose.Schema.Types.Long;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: String,
  email: String,
  picture: {
    type: String,
    default:
      'https://parkyourselfbucket154227-dev.s3.amazonaws.com/public/default/default.jpg',
  },
  active: {
    type: Boolean,
    default: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['open', 'close'],
    default: 'open',
  },
  listings: {
    type: Number,
    default: 0,
  },
  bookings: {
    type: Number,
    default: 0,
  },
  ref: ObjectId,
  createdBy: { type: String, default: 'PreSignUp_SignUp' },
  updatedBy: String,
  createdAtDate: { type: Long, default: Date.parse(new Date()) },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
  },
  endpoints: [{ type: String }],
});

userSchema.index({ username: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
