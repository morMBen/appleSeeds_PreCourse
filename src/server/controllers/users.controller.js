/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const usersModel = require('../models/users.model');
const questionsModel = require('../models/question.model');
const userValidation = require('../validations/users.validation');
const mongoose = require('mongoose');

const getAllUsers = (req, res) => {
    usersModel.Users.find({role :'user'})
        .populate({
            path: 'answers'
        }).exec((err, user) => {
        if (user) {
            questionsModel.Questions.find({}).then((questions) => {
                let usersList = user.map((u) => {
                    if (u.answers) {
                        let answers = u.answers.map((answer) => {
                            let ans = questions.find(q => q._id == answer.questionID)
                            if (ans) {
                                return {
                                    questionType : ans.questionType,
                                    grade : ans.grade,
                                    trafficLight: answer.trafficLight,
                                    lastCodeAnswer: answer.lastCodeAnswer,
                                    clicked: answer.clicked,
                                    testsPassed: answer.testsPassed,
                                    totalTests: ans.tests.length,
                                    questionID: ans.questionID,
                                }
                            }

                        }).filter((x) => {
                            return x
                        }).sort((a, b) => {
                            return a.questionID - b.questionID
                        });
                        return {u, answers}
                    } else {
                        return u;
                    }
                })
                res.send(usersList);
            })
        } else {
            return res.status(404).send("error")
        }

    });

}

const getUserAnswer = (req, res) => {
    usersModel.Users.findById(req.user._id)
        .populate({
            path: 'answers'
        }).exec((err, user) => {
        if (user) {
            questionsModel.Questions.find({})
                .then((questions) => {
                    if (questions) {
                        return res.send(
                            questions.map((q) => {
                                let answer = user.answers.find((a) => {
                                    return a.questionID == q._id
                                })

                                if (answer) {
                                    return {
                                        _id: q._id,
                                        questionID: q.questionID,
                                        question: q.question,
                                        firstCode: q.firstCode,
                                        parameters: q.parameters,
                                        tests: q.tests,
                                        questionID: q.questionID,
                                        questionType : q.questionType,
                                        answer: answer
                                    };
                                } else {
                                    return q;
                                }
                            }));
                    } else return res.status(404).send("question Load error")
                })

        } else {
            return res.status(404).send("error")
        }
    });
}

const createUser = async (req, res) => {
    const {
        firstName, lastName, email, phone, passportId , bootcamp
    } = req.body;


    usersModel.Users.findOne({$or: [{email: email}, {passportId: passportId}]}, (err, user) => {
        if (err) return res.status(400).send(err);
        if (user) {
            return res.status(200).send("user Exist");
        }
        const newUser = new usersModel.Users({
            firstName,
            lastName,
            email,
            phone,
            passportId,
            bootcamp,
        });
        newUser.save((err) => {
            if (err) return res.status(400).send(err);
            return res.status(201).send(newUser);
        });

    });


};

const createManyUsers = async (req, res) => {
    usersModel.Users.insertMany(req.body).then((doc) => {
        res.status(201).send(doc);
    }).catch((err) => {
        res.status(400).send(err);
    });
};

const loginUser = async (req, res) => {
    try {
        const user = await usersModel.Users.findByCredentials(
            req.body.email,
            req.body.passportId
        );
        const token = await user.generateToken();
        res.send({user, token});
    } catch (e) {
        res.status(400).send(e);
    }
};

const updateUser = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['firstName', 'lastName', 'email', 'phone' , 'bootcamp'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid Update!!!'});
    }
    try {
        // change the foreach
        updates.forEach((update) => {
            req.user[update] = req.body[update];
        });
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
};

const deleteUser = async (req, res) => {
    // change the route to => /:userId
    // and delete the user by admin
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
};

const deleteAllUsers = async (req, res) => {
    try {
        await usersModel.Users.deleteMany({}, (err, result) => {
            res.send(result);
        });
    } catch (e) {
        res.status(500).send(e);
    }
};

const getUsersByBootcamp = async (req, res) => { 
        await usersModel.Users.find({'bootcamp' :req.body.bootcamp}).populate({
                path: 'bootcamp'
            }).exec((err, users) =>{
                if (users) return res.status(200).send(users)
                if (err) return res.status(403).send(err)
            })
}

module.exports = {
    getAllUsers,
    getUserAnswer,
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    deleteAllUsers,
    createManyUsers,
    getUsersByBootcamp,
};
