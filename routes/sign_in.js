const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models/user.js');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
  res.render('signin');
})

/* User auth */
router.post('/', function(req, res) {
  let login = req.body.login.trim().toLowerCase();
  let password = req.body.pass;
    // getUserByLogin(req.app.locals.db, login)
    User.find({ login: login })
    .then(( resp ) => {
      bcrypt.compare(password, resp[0].password, function(err, response) {
        if (response == true) {
          req.session.userLogin = resp[0]['login'];
          req.session.userEmail = resp[0]['email'];
          res.redirect('/');
        } else {
          console.log("Ошибка: " + resp);
          res.render('signin', {flash: "Неверный логин или пароль"});
        }
      });
    });

});

module.exports = router;
