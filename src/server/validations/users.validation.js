/* eslint-disable linebreak-style */
const validator = require('validator');
const isIsraeliIdValid = require('israeli-id-validator');
const { isEmpty } = require('../config/globals');

const userRegisterValidation = (data) => {
  const errors = {};
  let {
    firstName, lastName, email, phone, passportId
  } = data;

  firstName = !isEmpty(firstName) ? firstName : '';
  lastName = !isEmpty(lastName) ? lastName : '';
  email = !isEmpty(email) ? email : '';
  phone = !isEmpty(phone) ? phone : '';
  passportId = !isEmpty(passportId) ? passportId : '';

  if (validator.isEmpty(firstName)) errors.firstName = 'First Name Required';
  else if (!validator.isLength(firstName, 2, 40)) {
    errors.firstName = 'First Name Length Must be 2-40 ';
  }

  if (validator.isEmpty(lastName)) errors.lastName = 'Last Name Required';
  else if (!validator.isLength(lastName, 2, 40)) {
    errors.lastName = 'Last Name Length Must be 2-40 ';
  }

  if (validator.isEmpty(email)) errors.email = 'Email Required';
  else if (!validator.isEmail(email, { min: 2, max: 100 })) errors.email = 'Wrong Email Address';

  if (validator.isEmpty(phone)) errors.phone = 'Phone Required';
  else if (!validator.isMobilePhone(phone, 'he-IL')) {
    errors.phone = 'Wrong Phone Number';
  }

  if (validator.isEmpty(passportId)) errors.passportId = 'PassportId Required';
  else if (!isIsraeliIdValid(passportId)) {
    errors.passportId = 'Wrong PassportId';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};


module.exports = {
  userRegisterValidation
};
