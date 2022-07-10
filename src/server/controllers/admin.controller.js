const fs = require('fs');
const path = require('path');
const questionModel = require('../models/question.model');
const usersModel = require('../models/users.model');
const answerModel = require('../models/answer.model');

const addAssignment = async (req, res) => {
  const count = await questionModel.Questions.countDocuments({});

  const assigment = new questionModel.Questions({
    questionID: count,
    questionType: 'assignments',
    question: `assignments${count}`,
    firstCode: 'const assignments = ()=>{\n\n}',
    parameters: 'a',
  });

  fs.writeFile(
    path.resolve(`./src/server/files/${count}.pdf`),
    req.file.buffer,
    'binary',
    (err) => {
      if (err) {
        console.log(err);
      }
      assigment.save((err, doc) => {
        if (err) throw new Error(err.message);
        return res.json(doc);
      });
    }
  );
};

const getAllUsers = (req, res) => {
  usersModel.Users.find({}).then((users) => {
    res.send(users);
  });
};

const getUserTasks = (req, res) => {
  usersModel.Users.findById(req.params.userId)
    .populate({
      path: 'answers',
    })
    .exec((err, user) => {
      if (user) {
        questionModel.Questions.find({}).then((questions) => {
          if (questions) {
            return res.send(
              questions.map((q) => {
                const answer = user.answers.find((a) => a.questionID == q._id);

                if (answer) {
                  return {
                    _id: q._id,
                    questionID: q.questionID,
                    question: q.question,
                    firstCode: q.firstCode,
                    parameters: q.parameters,
                    tests: q.tests,
                    questionID: q.questionID,
                    questionType: q.questionType,
                    answer,
                  };
                }
                return q;
              })
            );
          }
          return res.status(404).send('question Load error');
        });
      } else {
        return res.status(404).send('error');
      }
    });
};

const addGrade = (req, res) => {
  usersModel.Users.findById(req.params.userId)
    .populate({
      path: 'answers',
    })
    .exec((err, user) => {
      // console.log(user)
      if (user) {
        questionModel.Questions.findOne(
          { questionType: 'assignments' },
          (err, assignment) => {
            if (assignment) {
              const userAnswer = user.answers.find(
                (a) => a.questionID == assignment._id
              );
              if (userAnswer) {
                answerModel.Answer.findOneAndUpdate(
                  { _id: userAnswer._id },
                  { $set: { grade: req.body.grade } },
                  (err, answer) => {
                    if (answer) {
                      return res.status(200).send(answer);
                    }
                    return res.status(209).send('answer not found');
                  }
                );
              } else {
                return res.status(209).send('assignment not found');
              }
            } else {
              return res.status(209).send('error');
            }
          }
        );
      } else {
        return res.status(209).send('user not found');
      }
    });
};

module.exports = {
  addAssignment,
  getAllUsers,
  getUserTasks,
  addGrade,
};
