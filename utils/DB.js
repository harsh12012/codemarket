const mongoose = require('mongoose');

module.exports = async (DB_STRING = null) => {
  try {
    await mongoose.connect(DB_STRING || process.env.DATABASE, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
    console.log('DB Connection Successfull!');
  } catch (error) {
    console.log('DB Connection Failed');
  }
};
