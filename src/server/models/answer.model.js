/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionID: {
    type: String,
    required: true,
    trim: true
  },
  trafficLight: {
    type: Number,
    trim: true,
    default: 0,
  },
  lastCodeAnswer: {
    type: String,
    default: '',
  },
  clicked: {
    type: Number,
    default: 1,
  },
  testsPassed: {
    type: Number,
    default: 0,
  },
  grade :{
    type : Number,
    default : 0
  },
});

const Answer = mongoose.model('answers', answerSchema);

module.exports = {
  Answer,
};
