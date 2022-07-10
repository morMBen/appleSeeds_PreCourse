/* eslint-disable linebreak-style */
const express = require('express');
const bootcampController = require('../controllers/bootcamp.controller');
const {auth} = require('../middleware/user.auth');

const router = express.Router();

router.get('/',auth, (req, res) => {
  bootcampController.getBootcamps(req, res);
}).get('/id',auth, (req, res) => {
  bootcampController.getBootcampByID(req, res);
}).post('/',auth, (req, res) => {
  bootcampController.createBootcamp(req, res);
}).put('/update/:id',auth, (req, res) => {
  bootcampController.updateBootcampStatus(req, res);
}).delete('/delete/:id', auth , (req, res)=>{
  bootcampController.deleteBootcampById(req, res);
});

module.exports = router;