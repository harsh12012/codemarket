const mongoose = require("mongoose");

// const messageSchema = new mongoose.Schema({
//   body: String,
//   createdAt: {
//     type: Date,
//     default: Date.now(),
//   },
//   handle: String,
// });

const messageSchema = new mongoose.Schema({
  body:{
    type:String,
    required:true
  },
  listingId:{
    type:String,
    required:true
  },
  listingAddress:{
    type:String,
    required:true
  },
  ownerId:{
    type:String,
    required:true
  },
  ownerName:{
    type:String,
    required:true
  },
  driverId:{
    type:String,
    required:true
  },
  driverName:{
    type:String,
    required:true
  },
  senderName:{
    type:String,
    required:true
  },
  createdAt:{
    type: Date,
    default: Date.now(),
  }
});


const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
