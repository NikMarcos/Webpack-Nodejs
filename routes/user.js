const express = require('express');
const router = express.Router();
const { images } = require('../models/images.js');
const { User } = require('../models/user.js');
const mongoose = require('mongoose');

router.post('/friends', function(req, res, next) {
  User.findOne({ login: req.session.userLogin }, 'friends')
  .then(( response ) => {
    console.log(response);
    res.json(response);
  })
  .catch((error) => {
    res.json({ 'error': 1 });
  })
});

/* GET users listing. */
router.get('/:login', function(req, res, next) {
    // console.log(req.session.userLogin);
  let rawLogin = req.params.login;
  User.find({ login: rawLogin })
  .populate({ path: 'images', match: { isAvatar: true }})
  .then(( response ) => {
    if (response) {
      images.find({ owner: response[0]._id }).then(( resp ) => {
        res.render( 'user', {
          title: 'Express me',
          user: response[0],
          avatar: response[0].images,
          images: resp
        });
      });
    }


  })
});

router.post('/add', function(req, res, next) {
  let rawLogin = req.body.userLogin;
  let currentUser = req.session.userLogin;
  console.log(req.body);
  console.log(currentUser);
  User.updateOne({ login: currentUser }, { $push: { friends: rawLogin }})
  .then(( response ) => {
    console.log(response);
    res.json(response);
  })
  .catch((error) => {
    console.log();
    res.json({ 'error': 1 });
  })
});

router.post('/deleteFriend', function(req, res) {
  let friendLogin = req.body.userLogin;
  let currentUser = req.session.userLogin;
  User.updateOne({ login: currentUser }, { $pull: { friends: friendLogin } })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    console.log(err);
  })
});



module.exports = router;
