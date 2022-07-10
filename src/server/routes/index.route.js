const express = require('express');

const router = express.Router();

const adminRouter = require('./admin.route');
const usersRouter = require('./users.route');
const questionsRouter = require('./question.route');
const answersRoute = require('./answer.route');
const bootcampRoute = require('./bootcamp.route');

router.use('/admin', adminRouter);
router.use('/users', usersRouter);
router.use('/questions', questionsRouter);
router.use('/answers', answersRoute);
router.use('/admin/bootcamp', bootcampRoute);

module.exports = router;
