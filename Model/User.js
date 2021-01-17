const mongoose = require("mongoose");
require("../Helper/Init_mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  googleId: {
    type: String,
    trim: true,
    // required: true
  },
  name: {
    type: String,
    trim: true,
    // required: true
  },
  displayname: {
    type: String,
    trim: true,
    // required: true
  },
  branch: {
    type: String,
    trim: true,
    uppercase: true,
    // required: true
  },
  year: {
    type: String,
    trim: true,
    // required: true
  },
  rollNo: {
    type: String,
    trim: true,
    // required: true,
    index: true,
    uppercase: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    uppercase: true,
    // required: true
  },
  emailVerified: {
    type: Boolean,
  },
  displayPicture: {
    type: String,
    trim: true,
  },
  contacts: {
    phoneNumber: {
      type: String,
      trim: true,
    },
    guardianName: {
      type: String,
      trim: true,
    },
    guardianNumber: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    emergencyNumber: {
      type: String,
      trim: true,
    },
  },
});

const user = mongoose.model("User", userSchema);
module.exports = user;
