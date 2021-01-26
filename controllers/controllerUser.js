const jwt = require('jsonwebtoken');
function createUser(req, res) {
    let User = require('../models/modelUser');
    let newUser = User ({
        name: req.body.name,
        firstname : req.body.firstname,
        email : req.body.email,
        password : req.body.password,
    });

    newUser.save()
    .then((savedUser) => {

        //send back the created User
        res.json(savedUser);

    }, (err) => {
        res.status(400).json(err)
    });
}
function readUsers(req, res) {

    let User = require("../models/modelUser");

    User.find({})
    .then((users) => {
        res.status(200).json(users);
    }, (err) => {
        res.status(500).json(err);
    });
 }

 function readUser(req, res) {

    let User = require("../models/modelUser");

    User.findById({_id : req.params.id})
    .then((user) => {
        res.status(200).json(user);
    }, (err) => {
        res.status(500).json(err);
    });
 }

 function updateUser(req, res){

    let User = require("../models/modelUser");

    User.findByIdAndUpdate({_id: req.params.id}, 
        {name : req.body.name, 
        firstname : req.body.firstname,
        email : req.body.email},
        {new : true})
    .then((updatedUser) => {
        res.status(200).json(updatedUser);
    }, (err) => {
        res.status(500).json(err);
    });
 }

 function deleteUser(req, res){

    let User = require("../models/modelUser");

    User.findOneAndRemove({_id : req.params.id})
    .then((deletedUser) => {
        res.status(200).json(deletedUser);
    }, (err) => {
        res.status(500).json(err);
    });
 }

 function createToken(user) {
    return jwt.sign({id: user.id, password: user.password}, "My so secret sentence");
}

function signin(req, res) {

    let User = require('../models/modelUser');

	User.findOne({username: req.body.account}, function(err, user) {
		if (err)
			throw err;

		if (user.comparePassword(req.body.password)) {
            req.session.username = req.body.account;
			req.session.logged = true;
			res.status(200).json({token: createToken(user)});
		}
		else
			res.redirect('/');
	});
}

module.exports.read = readUser;
module.exports.reads = readUsers;
module.exports.create = createUser;
module.exports.update = updateUser;
module.exports.delete = deleteUser;
module.exports.createToken = createToken;