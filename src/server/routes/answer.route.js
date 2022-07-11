/* eslint-disable linebreak-style */
const express = require('express');
const answerController = require('../controllers/answers.controller');
const { auth } = require('../middleware/user.auth');

const router = express.Router();

router
  .get('/', auth, (req, res) => {
    answerController.getAllAnswers(req, res);
  })
  .post('/', auth, (req, res) => {
    answerController.addAnswer(req, res);
  });

module.exports = router;
