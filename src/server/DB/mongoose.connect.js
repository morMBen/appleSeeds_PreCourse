/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
require('dotenv').config();

const mongourl = process.env.MONGO_URL;

mongoose.connect(mongourl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {
  console.log('database connect');
}).catch((e) => {
  console.log('error', e);
});
