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
    .then(( resp )=>{
      if (resp.length > 0) {
        res.render('users', { users: resp });
      }
    });
  } else {
    res.render('signin', { flash: "Вам нужно авторизоваться."});
  }

});

module.exports = router;
