const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const demoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  ref: ObjectId,
  status: {
    type: String,
    enum: ['open', 'close'],
    default: 'open',
  },
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

const Demo = mongoose.model('Demo', demoSchema);

module.exports = Demo;
