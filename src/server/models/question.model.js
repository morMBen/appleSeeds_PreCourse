/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionID: {
    type: Number,
    required: true,
    trim: true,
  },
  question: {
    type: String,
    required: true,
  },
  firstCode: {
    type: String,
    required: true,
  },
  parameters: {
    type: String,
    required: true,
  },
  questionType:{
    type:String,
    default : 'question'
  },
  questionFile : {
    type : String,
  },
  tests: [
    {
      value: {
        type: Object,
      },
      result: {
        type: Object,
      }
    }
  ]
});

const Questions = mongoose.model('questions', questionSchema);

module.exports = {
  Questions,
};
