const mongoose = require("mongoose"); //require our mongose module (used for ease with mongoDB)

const profileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  FullName: {
    type: String,
    required: true,
  },
  RegNo: {
    type: String,
    required: true,
  },
  CourseSection: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  CNIC: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  PerAddress: {
    type: String,
    required: true,
  },
  TemAddress: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  Nationality: {
    type: String,
    required: true,
  },
});

// creating collectins

const profile = new mongoose.model("profile", profileSchema); // creates profile collection in the database

module.exports = profile; // exporting our profile collection to use in other modules
