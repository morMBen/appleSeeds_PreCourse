/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const bootcampTypeSchema = new mongoose.Schema({
  bootcamp: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const BootcampType = mongoose.model('bootcamp', bootcampTypeSchema);

module.exports = {
  BootcampType,
};
