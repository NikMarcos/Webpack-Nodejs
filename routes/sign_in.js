const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models/user.js');
const mongoose = require('mongoose');
const csrf = require('csurf')
const csrfProtection = csrf({ cookie: true });

router.get('/', csrfProtection, (req, res) => {
  res.render('signin', {csrfToken: req.csrfToken()});
})

/* User auth */
router.post('/', csrfProtection, function(req, res) {
  let login = req.body.login.trim().toLowerCase();
  let password = req.body.pass;
    // getUserByLogin(req.app.locals.db, login)
    User.find({ login: login })
    .then(( resp ) => {
      bcrypt.compare(password, resp[0].password, function(err, response) {
        if (response == true) {
          console.log(resp[0]);
          req.session.userLogin = resp[0]['login'];
          req.session.userId = resp[0]['_id'];
          res.redirect('/');
        } else {
          console.log("Ошибка: " + resp);
          res.render('signin', {flash: "Неверный логин или пароль", csrfToken: req.csrfToken()});
        }
      });
    });

});

module.exports = router;
