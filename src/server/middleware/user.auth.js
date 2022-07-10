/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const usersModel = require('../models/users.model');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await usersModel.Users.findOne({ passportId: decoded._id }, (err, result) => {
      if (err) {
        return;
      }
    });
    if (!user) {
      throw new Error('no user');
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'please authenticate!' });
  }
};


const admin = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await usersModel.Users.findOne({ passportId: decoded._id }, (err, result) => {
      if (err) {
        return;
      }
    });
    if (!user) {
      throw new Error('no user');
    }
    if(user.role !== "admin"){
      throw new Error('no user');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'please authenticate!' });
  }
};

module.exports = {auth,admin};
