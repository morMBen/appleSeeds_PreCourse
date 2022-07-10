/* eslint-disable linebreak-style */
const express = require('express');
const questionsController = require('../controllers/questions.controller');

const router = express.Router();

router.post('/', (req, res) => {
    questionsController.createQuestion(req, res);
}).post('/addquestions', (req, res) => {
    questionsController.createManyQuestions(req, res);
}).get('/', (req, res) => {
    questionsController.getAllQuestions(req, res);
}).post('/uploadQuestions', (req, res) => {
    questionsController.uploadQuestions(req, res);
});

module.exports = router;
