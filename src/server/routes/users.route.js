const express = require('express');
const {auth, admin} = require('../middleware/user.auth');

const router = express.Router();
const userController = require('../controllers/users.controller');

router.get('/', auth, (req, res) => {
    userController.getUserAnswer(req, res);
}).get('/users', admin, (req, res) => {
    userController.getAllUsers(req, res);
}).get('/bootcamp', admin, (req, res) => {
    userController.getUsersByBootcamp(req, res);
}).post('/', (req, res) => {
    userController.createUser(req, res);
}).post('/addusers', (req, res) => {
    userController.createManyUsers(req, res);
}).post('/login', (req, res) => {
    userController.loginUser(req, res);
}).put('/me', auth, (req, res) => {
    userController.updateUser(req, res);
}).delete('/delete/:_id', auth, (req, res) => {
    userController.deleteUser(req, res);
}).delete('/deleteall', (req, res) => {
    userController.deleteAllUsers(req, res);
}).get('/lala', (req, res) => {
    res.send("lala")
});

module.exports = router;
