const mongoose = require('mongoose');

const faqTopicSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: String,
    default: new Date(),
  },
});

const FaqTopic = mongoose.model('FaqTopic', faqTopicSchema);

module.exports = FaqTopic;
