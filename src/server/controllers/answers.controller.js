/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const answerModel = require('../models/answer.model');
const usersModel = require('../models/users.model');

const getUserDetails = async (token) => {
  const workingToken = token.replace('Bearer ', '');
  return jwt.verify(workingToken, process.env.SECRET);
};

const getAllAnswers = async (req, res) => {
  const { _id } = await getUserDetails(req.headers.authorization);
  await usersModel.Users.findOne({ passportId: _id })
    .populate({
      path: 'answers',
    })
    .exec((err, user) => {
      res.send(user.answers);
    });
};

const addAnswer = async (req, res) => {
  const { questionId, lastCodeAnswer, testsPassed, totalTests } = req.body;

  const newAnswer = new answerModel.Answer({
    questionID: questionId,
    lastCodeAnswer,
    trafficLight: 1,
    testsPassed,
  });

  usersModel.Users.findById(req.user._id)
    .populate({
      path: 'answers',
    })
    .exec((err, user) => {
      if (!user || !user.answers) return res.send(404).send('user or answers not founds');

      const answer = user.answers.find((a) => a.questionID == questionId);
      const light = testsPassed === totalTests ? 2 : 1;
      if (!answer) {
        newAnswer.trafficLight = light;
        newAnswer.save((error) => {
          if (error) {
            return res.status(409).send(error);
          }
          user.answers.push(newAnswer._id);
          user.save();
          return res.send('add new');
        });
      } else {
        if (answer.lastCodeAnswer === lastCodeAnswer) return res.status(200).send('same code');

        const light = testsPassed === totalTests ? 2 : 1;

        answerModel.Answer.findByIdAndUpdate(
          answer._id,
          {
            lastCodeAnswer,
            testsPassed,
            trafficLight: light,
            $inc: { clicked: 1 },
          },
          { new: true },
          (err, doc) => {
            if (err) return res.send(err);
            return res.send(doc);
          }
        );
      }
    });
};

module.exports = {
  getAllAnswers,
  addAnswer,
};
