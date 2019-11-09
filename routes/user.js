const express = require('express');
const router = express.Router();
const { images } = require('../models/images.js');
const { User } = require('../models/user.js');
const mongoose = require('mongoose');
const fs = require('fs');

const srcImage = './uploads/images/';
const desPath = './uploads/images/small/';

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

router.get('/delete/', (req, res) => {
  if (req.session.userId ) {
    let id = req.session.userId;
    console.log(id);
    User.findOneAndDelete({ _id: id})
    .then((user) => {
      let userImagesIds = user.images;
      for(let imageId of userImagesIds) {
        images.findOneAndDelete({ _id: imageId})
        .then((imageObj) => {
          let image_name = imageObj.file;
          let largeImagePath = srcImage + image_name;
          let smallImagePath = desPath + image_name;
          fs.unlinkSync(largeImagePath);
          fs.unlinkSync(smallImagePath);
        })
        .catch((err) => {
          console.log(err);
        })
      }
    })
    .then((result) => {
      res.redirect('/sign_out');
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
    res.render( 'signin', { flash: "Вам нужно авторизоваться." });
  }
});

/* GET users listing. */
router.get('/:login', function(req, res, next) {
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
