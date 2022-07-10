/* eslint-disable linebreak-style */
const questionModel = require('../models/question.model');
const questionsJson = require('../../../questions-pini.json');
const createQuestion = async (req, res) => {
    const {
        questionID, question, firstCode, parameters, tests
    } = req.body;
    const newQuestion = new questionModel.Questions({
        questionID,
        question,
        firstCode,
        parameters,
        tests,
    });
    newQuestion.save((err) => {
        if (err) res.status(400).send(err);
        else {
            res.status(201).send(newQuestion);
        }
    });
};

const createManyQuestions = async (req, res) => {
    questionModel.Questions.insertMany(req.body).then((doc) => {
        res.status(201).send(doc);
    }).catch((err) => {
        res.status(400).send(err);
    });
};

const getAllQuestions = async (req, res) => {
    try {
        await questionModel.Questions.find({}, (err, result) => {
            res.send(result);
        });
    } catch (e) {
        res.status(500).send(e);
    }
};

const uploadQuestions = (req, res) => {

    questionModel.Questions.insertMany(questionsJson.slice(10, 11)).then((doc) => {
        res.status(201).send(doc);
    }).catch((err) => {
        res.status(400).send(err);
    });

    // res.send(questionsJson.slice(0,5));


}


module.exports = {
    createQuestion,
    createManyQuestions,
    getAllQuestions,
    uploadQuestions
};
