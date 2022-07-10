/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const bootcampTypeModel = require('../models/bootcampType.model');
////const usersModel = require('../models/users.model');

// post new bootcamp     1
const createBootcamp = async (req, res) => {
  const {bootcamp} = req.body;
  bootcampTypeModel.BootcampType.findOne({bootcamp: bootcamp}, (err, existing) => {
    if (err) return res.status(400).send(err);
    if (existing) {
        return res.status(200).send("bootcamp Exist");
    }
    const newBootcamp = new bootcampTypeModel.BootcampType({
      bootcamp,
    });
    newBootcamp.save((err) => {
        if (err) return res.status(400).send(err);
        return res.status(201).send(newBootcamp);
    });
});
}
// get all bootcamps     2
const getBootcamps = async (req, res) =>{
  bootcampTypeModel.BootcampType.find({}, (err, bootcamps) =>{
    if(err) return res.status(400).send(err);
    if(bootcamps) return res.status(200).send(bootcamps);
  })
}
// get bootcamp by id    3
const getBootcampByID = async (req, res) => {
  const _id = req.body.id
  bootcampTypeModel.BootcampType.findById({_id} , (err, bootcamp) => {
    if(err) return res.status(400).send(err);
    if(bootcamp) return res.status(200).send(bootcamp);
  })
}
// put bootcamp by id    4
const updateBootcampStatus = async (req, res) => {
  const updates = Object.keys(req.body);
  const id = req.params.id
  
    const allowedUpdates = 'isActive';
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid Update!!!'});
    }
    bootcampTypeModel.BootcampType.findOneAndUpdate({_id:id}, {"isActive": req.body[updates]}, (err, result) =>{
      if(err) return res.status(400).res.send(err)
      result.save((error) => {
        if (error) return res.status(400).send(error);
        return res.status(200).send(result);
      });
      

  })
}
// delete bootcamp by id 6
const deleteBootcampById = async (req, res) => {
  const id = req.params.id

  bootcampTypeModel.BootcampType.findOneAndDelete({_id:id}, (err, btc)=>{
    if (err) return res.status(400).send(error);
    return res.status(200).send(btc);
  })
}

//// test 
//? create test bootcamp and assing few users with test bootcamp
// ✔ 
//? delete bootcamp from user as stage 5
//           7
// create client dropdown ✔ 
// get all bootcamps ✔ 
// get all users from specific bootcamp ✔ 

module.exports = {
  createBootcamp,
  getBootcamps,
  getBootcampByID,
  updateBootcampStatus,
  deleteBootcampById,
};