const express = require('express');
const adminController = require('../controllers/admin.controller');
const {auth, admin} = require('../middleware/user.auth');

const router = express.Router();
const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()})

router.post('/uploadAssignment', upload.single('file'), (req, res) => {
    adminController.addAssignment(req, res);
}).get('/users', admin, ((req, res) => {
    adminController.getAllUsers(req, res);
})).get('/user/tasks/:userId', admin, (req, res) => {
    adminController.getUserTasks(req, res);
}).post('/user/tasks/:userId',(req,res)=>{
    adminController.addGrade(req,res);
})

module.exports = router;
