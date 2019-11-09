var express = require('express');
var router = express.Router();
// const { getUsers } = require('../queries');
const { User } = require('../models/user.js');
const { images } = require('../models/images.js');
const mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {

  if (req.session.userLogin) {
    User.find()
    .populate({ path: 'images', match: { isAvatar: true }})
    .limit(5)
    .then(( resp ) => {
      if (resp.length > 0) {
        res.render('users', { users: resp, path: req.originalUrl });
      }
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
    res.render('signin', { flash: "Вам нужно авторизоваться."});
  }

});


router.post('/', function(req, res, next) {
  console.log('start');
  console.log(req.body);
  console.log('stop');
  if (req.session.userLogin) {
    let testString = req.body.userName;
    User.find({'name': {'$regex': testString, $options: 'i' }})
    .populate({ path: 'images', match: { isAvatar: true }})
    .then(( resp ) => {
      if (resp.length > 0) {
        console.log('Ответ');
        console.log(resp);
        res.send(JSON.stringify(resp));
        res.status(200).end();
      }
    })
    .catch(err => {
      console.log(err);
    })
  } else {
    res.render('signin', { flash: "Вам нужно авторизоваться."});
  }

});




module.exports = router;
