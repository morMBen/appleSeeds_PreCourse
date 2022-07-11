/* eslint-disable linebreak-style */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const validator = require('validator');
const isIsraeliIdValid = require('israeli-id-validator');
const jwt = require('jsonwebtoken');

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email!');
      }
    },
  },
  phone: {
    type: String,
    required: true,
  },
  passportId: {
    type: String,
    trim: true,
    unique: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'answers',
    },
  ],
  bootcamp: {
    type: mongoose.Schema.Types,
    ref: 'bootcamp',
  },
});

usersSchema.statics.findByCredentials = async (email, passportId) => {
  // eslint-disable-next-line no-use-before-define
  const user = await Users.findOne({ email });
  if (!user) {
    throw new Error('Unable to Login!');
  }
  const isMatch = email === user.email && passportId === user.passportId;
  if (!isMatch) {
    throw new Error('Unable to Login!');
  }
  return user;
};
//
usersSchema.methods.generateToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user.passportId }, process.env.SECRET);
  return token;
};

const Users = mongoose.model('users', usersSchema);

module.exports = {
  Users,
};
